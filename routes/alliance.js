const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getFullImagePath } = require("../utils");
const AllianceModel = require("../models/alliance.model"); // Adjust the path as necessary
const TempElectionModel = require("../models/temp-election.model");
const mongoose = require("mongoose");
const mime = require("mime-types");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/alliance_logos"); // Destination folder
  },
  filename: (req, file, cb) => {
    const filename = req.body.allianceName;
    const ext = mime.extension(file.mimetype);
    cb(null, Date.now() + "-" + filename + "." + ext); // Unique file name
  },
});

const upload = multer({ storage });

router.get("/parties/:electionId", async (req, res) => {
  try {
    const electionId = req.params.electionId;

    const parties = await TempElectionModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(electionId),
        },
      },

      // Step 2: Lookup all alliances for this election
      {
        $lookup: {
          from: "alliances",
          localField: "_id",
          foreignField: "election",
          as: "alliances",
        },
      },

      // Step 3: Project to get all party IDs from alliances into a single array
      {
        $project: {
          allAllianceParties: {
            $reduce: {
              input: "$alliances.parties",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
          electionParties: "$electionInfo.partyIds",
        },
      },

      // Step 4: Unwind the election parties
      {
        $unwind: {
          path: "$electionParties",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Step 5: Filter out parties that exist in alliances
      {
        $match: {
          $expr: {
            $not: {
              $in: ["$electionParties", "$allAllianceParties"],
            },
          },
        },
      },

      // Step 6: Lookup party details
      {
        $lookup: {
          from: "parties",
          localField: "electionParties",
          foreignField: "_id",
          as: "partyDetails",
        },
      },

      // Step 7: Unwind party details
      {
        $unwind: "$partyDetails",
      },

      // Step 8: Project the final party details
      {
        $project: {
          _id: "$partyDetails._id",
          party: "$partyDetails.party",
          color_code: "$partyDetails.color_code",
          party_logo: "$partyDetails.party_logo",
          total_seat: "$partyDetails.total_seat",
          total_votes: "$partyDetails.total_votes",
          electors: "$partyDetails.electors",
          votes_percentage: "$partyDetails.votes_percentage",
        },
      },
    ]);

    res.status(200).json(parties);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to update party data" });
  }
});

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { allianceName, leaderParty, parties, election } = req.body;

    if (!parties.includes(leaderParty)) {
      return res
        .status(400)
        .json({ error: "Leader Party must be one of the selected Parties." });
    }

    const alliance = new AllianceModel({
      name: allianceName,
      leaderParty: leaderParty,
      parties: parties,
      logo: getFullImagePath(req, "alliance_logos"),
      election,
    });
    console.log(alliance);

    await alliance.save();
    res.redirect("/alliances");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create new alliance" });
  }
});

//Router to delete an alliance
router.delete("/:id", async (req, res) => {
  try {
    const alliance = await AllianceModel.findByIdAndDelete(req.params.id);
    if (!alliance) {
      return res.status(404).json({ message: "Alliance not found" });
    }
    return res.status(200).json({ message: "Deleted alliance" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete the alliance" });
  }
});

router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const { allianceName, leaderParty, parties, logo } = req.body;
    const allianceData = {
      name: allianceName,
      leaderParty: leaderParty,
      parties: parties,
      logo: logo,
    };
    if (req.file) {
      allianceData["logo"] = getFullImagePath(req, "alliance_logos"); // Use file path if available
    }

    const alliance = await AllianceModel.findByIdAndUpdate(
      req.params.id,
      allianceData,
      {
        new: true,
      }
    );

    if (!alliance) {
      return res.status(404).json({ message: "Party not found" });
    }

    res.status(200).json(alliance);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Failed to update party data" });
  }
});

module.exports = router;
