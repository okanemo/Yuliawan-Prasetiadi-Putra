const InvestmentData = require('../model/investmentData').investmentData
const User = require('../model/user').User

//init investment data if no data before
const initInvestmentData = async () => {
    //check total user
    try{
        const userCount = await User.estimatedDocumentCount({}, function(err, count){
            if(err){
                throw err
            }else {
                return count
            }
        })
        const investmentDataCount = await InvestmentData.estimatedDocumentCount({},function(err,count){
            if(err){
                throw err
            }else {
                return count
            }
        })
        //check if investment data exist and user zero, update lastest data NAB to 1
        if(investmentDataCount > 0 && userCount == 0){
            InvestmentData.findOne({},{},{sort:{ 'created_at': -1}},function(err, investmentdata){
            if(investmentdata.nab != 1){
            investmentdata.nab = 1
            investmentdata.save();
            } 
            }) 
            // check if invenstment data zero and user count zero, create new investmentData
        } else if (investmentDataCount == 0  && userCount == 0){
            const currentInvestmentData = new InvestmentData({totalBalance: 0.00, nab: 1.0000, totalUnit: 0.0000, dateUpdated: Date.now()});
            currentInvestmentData.save()
        } 
    }catch(e){
        console.log(e)
    }
   
   console.log("Current investment data is initialize")
};


//Function update balance and Total Unit
async function updateTotalBalance(currentBalance = 0, addTotalUnit = 0) {
    //check is number
    if(!isNaN(currentBalance)){
        //calculate total unit 
        const lastInvestmentData = await findLastInvestmentData()
        const totalUnit = parseFloat(lastInvestmentData.totalUnit)  + parseFloat(addTotalUnit) 
        //calculate new NAB
        const newNAB = calculateNewNAB(currentBalance, totalUnit)
        //save new Investment Data
        const newInvesmentData = new InvestmentData({totalBalance: parseFloat(currentBalance).toFixed(2), nab: parseFloat(newNAB).toFixed(4), totalUnit: parseFloat(totalUnit).toFixed(4), dateUpdated: Date.now()});
        await newInvesmentData.save(function(err){ 
            return "Error save current balance"
        })
        return newNAB
    }else {
        return "Please input number to current balance"
    }   
};

//Function calculate new NAB With New Balance
 function calculateNewNAB(currentBalance, totalUnit){
    if (totalUnit == 0 ){
        return 1
    }else {
        return (currentBalance / totalUnit).toFixed(4)
    }
}

//Function to show all NAB
const allNAB = async () => {
  const allNAB = await InvestmentData.find({},{'_id': 0, 'nab':1, 'dateUpdated': 1})
  .sort({ _id: -1 }).then((investmentDatas) =>{
        var result = new Array();
        investmentDatas.forEach(investmentData => {
            investmentData.dateUpdated = investmentData.dateUpdated.toLocaleString()
            const nab = parseFloat(investmentData.nab)
           result.push({'NAB':  nab, "date": investmentData.dateUpdated.toLocaleString()})
        });
        return result
    });
    return allNAB
} 

//Function to top up 
const topUp = async(user_id, amount_rupiah) => {
    const user = await findUserById(user_id)
    if(!isNaN(amount_rupiah) && user != null){
        const currentInvestmentData = await findLastInvestmentData()
        const topUpUnit = parseFloat(amount_rupiah)  / parseFloat(currentInvestmentData.nab) 
      

        //update  data Investment
        const currentBalance = parseFloat(currentInvestmentData.totalBalance) + parseFloat(amount_rupiah)
        const newNAB = await updateTotalBalance( currentBalance, parseFloat(topUpUnit) )

          //update user unit
          const totalUnit = parseFloat(user.totalUnit) + parseFloat(topUpUnit) 
          user.totalUnit = totalUnit
          await user.save()

        //return JSON
        const totalAmountIDR = user.totalUnit * newNAB
        return {"Top Up Unit": topUpUnit.toFixed(4),"Total Unit": parseFloat(user.totalUnit).toFixed(4) , "Amount Idr": totalAmountIDR.toFixed(2)}
    }else {
        console.log("Input for top up are incorrect")
        return null
    }
}

//Function to withdraw
const withdraw = async(user_id, amount_rupiah) => {
    const user = await findUserById(user_id)
    if(!isNaN(amount_rupiah) && user != null){
        const currentInvestmentData = await findLastInvestmentData()
        
        //check user Balance
        const userAmountIDR = parseFloat(user.totalUnit) * parseFloat(currentInvestmentData.nab) 
        if(userAmountIDR > amount_rupiah) {
            const withdrawnUnit = -Math.abs(amount_rupiah / parseFloat(currentInvestmentData.nab) ) 

            //update data investment
            const currentBalance = parseFloat(currentInvestmentData.totalBalance) - parseFloat(amount_rupiah)
            const newNAB = await updateTotalBalance( currentBalance, parseFloat(withdrawnUnit) )

            //update User unit
            const currentUnit = parseFloat(user.totalUnit) + parseFloat(withdrawnUnit)
            user.totalUnit = parseFloat(currentUnit).toFixed(4)
            await user.save()

            //return JSON
            const totalAmountIDR = user.totalUnit * newNAB
            return {"withdrawn Unit": withdrawnUnit.toFixed(4),"Total Unit": parseFloat(user.totalUnit).toFixed(4) , "Amount Idr": totalAmountIDR.toFixed(2)}

        }else {
            return {"error" : "insufficient funds to withdrawn"}
        }

    }
}

//Function find user by user_id
async function findUserById(user_id){
  const user = await User.findById(user_id)
  if(user == null){
      return null
  }else {
      return user
  }
}

//Function find last updated data
async function findLastInvestmentData(){
    const investmentData = await InvestmentData.findOne().sort({$natural: -1})
      return investmentData
 }


//exports function
exports.initInvestmentData = initInvestmentData;
exports.updateTotalBalance = updateTotalBalance;
exports.allNAB = allNAB;
exports.topUp = topUp;
exports.withdraw = withdraw;
exports.findLastInvestmentData = findLastInvestmentData;