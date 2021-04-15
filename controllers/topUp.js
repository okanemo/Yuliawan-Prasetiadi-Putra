const InvestmentDataService = require('../services/investmentDataService')

//Call Service topUP with  user id and amount idr as params 
exports.topUp = async function(req,res){
    try{
        const result = await InvestmentDataService.topUp(req.body.user_id,req.body.amount)
    
        if (result != null){
            res.status(200).send(result)
        }else {
            res.status(400).send({ error: "Error, cannot Top Up Now"})
        }
   
    }catch(e){
        console.log(e)
    }
}