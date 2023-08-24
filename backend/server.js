const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

const userRouter = require("./routes/UserRouter");
const moviesRouter = require("./routes/moviesRouter");
const categoriesRouter = require("./routes/categoriesRouter");

// middlewares
const { errorHandle } = require("./middlewares/errorMiddleware");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
// connect DB
connectDB();

// Main route
app.get("/", (req, res) => {
  res.send("API is running....");
});
// other routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/categories", categoriesRouter);

//error handling middleware
app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
