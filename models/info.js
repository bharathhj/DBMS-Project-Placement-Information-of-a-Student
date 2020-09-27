var mongoose = require("mongoose");

var infoSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    year: String,
    role: String,
    description: String,
    benefit: String,
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Info", infoSchema);