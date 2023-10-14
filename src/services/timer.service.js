const {addTimer,updateTimer}= require('../queries/assessment')
const { runQuery } = require('../config/database.config');



const setTimer = async (body) => {
    const { time_allocated } = body;

    // Check if that user exists inside the db
    const timer = await runQuery(addTimer, [time_allocated]);
    
        return {
            code: 200,
            status: 'success',
            message: 'Timer Set Successfully',
            data: timer[0]
        
    }
}
const updateAllocatedTime= async(time_allocated,id)=>{
    
    const updateIt= await runQuery(updateTimer,[time_allocated,id])
    return{
             code:201,
            status:'success',
            message:'timer updated successfully',
            data:updateIt[0]
    }
};

module.exports={setTimer,updateAllocatedTime}
