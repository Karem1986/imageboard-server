//Building an image board app with express 
//Import express
const express = require("express");
//Create a new express server named app 
const app = express();
const port = 4000 //or process.env.PORT
// Import the ./router/image as imageRouter
//and ./router/user as userRouter:
const image = require("./routers/image")
const user = require("./routers/user")
const login = require("./routers/auth") //imports auth.js here for login
//1.SET UP PARSER MIDDLEWARE-ALWAYS BEFORE ROUTERS: 
//middlewares are useful to reuse some behaviours between one thing and another 
const jsonParser = express.json();
app.use(jsonParser);
//2Register both routes -with the use method on my Routers:
app.use("/image", image);
app.use("/user", user);
//FOR LOGIN
app.use("/login", login)
//Start the server and navigate to localhost:4000
app.listen(port, () => console.log(`Listening on port ${port}`))