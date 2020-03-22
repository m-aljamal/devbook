const express = require("express");
app = express();
const connectDB = require("./config/db");
const HttpError = require("./model/http-error");

// same as app.use(bodyParser.json())
app.use(express.json());

app.use("/api/users", require("./routes/users-routes"));
app.use("/api/auth", require("./routes/auth-routes"));
app.use("/api/posts", require("./routes/post-routes"));
app.use("/api/profile", require("./routes/profile"));

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occurred" });
});

//  connect database
connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("app start at port", PORT);
});
