import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './routes/api/users.js';
import auth from './routes/api/auth.js';
import profile from './routes/api/profile.js'
import posts from './routes/api/posts.js'

dotenv.config();
const app = express();

// Init Middleware: to get access to the request body
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.enable("trust proxy");

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
