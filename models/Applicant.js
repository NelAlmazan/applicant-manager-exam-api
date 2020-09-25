const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: {
      name: String,
      geo: {
        lat: String,
        lng: String,
      },
    },
    status: String,
    category: String,
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Applicant", applicantSchema);
