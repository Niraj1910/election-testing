const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getFullImagePath } = require("../utils");
const AllianceModel = require("../models/alliance.model"); // Adjust the path as necessary
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

router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const { allianceName, leaderParty, parties, electionId } = req.body;

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
      election: electionId,
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
