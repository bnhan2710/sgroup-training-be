const router = require("express").Router();
const pollsController = require("../controllers/polls.controller");
const verifyToken = require('../middlewares/verifyToken');
//CREATE POLL
router.post("/create",verifyToken, pollsController.createPoll);
//UPDATE POLL
router.put("/update/:id", pollsController.updatePoll);
//VIEW POLL ALL DETAILS
router.get("/", pollsController.getPolls);
//GET POLL BY ID
router.get("/:id", pollsController.getPollById); 
//SUBMIT
router.post("/submit",verifyToken, pollsController.submitOption);
//SUBMIT 
router.delete('/unsubmit',verifyToken,pollsController.unsubmitOption)
//LOCK POLL
router.post('/lock/:id',verifyToken,pollsController.lockPoll)
//DELETE POLL
router.delete("/delete/:id" ,verifyToken, pollsController.deletePoll);
module.exports = router;