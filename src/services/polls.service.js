const knex = require("../configs/knexdb");

class pollsService {
    //CREATE POLL
    createPoll = async (data,userID) => {
        const {name , description} = data;
        const CreatedAt = new Date();
        if(!name || !description){
            return{
                status: 400,
                message: "Please provide complete Poll information "
            }
        }
        try {
            const createPoll = await knex('polls').
            insert({
                name,
                description,
                CreatedAt,
                CreatedBy: userID,
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
             .leftJoin('options as o', 'p.ID', 'o.POLLID').leftJoin('user_options as uo', 'o.ID', 'uo.OPTIONID')
             .select('p.ID as poll_id', 'p.NAME', 'p.DESCRIPTION', 'o.TITLE', 'o.ID as option_id', 'uo.USERID as user_id');
              let pollNested = [];
                let pollID = -1;
                polls.forEach((item) => {
                    if (pollID !== item.poll_id) {
                        pollID = item.poll_id;
                        pollNested.push({
                            poll_id: item.poll_id,
                            name: item.NAME,
                            description: item.DESCRIPTION,
                            options: []
                        });
                    }
                    if (item.option_id) {
                        pollNested[pollNested.length - 1].options.push({
                            option_id: item.option_id,
                            title: item.TITLE,
                            user_vote: []
                        });
                    }
                    if (item.user_id) {
                        pollNested[pollNested.length - 1].options[pollNested[pollNested.length - 1].options.length - 1].user_vote.push(item.user_id);
                    }
                });
                return {
                    status: 200,
                    message: pollNested
                }
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'Get all poll failed'
            }
        }
    }
    //GET POLL BY ID
    getPollById = async(pollid) =>{
        try{
           const polls = await knex('polls')
            .leftJoin('options', 'polls.ID', 'options.POLLID')
            .leftJoin('user_options', 'options.ID', 'user_options.OPTIONID')
            .select('polls.ID as poll_id', 'polls.NAME', 'polls.DESCRIPTION', 'options.TITLE', 'options.ID as option_id','user_options.USERID as user_vote').where('polls.ID', pollid);
            if(polls.length === 0){
                return {
                    status: 404,
                    message: 'Poll not found'
                }
            }
            let pollNested = [];
            pollNested.push({
                poll_id: polls[0].poll_id,
                name: polls[0].NAME,
                description: polls[0].DESCRIPTION,
                options: []
            });
            polls.forEach((item) => {
                if (item.option_id) {
                    pollNested[pollNested.length - 1].options.push({
                        option_id: item.option_id,
                        title: item.TITLE,
                        user_vote: []
                    });
                }
                if (item.user_vote) {
                    pollNested[pollNested.length - 1].options[pollNested[pollNested.length - 1].options.length - 1].user_vote.push(item.user_vote);
                }
            });
            return {
                status: 200,
                message: pollNested
            }
        }catch(error){
            console.log(error);
            return {
                status: 500,
                message: 'Get poll by ID failed'
            }
        }
    }
    //DELETE POLL
    deletePoll = async(pollid,userID) =>{
        try {
            const polls = await knex('polls').select('*').where('ID', pollid);
            if(polls.length === 0){
                return {
                    status: 404,
                    message: 'Poll not found'
                }
            }

            if(!polls[0].CreatedBy===userID){
                return {
                    status: 400,
                    message: 'You are not have permission to Delete'
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
    //LOCK POLL
    lockPoll = async(pollid,userID) => {
     try{   
        if(!pollid){
            return { 
                status:400,
                message:'Please provide poll id'
            }
        }
        const polls = await knex('polls').select('*').where('ID', pollid);
        if(polls.length === 0){
            return {
                status: 404,
                message: 'Poll not found'
            }
           }
           if(!polls[0].CreatedBy===userID){
                return {
                    status: 400,
                    message: 'You are not have permission to lock'
                }
           }
           await knex('polls').update({ isLock: 1 }).where({ ID: pollid, CreatedBy: userID });
           return{
                status:200,
                message:'Lock poll successfully'
           }
        }catch(err){
            return {
                status: 500,
                message:'Lock poll failed'
            }
        }
    }
    //SUBMIT OPTION
    submitOption = async(pollid, optionid, userid) =>{
        try{
            const optionOfPoll = await knex('options').join('polls', 'options.POLLID', 'polls.ID').select('options.ID','polls.isLock').where('polls.ID', pollid);
            if(optionOfPoll.length === 0){
                return {
                    status: 404,
                    message: 'Poll not found'
                }
            }
            if(optionOfPoll[0].isLock === 1){
                return {
                    status: 400,
                    message: 'Poll is locked'
                }
            }
            const option = optionOfPoll.map((item) => item.ID);
            if(!option.includes(optionid)){
                return {
                    status: 400,
                    message: 'Option not found'
                }
            }
            //Update user_option
            const checkExitsOption = await knex('user_options').select('*').where({ userid, optionid });

            if(checkExitsOption.length!==0){
                return {
                    status: 400,
                    message: 'Option already submitted by user'
                }
            }
            await knex('user_options').insert({
                USERID: userid,
                OPTIONID: optionid
            });
            return {
                status: 200,
                message: 'Submitted option successfully'
            }

    }catch(error){
        console.log(error);
        return {
            status: 500,
            message: 'Submit failed'
            }
        }
    }
    unsubmitOption = async(pollid,optionid,userid) =>{
        try{
        const optionOfPoll = await knex('options').join('polls', 'options.POLLID', 'polls.ID').select('options.ID','polls.isLock').where('polls.ID', pollid);
        if(optionOfPoll.length === 0){
            return {
                status: 404,
                message: 'Poll not found'
            }
        }
        if(optionOfPoll[0].isLock === 1){
            return {
                status: 400,
                message: 'Poll is locked'
            }
        }
      const option = optionOfPoll.map((item) => item.ID)
        if(!option.includes(optionid)){
            return {
                status: 400,
                message: 'Option not been submitted yet'
            }
        }
        await knex('user_options').where({userid,optionid}).del()
        return{
            status : 200,
            message: 'Unsubmitted succesfully'
        }}catch(err){
            console.log(err)   
            return{
                status:500,
                message: 'Unsubmit failed'
            }
        }  
    } 
    }


module.exports = new pollsService();