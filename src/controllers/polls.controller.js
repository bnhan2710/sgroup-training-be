const pollsService = require('../services/polls.service');

const createPoll = async (req, res) => {
    try {
        const userID =   req.socket._httpMessage.userID
        const createPoll = await pollsService.createPoll(req.body,userID);
        return res.status(createPoll.status).send(createPoll.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const updatePoll = async(req,res) => {
    try {
        const pollid = req.params.id;
        const {reqOption,title,idOption} = req.body;
        const UPDATE = await pollsService.updatePoll(pollid,reqOption,title,idOption);
        return res.status(UPDATE.status).send(UPDATE.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const getPolls = async(req,res) => {
    try {
        const polls = await pollsService.getPolls();
        return res.status(polls.status).send(polls.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const getPollById = async(req,res) => {
    try{
        const pollid = req.params.id;
        const poll = await pollsService.getPollById(pollid);
        return res.status(poll.status).send(poll.message);
    }
    catch(error){
        return res.status(500).send('Internal server error');
    }
}

const lockPoll = async(req,res) =>{
    try{
        const userID =   req.socket._httpMessage.userID
        const pollid = req.params.id
        const lockpolls = await pollsService.lockPoll(pollid,userID);
        return res.status(lockpolls.status).send(lockpolls.message);
    }catch(err){
        return res.status(500).send('Internal server error')
    }
}

const deletePoll = async(req,res) => {
    try {
        const userID =   req.socket._httpMessage.userID
        const pollid = req.params.id
        const DELETE = await pollsService.deletePoll(pollid,userID);
        return res.status(DELETE.status).send(DELETE.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const submitOption = async(req,res) => {
    try {
        const {pollid,optionid} = req.body;
        const userID =   req.socket._httpMessage.userID
        const submit = await pollsService.submitOption(pollid,optionid,userID);
        return res.status(submit.status).send(submit.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const unsubmitOption = async(req,res) =>{
    try{
        const {pollid,optionid} = req.body;
        const userID =   req.socket._httpMessage.userID
        const unsubmit = await pollsService.unsubmitOption(pollid,optionid,userID)
        return res.status(unsubmit.status).send(unsubmit.message)
    }catch(err){
        res.status(500).send('Internal server error')
    }
}

module.exports = {
    createPoll,
    updatePoll,
    getPolls,
    getPollById,
    deletePoll,
    submitOption,
    unsubmitOption,
    lockPoll
}