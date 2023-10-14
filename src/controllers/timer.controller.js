const  {setTimer,updateAllocatedTime}= require('../services/timer.service')


const createTimer = async (req, res, next) => {
    try {
        const response = await setTimer(req.body);
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}

const editTimer= async(req,res,next)=>{
    try {
        const response= await updateAllocatedTime(req.body.time,req.params.id)
        return res.status(response.code).json(response)
    } catch (error) {
        next(error)
    }
}
module.exports={createTimer ,editTimer}