const knex = require("../configs/knexdb");

class pollsService {
    //CREATE POLL
    createPoll = async (data) => {
        const {name , description} = data;
        const CreatedAt = new Date();
        try {
            const createPoll = await knex('polls').
            insert({
                name,
                description,
                CreatedAt,
                isLock: 0
            });
            return {
                status: 200,
                message: 'Poll created successfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Create failed'
            }
        }
    }
    //UPDATE POLL
    //reqOption = 0: delete option
    //reqOption = 1: update option
    //reqOption = 2: add option
    updatePoll = async(pollid, reqOption, title,idOption) =>{

        const CreatedAt = new Date();
        try {
            const polls = await
            knex('polls')
            .select('*')
            .where('id', pollid)
            if (polls.length === 0) {
                return {
                    status: 404,
                    message: 'Poll not found'
                }
            }
            if (polls[0].isLock === 1) {
                return {
                    status: 400,
                    message: 'Poll is locked'
                }
            }
            const Options = await knex('options').join('polls', 'options.POLLID', 'polls.ID').select('options.ID').where('polls.ID', pollid);
           const listOptionsID = Options.map((item) => item.ID);
            console.log(listOptionsID.includes(idOption));
            if(reqOption === 0){
                if(!listOptionsID.includes(idOption)){
                    return {
                        status: 400,
                        message: 'Options is not exits in poll'
                    }
                }
                await knex('options').where('ID',idOption).del();
                return {
                    status: 200,
                    message: 'OptionID deleted successfully'
                }
            } 
            else if (reqOption === 1){
                if(!listOptionsID.includes(idOption)){
                    return {
                        status: 400,
                        message: 'OptionID is not exits in poll'
                    }
                }
                await knex('options').where('ID',idOption).update({
                    title
                });
                return {
                    status: 200,
                    message: 'Options updated successfully'
                }
            }
            else if (reqOption === 2){
                await knex('options').insert({
                title,
                POLLID:pollid,
                CreatedAt
            });
            return {
                status: 200,
                message: 'Options added successfully'
            }}
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Add failed'
            }
        }
    }
    //GET POLLS DETAILS
    getPolls = async() =>{
        try {
            const polls = await knex('polls as p')
             .join('options as o', 'p.ID', 'o.POLLID')
             .select('p.ID as poll_id', 'p.NAME', 'p.DESCRIPTION', 'o.TITLE', 'o.ID as option_id');
            return {
                status: 200,
                message: polls
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Get failed'
            }
        }
    }
    //DELETE POLL
    deletePoll = async(pollid) =>{
        try {
            const polls = await knex('polls').select('*').where('ID', pollid);
            if(polls.length === 0){
                return {
                    status: 404,
                    message: 'Poll not found'
                }
            }
            if(polls[0].isLock === 1){
                return {
                    status: 400,
                    message: 'Poll is locked'
                }
            }
            await knex('polls').where('ID', pollid).del();
            return {
                status: 200,
                message: 'Poll deleted successfully'
            }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Delete failed'
            }
        }
    }
}


module.exports = new pollsService();