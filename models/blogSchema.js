const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    author:String,
    userId:String,
    likeBy:Array,
    date:{ type: Date, default: Date.now }
})
const blogs = mongoose.model('bloggTbl',blogSchema)
module.exports = blogs