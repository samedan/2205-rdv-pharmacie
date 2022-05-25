const Rdv = require("../models/rdv");
const Booking = require("../models/booking");

exports.getRdv = async (req, res) => {
  const { city } = req.query;
  const query = city ? { city: city.toLowerCase() } : {};
  try {
    const rdvs = await Rdv.find(query);
    return res.json(rdvs);
  } catch (error) {
    return res.mongoError(error);
  }
};

// GET /api/v1/rdv/me
exports.getUserRdv = async (req, res) => {
  const { user } = res.locals;
  console.log({ user });
  try {
    const rdvs = await Rdv.find({ owner: user });
    console.log({ rdvs });
    return res.json(rdvs);
  } catch (error) {
    return res.mongoError(error);
  }
};

exports.getRdvById = async (req, res) => {
  const { rdvId } = req.params;

  try {
    const rdv = await Rdv.findById(rdvId).populate("owner", "-password -_id");
    return res.json(rdv);
  } catch (error) {
    return res.mongoError(error);
  }
};

// GET verify User
exports.verifyUser = async (req, res) => {
  const { user } = res.locals;
  const { rdvId } = req.params;
  try {
    const rdv = await Rdv.findById(rdvId).populate("owner");
    if (rdv.owner.id !== user.id) {
      return res.sendApiError({
        title: "Invalid user",
        detail: "You don't have the credentials to modify this rdv",
      });
    }
    return res.json({ status: "verified" });
  } catch (error) {
    return res.mongoError(error);
  }
};

// POST
exports.createRdv = (req, res) => {
  const rdvData = req.body;
  rdvData.owner = res.locals.user;

  Rdv.create(rdvData, (error, createdRdv) => {
    if (error) {
      return res.mongoError(error);
    }
    return res.json(createdRdv);
  });
};

// Update
exports.updateRdv = async (req, res) => {
  const { rdvId } = req.params;
  const rdvData = req.body;
  const { user } = res.locals;
  try {
    const rdv = await Rdv.findById(rdvId).populate("owner", "-password");
    if (rdv.owner.id !== user.id) {
      return res.sendApiError({
        title: "Invalid user for this RDV",
        detail: "You don't have the credentials to modify this RDV",
      });
    }
    rdv.set(rdvData);
    await rdv.save();
    return res.status(200).send(rdv);
  } catch (error) {
    return res.mongoError(error);
  }
};

//DELETE /api/v1/rdv/A5gk7_ç3
exports.deleteRdv = async (req, res) => {
  const { rdvId } = req.params;
  const { user } = res.locals;
  try {
    const rdv = await Rdv.findById(rdvId).populate("owner");
    const bookings = await Booking.find({ rdv });
    if (user.id !== rdv.owner.id) {
      return res.sendApiError({
        title: "Invalid user",
        detail: "You don't have the credentials to delete this RDV",
      });
    }
    // TODO - delete rental with bookings in the past
    if (bookings && bookings.length > 0) {
      return res.sendApiError({
        title: "Active Bookings",
        detail: "Cannot delete rental with active bookings",
      });
    }
    await rdv.remove();
    return res.json({ id: rdvId });
  } catch (error) {
    return res.mongoError(error);
  }
};

//middlewares
exports.isUserRdvOwner = (req, res, next) => {
  const { rdv } = req.body;
  const user = res.locals.user;
  Rdv.findById(rdv)
    .populate("owner")
    .exec((error, foundRdv) => {
      if (error) {
        return res.mongoError(error);
      }
      if (foundRdv.owner.id === user.id) {
        return res.sendApiError({
          title: "Invalid User for this RDV",
          detail: "Cannot book you own RDV",
        });
      }
      next();
    });
};
