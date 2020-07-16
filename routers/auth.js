const { Router } = require('express')
const { toJWT } = require('../auth/jwt')
const middleware = require("../auth/middleware")


const router = new Router()
//router for login in index.js
router.post('/', async (req, res, next) => {
    // console.log('hi')
    //Here goes the login logic.
    try {
        //Check for email and password in the json body, allow anybody
        //to login and receive a jwt:
        const { email, password } = req.body
        // console.log('hi')
        if (!email || !password) {
            res.status(400).send("Please supply a valid email and password")
        } else {
            res.send({
                jwt: toJWT({ userId: 1 }),
            })
        }
    } catch (e) {
        next(e)
    }
})

//TESTED Wth httpie: http POST :4000/login email="karem.ortiz@outlook.com" password=76543
//Still not fully functional, but below the next part:

router.get("/test-auth", middleware, (req, res) => {
    res.send({
        message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
    });
});


module.exports = router