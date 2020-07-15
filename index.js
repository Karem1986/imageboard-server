//Building an image board app with express 
//Import express
const express = require("express");
//Create a new express server named app 
const app = express();
const port = 4000 //or process.env.PORT
//call app.listen with the PORT and callback function 
app.listen(port, () => console.log(`Listening on port ${port}`))