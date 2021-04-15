const userServices = require('../services/userService')

//Call Service getMember with user Id, page, or limit as params 
exports.member = async function(req,res){
    try{
        const result = await userServices.getMember(req.params.userId, req.query.page,req.query.limit)
        
        if (result != null){
            res.status(200).send(result)
        }else {
            res.status(400).send({ error: "Error cannot Get member data"})
        }
   
    }catch(e){
        console.log(e)
    }
}