const userServices = require('../services/userService')

//Call Service getMember with user Id, page, or limit as params 
exports.member = async function(req,res){
    try{
        const result = await userServices.getMember(req.params.userId, req.query.page,req.query.limit)
        
        if (result != null){
            res.status(200).send(result)
        }else {
            res.status(409).send({ error: "Cannot Get member data now"})
        }
   
    }catch(e){
        console.log(e)
    }
}