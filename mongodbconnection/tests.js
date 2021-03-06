const mongoose = require('mongoose')

const tests = new mongoose.Schema({
    testName:{
        type:String
    },
    participants:[{
        pid:{
            type:String
        },
        attempted:{
            type:Boolean
        }
    }],
    description:{
        type:String
    },
    date:{
        type:String
    },
    startTime:{
        type:String
    },
    timeFrom:{
        type:String
    },
    noofquestions:[{
        type:String
    }],
    testTime:{
        type:String
    }
});



module.exports = Tests = mongoose.model('tests', tests);