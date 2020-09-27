var    mongoose    = require("mongoose");

// SCHEMA SETUP
var firmSchema = new mongoose.Schema({
    name: String,
    image: String,
    contact: String,
    location: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    infos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Info"
        }
    ]
});

module.exports = mongoose.model("Firm", firmSchema);