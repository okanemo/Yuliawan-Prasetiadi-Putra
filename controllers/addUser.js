const userServices = require('../services/userService')

//Call Service getMember with name, and user Id as params 
exports.addUser = async function(req,res){
    try{
        const result = await userServices.addUser(req.body.name, req.body.userName)
    
        if (result != null){
            res.status(200).send({ userId: result._id})
        }else {
            res.status(409).send({ error: "Username Exist"})
        }
   
    }catch(e){
        console.log(e)
    }
  
}