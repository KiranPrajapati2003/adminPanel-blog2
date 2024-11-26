const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        }
    }
)

const User = mongoose.model('blogusertbl', userSchema);

module.exports = User;