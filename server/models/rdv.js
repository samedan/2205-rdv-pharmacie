const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rdvSchema = new Schema({
  date: { type: Date, required: "L'heure de RDV est obligatoire" },
  specialite: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rdv", rdvSchema);
