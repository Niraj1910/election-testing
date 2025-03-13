const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/details/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    let { email, role } = req.body;
    console.log(userId);
    console.log(req.body);
    // Normalize role
    if (role) {
      role = role.toLowerCase().split(" ").join("");
    }

    // Valid roles
    const validRoles = ["superadmin", "admin", "user"];
    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      $set: { email, role },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

router.put("/add/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const userId = req.params.id;
    const { constituencyIds } = req.body;

    if (
      !constituencyIds ||
      !Array.isArray(constituencyIds) ||
      constituencyIds.length === 0
    ) {
      return res.status(400).json({ message: "No constituency IDs provided" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      $push: { allowedConstituencies: { $each: constituencyIds } },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.put("/remove/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { constituencyId } = req.body;

    if (!userId || !constituencyId) {
      return res
        .status(400)
        .json({ message: "userId or ConstituencyId not found" });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(userId, {
      $pull: { allowedConstituencies: constituencyId },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    const deleteUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ message: "could not delete user" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
