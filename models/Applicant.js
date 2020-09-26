const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema(
  {
    name: String,
    username: String,
    phone: String,
    email: { type: String, unique: true },
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
