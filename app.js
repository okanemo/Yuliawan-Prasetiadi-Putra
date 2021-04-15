//import Express
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000

//import controller js
const addUser_controller = require('./controllers/addUser')
const listNAB_controller = require('./controllers/listNAB')
const member_controller = require('./controllers/member')
const topUp_controller = require('./controllers/topUp')
const updateTotalBalance_controller = require('./controllers/updateTotalBalance')
const withdraw_controller = require('./controllers/withdraw')
const page404 = require('./controllers/page404')

//routing to controller
app.post('/api/v1/user/add/', addUser_controller.addUser);
app.post('/api/v1/ib/updateTotalBalance/', updateTotalBalance_controller.updateTotalBalance);
app.get('/api/v1/ib/listNAB/', listNAB_controller.listNAB);
app.post('/api/v1/ib/topup/', topUp_controller.topUp);
app.post('/api/v1/ib/withdraw/', withdraw_controller.withdraw);
app.get('/api/v1/ib/member/:userId?', member_controller.member);
app.get('*',page404.page404)

//connect to database
const mongoose = require('mongoose');
const url = require('./Utilities/constant')
const InvestmentDataService = require('./services/investmentDataService')
mongoose.connect(url.databaseURL, {useNewUrlParser: true, useUnifiedTopology: true}); 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected')

  //init InvestmentData
  InvestmentDataService.initInvestmentData();
});



//start server
app.listen(port,()=>{
    console.log('Server Running')
})