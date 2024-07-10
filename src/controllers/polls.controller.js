const pollsService = require('../services/polls.service');

const createPoll = async (req, res) => {
    try {
        const createPoll = await pollsService.createPoll(req.body);
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

const deletePoll = async(req,res) => {
    try {
        const pollid = req.params.id;
        const DELETE = await pollsService.deletePoll(pollid);
        return res.status(DELETE.status).send(DELETE.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const submitOption = async(req,res) => {
    try {
        const {pollid,optionid,userid} = req.body;
        const submit = await pollsService.submitOption(pollid,optionid,userid);
        return res.status(submit.status).send(submit.message);
    } catch (error) {
        return res.status(500).send('Internal server error');
    }
}

const unsubmitOption = async(req,res) =>{
    try{
        const {pollid,optionid,userid} = req.body;
        const unsubmit = await pollsService.unsubmitOption(pollid,optionid,userid)
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
    unsubmitOption
}