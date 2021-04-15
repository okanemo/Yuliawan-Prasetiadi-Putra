const InvestmentDataService = require('../services/investmentDataService')

//Call Service updateTotalBalance with new balance as params 
exports.updateTotalBalance = async function(req,res){
    try{
        const result = await InvestmentDataService.updateTotalBalance(req.body.current_balance)
    
        if (!isNaN(result)){
            res.status(200).send({ NAB: result })
        }else {
            res.status(400).send({ error: "Error Cannot update Balance"})
        }
   
    }catch(e){
        console.log(e)
    }
    
}