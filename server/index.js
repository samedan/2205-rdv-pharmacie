const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config/dev");
const { provideErrorHandler } = require("./middlewares");

// routes
const rentalRoutes = require("./routes/rdv");
const usersRoutes = require("./routes/users");
const bookingRoutes = require("./routes/bookings");
const pacientsRoutes = require("./routes/pacients");
const rdvRoutes = require("./routes/rdv");

const { onlyAuthUser } = require("./controllers/users");

// models
require("./models/rental");
require("./models/user");
require("./models/booking");
require("./models/rdv");

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(
  config.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to DB!");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(provideErrorHandler);

app.get("/api/v1/secret", onlyAuthUser, (req, res) => {
  const user = res.locals.user;
  return res.json({ message: `Super secret message to: ${user.username}` });
});

// Api Routes
app.use("/api/v1/rentals", rentalRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/pacients", pacientsRoutes);
app.use("/api/v1/rdv", rdvRoutes);

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
