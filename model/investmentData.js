const moongose = require('mongoose')

//Create InvesmentDate Schema
const investmentDataSchema = new moongose.Schema({
    totalBalance: moongose.Decimal128,
    nab: moongose.Decimal128,
    totalUnit: moongose.Decimal128,
    dateUpdated: Date,
});


//Export InvesmentData Model
exports.investmentData = moongose.model('investmentData', investmentDataSchema);