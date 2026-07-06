import express from "express"; 
 
require("dotenv").config();
const cors = require("cors");
const app = express(); 
 
app.use(cors()); 
 
const PORT = process.env.PORT || 8000; 
 
app.use(express.json());
 
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});