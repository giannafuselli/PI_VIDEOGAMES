const { Router } = require('express');
const {postVG} = require("../controllers/postVG");
const {getVGhandler} = require('../handlers/getVGhandler');
const {getVGbyIdHandler} = require('../handlers/getVGbyIdHandler');
const {getGenres} = require("../controllers/getGenres");
const {deleteVG} = require("../controllers/deleteVG");
const {updateVG} = require("../controllers/updateVG");


const router = Router();

router.get("/videogames", getVGhandler);

router.get("/videogames/:id",getVGbyIdHandler);

router.get("/genres", getGenres);

router.post("/videogames",postVG);

router.delete("/delete/:id", deleteVG);

router.patch("/update/:id", updateVG);


module.exports = router;
