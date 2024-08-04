

const EffortTest = async(req,res) => {
    try{
        console.log("successfully executed YOur Back Request");
        res.status(200).json({message:"Be Grateful and Put More Effort"})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}

const privilege = async(req,res) => {
    try{
        // console.log("successfully executed YOur Back Request");
        res.status(200).json({message:"Few Are Made for Independance It is the Privilege Of Strong"})
    }
    catch(err){
        res.status(500).json({err:err.message})
    }
}

export default {EffortTest, privilege}