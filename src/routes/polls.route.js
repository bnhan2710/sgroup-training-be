const router = require("express").Router();
const pollsController = require("../controllers/polls.controller");

//CREATE POLL
router.post("/create", pollsController.createPoll);
//UPDATE POLL
router.post("/update/:id", pollsController.updatePoll);
//VIEW POLL ALL DETAILS
router.get("/get", pollsController.getPolls);
//GET POLL BY ID
router.get("/get/:id", pollsController.getPollById); 
//SUBMIT
router.post("/submit", pollsController.submitOption);
//SUBMIT 
router.delete('/unsubmit',pollsController.unsubmitOption)
//DELETE POLL
router.delete("/delete/:id", pollsController.deletePoll);
module.exports = router;