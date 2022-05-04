const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");

const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddlerware");
const expressAsyncHandler = require("express-async-handler");
const Form = require("./models/Model");

dotenv.config();
// connecting Database
connectDB();

app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use("/api", expressAsyncHandler(async (req, res) => {

  const { jobRole, desc, place, phoneNo } = req.body;
  


  if (!jobRole || !desc || !place || !phoneNo) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const formExists = await Form.findOne({ phoneNo });

  if (formExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  const form = await Form.create({
    jobRole ,
    desc,place,
    phoneNo
  });

  if (form) {
    res.status(201).json({
      message: "Form Submitted Successfully",
      data: {
        _id: form._id,
        jobRole: form.jobRole,
        desc: form.desc,
        place: form.place,
        phoneNo : form.phoneNo,
      },
    });
  }
  // if some error occurred in creating a user
  else {
    res.status(400);
    throw new Error("Error Ocuured!");
  }
})
);

app.get("/", (req, res) => {
  res.send("Api is running ");
});

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT} 🚀`));
