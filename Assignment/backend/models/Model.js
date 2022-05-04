const mongoose = require("mongoose");

// Schema for user
const formSchema = mongoose.Schema(
  {
    jobRole: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    place : {
      type : String,
      required : true,
    },

    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);



const Form = mongoose.model("Form", formSchema);

module.exports = Form;
