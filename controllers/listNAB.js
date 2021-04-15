const InvestmentDataService = require('../services/investmentDataService')

//Call Service listNAB 
exports.listNAB = async function(req,res){
    try{
       const result = await InvestmentDataService.allNAB();

       if (result != null){
        res.status(200).send(result)
    }else {
        res.status(500).send({ error: "Failed to get data NAB"})
    }
    }catch(e){
        console.log(e)
    }
    
}