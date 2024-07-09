const router = require("express").Router();
const pollsController = require("../controllers/polls.controller");

//CREATE POLL
router.post("/create", pollsController.createPoll);
//UPDATE POLL
router.post("/update/:id", pollsController.updatePoll);
//VIEW POLL ALL DETAILS
router.get("/get", pollsController.getPolls);
//GET POLL BY ID
// router.get("/get/:id", pollsController.getPollById);
//SUBMIT and UNSUBMIT OPTION
// router.post("/submit", pollsController.submitOption);
//DELETE POLL
router.delete("/delete/:id", pollsController.deletePoll);
module.exports = router;