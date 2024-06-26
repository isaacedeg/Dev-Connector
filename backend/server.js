const express = require("express");
const cors = require("cors");

const connectDB = () => require("./config/db");

require("dotenv").config();

const app = express();

// Connect Database
connectDB();

app.use(cors({
    origin: 'https://dev-frontend-rho.vercel.app/',
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
}))

// Init Middleware: to get access to the request body
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
