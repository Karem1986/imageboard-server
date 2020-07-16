//1.Import router class from express
const { Router } = require("express");
//Import the corresponding model-Image
const Image = require("../models").image;
const { toData } = require("../auth/jwt")
//Instantiate a router--??
const router = new Router();
//Register a GET / route that responds with all the images/users.
// router.get("/", //we DONT specify the path here!!!
//     (request, response) => response.send(["All images and users"]));
// Step 2. In router/image.js, add a POST / endpoint that creates
// a new image in the database.
router.post("/", async (req, res, next) => { //uses image route in index.js
    try {
        //create a new image in the database    
        const { title, url } = req.body //we re goint to add title and url because in the model it has these two properties
        if (!url || !title) {
            res.status(404).send("Missing title or url");
        } else {
            const resultforimage = await Image.create(req.body);
            res.json(resultforimage);
        }
    } catch (e) {
        next(e)
    }
})
//TO TEST 
// http POST :4000/image title="cat" url="https://ichef.bbci.co.uk/news/720/cpsprodpb/140B3/production/_111699028_gettyimages-1168451046.jpg" 

//Next:
//Get one image (GET in the images router)//means to get all images
router.get("/", async (req, res, next) => { //dont run with other gets and  /, only one get route in the same path 
    try {
        //Get ALL images/ one image is by id with findByPk
        const images = await Image.findAll()
        res.json(images)
    } catch (e) {
        next(e)
    }
})
//test image: http :4000/image

//PROTECTING OUR IMAGES
//ADDING authorization 
router.get("/auth", async (req, res, next) => {
    const auth = req.headers.authorization && req.headers.authorization.split(" ");
    if (auth && auth[0] === "Bearer" && auth[1]) {
        try {
            const data = toData(auth[1]); //need to import toData here TO CHECK THE TOKEN 
        } catch (e) {
            res.status(400).send("Invalid JWT token");
        }
        const allImages = await Image.findAll();
        res.json(allImages);
    } else {
        res.status(401).send({
            message: "Please supply some valid credentials",
        });
    }
});

//FIRST GET TOKEN: http POST :4000/login email="karem.ortiz@outlook.com" password="4689"    
//uSE THIS ROUTE:http :4000/image/auth Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTU5NDkwNzQ3MSwiZXhwIjoxNTk0OTE0NjcxfQ.j7ECI2XlHx7NRmM8FQzct4RhUILkSlws5uL-1UKSMYs"

module.exports = router;
