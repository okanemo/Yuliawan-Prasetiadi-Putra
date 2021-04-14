//import User model, moongose, and investmentDataServices
const User = require('../model/user').User
const moongose = require('mongoose')
const InvestmentDataService = require('../services/investmentDataService')

//Function to add user
const addUser = async (nameParam, userNameParam) => {
    
   var userFound = await checkUserNameIsExist(userNameParam)
   //User not Found, add new User
    if(!userFound){
        const user = new User({ name: nameParam, userName: userNameParam, totalUnit: 0});
        await user.save(function(err){
            console.log(err)
        })
      console.log("User saved!");
      return user._id
      //User Found
    } else {
        console.log("User not added !")
        return null
    }

};

//Function to get member by Id or multiple member with page or limit
const getMember = async(userId = "multiple", page = 0, limit = 20) => {
    //Find with user id 
    const currentInvestmentData = await InvestmentDataService.findLastInvestmentData();  
    if(userId != "multiple"){  
    const user = await User.findById(userId,function(err,result){
        if(err){
            console.log(err)
            return null
        }else {
            return result
        }
    })  
    //return Json with user Id
    const totalAmountIDR = parseFloat(user.totalUnit) * parseFloat(currentInvestmentData.nab) 
     return  { "User ID": user._id, "Total Unit": parseFloat(user.totalUnit), "Total Amount IDR": parseFloat(totalAmountIDR).toFixed(2) , "Current NAB": parseFloat(currentInvestmentData.nab) }   
    
     //Find multiple members
    }else {
     
      const users =  await User.find()
        .sort({'_id': -1})
        .limit(parseInt(limit) )
        .skip(parseInt(page * limit))
        .exec()

        //create new array of json for return
        const results = Array();
        users.forEach(user => {
            const totalAmountIDR = parseFloat(user.totalUnit) * parseFloat(currentInvestmentData.nab)
            results.push({ "User ID": user._id, "Total Unit": parseFloat(user.totalUnit), "Total Amount IDR":parseFloat(totalAmountIDR).toFixed(2) , "Current NAB": parseFloat(currentInvestmentData.nab) })
        });

        return results
    }
}

//Function to check if user name already exist
 async function checkUserNameIsExist(userNameParam) {
     const result = await User.findOne({userName: userNameParam},function(err,obj){

        if(obj === null){
            return null
        }else {
            return obj
        }  
    })
    return result
}

//exports function
exports.addUser = addUser;
exports.getMember = getMember;