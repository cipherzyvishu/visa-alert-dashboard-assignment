export const errorHanlder = (err,req,res,next) => {
    console.log("Error",err.message);
    res.status(500).json({
        message: "Internal server Error"
    })
    
}