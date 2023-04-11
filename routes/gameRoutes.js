// const { json } = require("body-parser");
// const { application } = require("express");
// const express = require("express");

// //abbility to make routes
// const Router = express.Router();

// const Games = require("../models/gameModels")

// //collection GET
// Router.get('/', async (req, res) => {
// console.log('GET')
//     if (req.header('Accept') != "application/json") {
//         res.status(415).send();

//     }

//     try {
//         let games = await Games.find();
//         console.log("getting it")

//         //create representation for collection as requested in assignment
//         //items, _links, pagination

//         let gamesCollection = {
//             items: games,
//             _links: {
//                 self: {
//                     href: `${process.env.BASE_URI}games/`
//                 },
//                 collection: {
//                     href: `${process.env.BASE_URI}games/`
//                 }
//             },
//             pagination: "open voor later",


//         }
//         res.json(gamesCollection);
//     }
//     catch {
//         res.status(500).send();

//     }
// })

// //detail get
// Router.get("/:Id", async (req, res) => {
//     try {
//         const game = await Games.findById(req.params.Id);
//         // console.log(game);
//         res.json(game);
//     }
//     catch {
//         res.status(500);
//     }
// })
// //add middleware to check content-type
// Router.post("/", async (req, res, next) => {
//     console.log("checking conten-type post")
//     if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
//         res.status(400).send();
//     } else{
//         next();
//     }
// })


// // add middleware to disallow empty values
// Router.post("/", async (req, res, next) => {
//     console.log("checking empty values post")
//     if(req.body.title && req.body.ingredients && req.body.sauce){
//         next();
//     } else{
//         res.status(400).send();
//     }
// })


// //post resource
// Router.post('/', async (req, res) => {
//     let game = new Games({
//         title: req.body.title,
//         genre: req.body.genre,
//         releaseDate: req.body.releaseDate,

//     })
//     try {
//         console.log(game);
//         await game.save();
//         res.status(201).send();
//         res.json(game);
//     }
//     catch {
//         res.status(500).send();
//     }

//     console.log("posting it")
// })

// Router.delete('/:Id', async (req, res) => {
//     try {
//         const removeGame = await Games.remove({ _Id: req.params.Id });
//         res.json(removeGame);
//         console.log("deleting it")
//     } catch {
//         res.status(500).send();

//     }

//     console.log("deleting it")
// })

// //middleware to check content type
// Router.put("/:_Id", async (req, res, next) => {
//     console.log("checking content-type put")
//     if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
//         res.status(400).send();
//     } else{
//         next();
//     }
// })

// //middleware to check empty vallues
// Router.put("/:_Id", async (req, res, next) => {
//     console.log("checking empty values put")
//     if(req.body.title && req.body.ingredients && req.body.sauce){
//         next();
//     } else{
//         res.status(400).send();
//     }
// })


// Router.put("/:_Id", async (req, res) => {

//     let game = await Game.findOneAndUpdate(req.params,
//         {
//             title: req.body.title,
//             genre: req.body.genre,
//             releaseDate: req.body.releaseDate
//         })

//     try {
//         game.save();

//         res.status(203).send();
//     } catch {
//         res.status(500).send();
//     }
// })

// //releaseDate route 
// Router.releaseDate("/", (req, res) => {
//     res.setHeader("Allow", "GET, POST, OPTIONS");
//     res.send();
// })

// // releaseDate route for detail
// Router.releaseDate("/:Id", async (req, res) => {
//     res.set({
//         'Allow': 'GET, PUT, DELETE, OPTIONS'
//     }).send()
// })

// module.exports = Router;
// Require Express
const express = require("express");

const router = express.Router();

const Game = require("../models/gameModel");

// GET Route
router.get("/", async (req, res) => {
    console.log("GET");

    if(req.header('Accept') != "application/json"){
        res.status(415).send();
    }

    try {
        let games = await Game.find();
        // Representation for the collection
        let carsCollection = {
            items: games,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}games/`
                },
                collection: {
                    href: `${process.env.BASE_URI}games/`
                }
            },
            pagination: {
                temp: "Doen we een andere keer, maar er moet iets in staan."
            }
        }
        
        res.setHeader("Access-Control-Allow-Origin", '*');
        res.setHeader("Access-Control-Allow-Headers", 'example-request');
        res.setHeader("Access-Control-Allow-Method", 'GET, POST, OPTIONS');
        res.json(carsCollection);
    } catch {
        res.status(500).send();
    }
})

// Create Route for detail
router.get("/:_id", async (req, res) => {

    try {
        let game = await Game.findById(req.params._id)
        if (game == null) {
            res.status(404).send();
        } else {

            res.setHeader("Access-Control-Allow-Origin", '*');
            res.setHeader("Access-Control-Allow-Headers", 'example-request');
            res.setHeader("Access-Control-Allow-Method", 'GET, PUT, DELETE, OPTIONS');
            res.json(game)
        }

    } catch {
        res.status(415).send();
    }
})

// Middleware checken content-type
router.post("/", (req, res, next) => {

    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded") {
        res.status(400).send();
    } else {
        next();
    }
})

// Middleware to disallow empty values
router.post("/", (req, res, next) => {
    console.log("POST middleware to check empty values")

    if (req.body.title && req.body.genre && req.body.releaseDate) {
        next();
    } else {
        res.status(400).send();
    }
})

// POST Route
router.post("/", async (req, res) => {
    let game = Game({
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,
    })

    try {
        await game.save();

        res.status(201).send();
    } catch {
        res.status(500).send();
    }

    console.log("POST");
})

// Middleware checking headers PUT
router.put("/:_id", (req, res, next) => {
    console.log("Middleware to check content type")

    if (req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        
        res.status(400).send();
    } else {
        next();
    }
})

// Middleware checking empty values PUT
router.put("/:_id", (req, res, next) => {
    console.log("Middleware to check for empty values")

    if (req.body.title && req.body.genre && req.body.releaseDate) {

        next();
    } else {
        res.status(400).send();
    }
})

// PUT Route
router.put("/:_id", async (req, res) => {

    let game = await Game.findOneAndUpdate(req.params,
        {
            title: req.body.title,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate
        })

    try {
        game.save();

        res.status(200).send();
    } catch {
        res.status(500).send();
    }
})

// DELETE Route
router.delete("/:_id", async (req, res) => {
    console.log("DELETE");

    try {
        await Game.findByIdAndDelete(req.params._id);

        res.status(204).send();

    } catch {
        res.status(404).send();
    }
})

// OPTIONS Route
router.releaseDate("/", (req, res) => {
    console.log("OPTIONS");

    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

// OPTIONS Route for details
router.releaseDate("/:id", async (req, res) => {
    console.log("OPTIONS (Details)");
    
    res.setHeader('Allow', 'GET, PUT, DELETE, OPTIONS')
    res.send()
})

module.exports = router;