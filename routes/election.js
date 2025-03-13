const express = require("express");
const { z } = require("zod"); // Import Zod for validation
const Election = require("../models/election.model");
const TempElection = require("../models/temp-election.model");
const PartyElectionModel = require("../models/party-election-model");
const { isAdmin } = require("../middleware/admin");
const RedisManager = require("../RedisManager");
const { cachedKeys } = require("../utils");
const CandidateElectionModel = require("../models/candidate-election-model");

const redis = RedisManager.getInstance();

const router = express.Router();

router.get("/party-summary", async (req, res) => {
  const fullUrl = req.get("Referer");
  console.log("fullUrl -> ", fullUrl);

  const stateName = { delhi: "दिल्ली 2025", jharkhand: "झारखंड 2024" };

  const state = fullUrl.includes("delhi")
    ? stateName["delhi"]
    : stateName["jharkhand"];
  try {
    const election = await Election.findOne({
      state: state,
    });

    if (!election) {
      return res.status(404).json({ error: "Election not found" });
    }

    // Filter for BJP+ and JMM+ parties
    // const filteredParties = election.parties.filter(party =>
    //   party.name === 'BJP+' || party.name === 'JMM+'
    // );

    res.status(200).json({
      state: election.state,
      totalSeats: election.totalSeats,
      declaredSeats: election.declaredSeats,
      parties: election.parties,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/temp-elections", async (req, res) => {
  try {
    const { state, halfWayMark, year, totalSeats, electionInfo } = req.body;

    const electionSlug = `${state.toLowerCase()}_${year}`;

    // Check if an election for the given state already exists
    const existingElection = await TempElection.findOne({ electionSlug });
    if (existingElection) {
      return res
        .status(409)
        .json({ error: "Election for this state already exists" });
    }

    const election = new TempElection({
      state,
      year,
      electionSlug,
      totalSeats,
      halfWayMark,
      electionInfo,
    });

    const savedElection = await election.save();
    if (!savedElection) {
      return res.status(400).json({ message: "Bad request" });
    }
    const parties = electionInfo.partyIds.map(
      (partyId) =>
        new PartyElectionModel({
          election: savedElection._id,
          party: partyId,
        }),
    );
    await PartyElectionModel.bulkSave(parties);

    const candidates = electionInfo.candidates.map(
      (canId) =>
        new CandidateElectionModel({
          election: savedElection._id,
          candidate: canId,
        }),
    );

    await CandidateElectionModel.bulkSave(candidates);
    return res.status(200).json(savedElection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { state, totalSeats, declaredSeats, halfWayMark, parties } = req.body;
    const stateSlug = state.toLowerCase().replace(/ /g, "_");

    // Check if an election for the given state already exists
    const existingElection = await Election.findOne({ stateSlug });
    if (existingElection) {
      return res
        .status(409)
        .json({ error: "Election for this state already exists" });
    }

    const election = new Election({
      state,
      stateSlug,
      totalSeats,
      declaredSeats,
      halfWayMark,
      parties,
    });

    const savedElection = await election.save();
    await redis.clearAllKeys(); // Clear all Redis keys when a new election is created
    res.status(201).json(savedElection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/states", async (req, res) => {
  try {
    const states = await Election.find({}).sort({ createdAt: -1 });
    const statesWithSlugs = states.map((state) => ({
      name: state.state,
      slug: state.stateSlug,
      id: state._id,
    }));
    return res.status(200).json({
      message: "States, their slugs, and ids retrieved successfully",
      data: statesWithSlugs,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get API to retrieve election data by state
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if data exists in Redis cache
    const cachedData = await redis.get(cachedKeys.ASSEMBLY_ELECTION + ":" + id);
    if (cachedData) {
      return res.json(cachedData); // Ensure cached data is parsed back to JSON
    }

    // Fetch election data from database
    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({ message: "Election data not found" });
    }

    // Sort parties and their subParties by 'won' in descending order
    if (election.parties && election.parties.length > 0) {
      election.parties.sort((a, b) => b.won - a.won); // Sort parties

      election.parties.forEach((party) => {
        if (party.subParties && party.subParties.length > 0) {
          party.subParties.sort((a, b) => b.won - a.won); // Sort subParties
        }
      });
    }

    // Cache the sorted data for 10 minutes (600 seconds)
    await redis.setWithTTL(
      cachedKeys.ASSEMBLY_ELECTION + ":" + id,
      election,
      3600,
    );

    res.status(200).json(election);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const pageInt = parseInt(page) || 1;
    const limitInt = parseInt(limit) || 10;
    const startIndex = (pageInt - 1) * limitInt;
    const endIndex = pageInt * limitInt;

    const elections = await Election.find().sort({ createdAt: -1 });
    const paginatedData = elections.slice(startIndex, endIndex);

    if (!paginatedData) {
      return res.status(404).json({ message: "No elections found" });
    }

    const result = {
      currentPage: pageInt,
      totalPages: Math.ceil(elections.length / limitInt),
      totalItems: elections.length,
      data: paginatedData,
    };

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const election = await Election.findByIdAndDelete(id);

    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    await redis.clearAllKeys(); // Clear Redis cache when an election is deleted

    res.status(200).json({ message: "Election successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/temp-election/party/add", async (req, res) => {
  try {
    const { election, parties } = req.body;
    const updatedElection = await TempElection.findByIdAndUpdate(
      election,
      { $push: { "electionInfo.partyIds": parties } },
      { new: true },
    );
    const newParties = parties.map(
      (partyId) => new PartyElectionModel({ election, party: partyId }),
    );

    const newAddedParties = await PartyElectionModel.bulkSave(newParties);
    if (!updatedElection || !newAddedParties.insertedCount === 0) {
      return res.status(400).json({ message: "Bad Request" });
    }
    return res.status(200).json({ message: "Party added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.patch("/temp-election/candidate/add", async (req, res) => {
  try {
    const { election, candidates } = req.body;
    const updatedElection = await TempElection.findByIdAndUpdate(
      election,
      { $push: { "electionInfo.candidates": candidates } },
      { new: true },
    );
    const newCandidates = candidates.map(
      (candidateId) =>
        new CandidateElectionModel({ election, candidate: candidateId }),
    );

    const newAddedCandidates =
      await CandidateElectionModel.bulkSave(newCandidates);
    if (!updatedElection || !newAddedCandidates.insertedCount === 0) {
      return res.status(400).json({ message: "Bad Request" });
    }
    return res.status(200).json({ message: "Party added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete(
  "/temp-election/party/delete/:partyId/:electionId",
  async (req, res) => {
    try {
      const { partyId, electionId } = req.params;

      if (!partyId || !electionId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const deletedPartyElection = await PartyElectionModel.findOneAndDelete({
        election: electionId,
        party: partyId,
      });

      if (!deletedPartyElection) {
        return res.status(400).json({ message: "Party election not found" });
      }

      const election = await TempElection.findById(electionId).populate({
        path: "electionInfo.candidates",
        match: { party: partyId },
      });

      if (
        election &&
        election.electionInfo &&
        election.electionInfo.candidates
      ) {
        const candidateIds = election.electionInfo.candidates.map(
          (candidate) => candidate._id,
        );

        if (candidateIds.length > 0) {
          await CandidateElectionModel.deleteMany({
            election: electionId,
            candidate: { $in: candidateIds },
          });
        }

        await TempElection.findByIdAndUpdate(
          electionId,
          {
            $pull: {
              "electionInfo.candidates": { $in: candidateIds },
              "electionInfo.partyIds": partyId,
            },
          },
          { new: true },
        );
      } else {
        await TempElection.findByIdAndUpdate(
          electionId,
          { $pull: { "electionInfo.partyIds": partyId } },
          { new: true },
        );
      }

      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

router.delete(
  "/temp-election/candidate/delete/:candidateId/:electionId",

  async (req, res) => {
    try {
      const { electionId, candidateId } = req.params;

      if (!candidateId || !electionId) {
        return res.status(400).json({ message: "Missing required parameters" });
      }

      const deletedPartyCandidate =
        await CandidateElectionModel.findOneAndDelete({
          election: electionId,

          candidate: candidateId,
        });

      if (!deletedPartyCandidate) {
        return res.status(400).json({ message: "Party election not found" });
      }

      await TempElection.findByIdAndUpdate(
        electionId,

        { $pull: { "electionInfo.candidates": candidateId } },

        { new: true },
      );

      return res.status(200).send({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

router.put("/temp-election/candidate/update", async (req, res) => {
  try {
    console.log(req.body);

    const { election, candidate, votesReceived } = req.body;

    const query = {
      election: election,
      candidate: candidate,
    };

    const updatedDocument = await CandidateElectionModel.findOneAndUpdate(
      query,
      { $set: { votesReceived } },
      { new: true },
    );
    if (!updatedDocument) {
      return res.status(400).json({ message: "Bad Request" });
    }
    console.log(updatedDocument);

    return res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

router.put("/temp-election/party/update", async (req, res) => {
  try {
    const { election, party, seatsWon } = req.body;

    const query = {
      election: election,
      party: party,
    };

    const updatedDocument = await PartyElectionModel.findOneAndUpdate(
      query,
      { $set: { seatsWon } },
      { new: true },
    );
    if (!updatedDocument) {
      return res.status(400).json({ message: "Bad Request" });
    }

    return res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

router.delete("/temp-election-delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const election = await TempElection.findByIdAndDelete(id);

    await PartyElectionModel.deleteMany({
      election: id,
    });

    await CandidateElectionModel.deleteMany({
      election: id,
    });

    if (!election) {
      return res.status(404).json({ message: "Election not found" });
    }

    res.status(200).json({ message: "Election successfully deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedElection = await Election.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedElection) {
      return res.status(404).json({ message: "Election not found" });
    }

    await redis.clearAllKeys(); // Clear Redis cache when an election is updated
    res.status(200).json(updatedElection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
