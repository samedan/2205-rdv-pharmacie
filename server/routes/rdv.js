const express = require("express");
const router = express.Router();
const { onlyAuthUser } = require("../controllers/users");
const {
  getRdv,
  getRdvById,
  createRdv,
  getUserRdv,
  deleteRdv,
  updateRdv,
  verifyUser,
} = require("../controllers/rdv");

// GET ALL rentals
router.get("/", getRdv);

// GET user rentals
router.get("/me", onlyAuthUser, getUserRdv);

// GET one Rental By Id
router.get("/:rdvId", getRdvById);

// GET Verify rental ID if User is Owner
router.get("/:rdvId/verify-user", onlyAuthUser, verifyUser);

// POST
router.post("/", onlyAuthUser, createRdv);

// UPDATE
router.patch("/:rdvId", onlyAuthUser, updateRdv);

// DELETE
router.delete("/:rdvId", onlyAuthUser, deleteRdv);

module.exports = router;
