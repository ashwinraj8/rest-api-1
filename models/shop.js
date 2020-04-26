let mongoose = require('mongoose');

let shopSchema = new mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    Product:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true

    }
})

module.exports = mongoose.model('Subscriber',shopSchema);