const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const DBConnection = require('./config/connect');
const path = require("path");
dotenv.config();

const app = express();

////// Connection of DB ///////
DBConnection();

////// Middleware ///////
app.use(express.json());

// CORS Configuration to Allow Only Frontend URL
app.use(cors({
  origin: 'http://localhost:5173',  // Replace with the actual URL where your frontend is running
}));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

////// Routes ///////
app.use('/api/admin', require('./routers/adminRoutes'));
app.use('/api/user', require('./routers/userRoutes'));

// Start Server
const PORT = process.env.PORT = 8000;
app.listen(PORT, () => console.log('Runningonport$',{PORT}));