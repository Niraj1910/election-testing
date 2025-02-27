const express = require("express");
const Joi = require("joi");
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
    console.log(file);
    const ext = mime.extension(file.mimetype);
    cb(null, Date.now() + "-" + filename + "." + ext); // Unique file name
  },
});

const upload = multer({ storage });

const allianceJoi = Joi.object({
  name: Joi.string().required(),
  logo: Joi.string().required(),
  leaderParty: Joi.string().required(),
  parties: Joi.array().items(Joi.string().required()),
});

router.post("/", upload.single("allianceLogo"), async (req, res) => {
  try {
    console.log(req.body);
    const { allianceName, leaderParty, parties } = req.body;

    const alliance = new AllianceModel({
      name: allianceName,
      logo: getFullImagePath(req, "alliance_logos"),
      leaderParty,
      parties,
    });

    const { error } = allianceJoi.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await alliance.save();
    res.redirect("alliances");
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Failed to create new alliance" });
  }
});

module.exports = router;
