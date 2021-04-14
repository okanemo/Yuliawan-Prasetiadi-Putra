const InvestmentDataService = require('../services/investmentDataService')

//Call Service withdraw with  user id and amount idr as params 
exports.withdraw = async function(req,res){
    try{
        const result = await InvestmentDataService.withdraw(req.body.user_id,req.body.amount)
        
        if (result != null){
            res.status(200).send(result)
        }else {
            res.status(400).send({ error: "Cannot Withdraw balance now"})
        }
   
    }catch(e){
        console.log(e)
    }
}