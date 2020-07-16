//1.Import router class from express
const { Router } = require("express");
//Import the corresponding model-user
const User = require("../models").user; //models should be imported this way! 
//Import bcrypt for Password:
const bcrypt = require('bcrypt')
//Instantiate a router--??
const router = new Router();
//Register a GET / route that responds with all the images/users.
router.get("/", //we DONT specify the path here!!!
    (request, response) => response.send(["All images and users"]));
module.exports = router;

//Next excersise from: Advanced APIs at https://reader.codaisseur.com/courses/backend-bootcamp/04-advanced-apis/02-restuser"
//Create a new user (POST in the user router):
router.post("/", async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body;
        if (!email || !password || !fullName) {
            res.status(400).send("missing parameters");
        } else {
            const hashedPassword = bcrypt.hashSync(password, 10); //This stores passwords securely-hash them with bcrypt 
            const newUser = await User.create({
                email,
                password: hashedPassword,
                fullName,
            });
            console.log('testing', newUser)
            res.json(newUser);
        }
    } catch (e) {
        next(e);
    }
});

//Using bcrypt to protect Passwords- another way of hashing them would be:
// const { email, password, fullName } = req.body;
// if (!email || !password || !fullName) {
//   res.status(400).send("missing parameters");
// } else {
//   const newUser = await User.create({
//     email,
//     // Here, when handing down the password to the create method we hash it.
//     password: bcrypt.hashSync(password, 10),
//     fullName,
//   });
//   res.json(newUser);
// }

//FINALIZE LOGIN ENDPOINT:

router.post("/", async (req, res) => {
    const user = await User.findOne({
        where: {
            email: email
        }
    })
    // 1. find user based on email address
    if (!user) {
        res.status(400).send({
            message: "User with that email address not found",
        });
    } else if (bcrypt.compareSync(password, user.password)) { // 2. use bcrypt.compareSync to check the recieved password against the stored hash
        // 3. if the password is correct, 
        //return a JWT with the userId of the user (user.id):
        const jwt = toJWT({ userId: user.userId })
        res.send({
            jwt,  //TESTED WITH: http POST :4000/login email="karem.ortiz@outlook.com" password="4689"
        });
    } else {
        res.status(400).send("Password was incorrect")
    }
});

