const blogs = require('../models/blogSchema')


module.exports.add_blogPage = (req, res) => {
    let  userId = req.user.id
    return res.render('./pages/add_blog', {
        userId
    });
}

module.exports.view_blogPage = async (req, res) => {
    try {
        let  userId = req.user.id
        let data = await blogs.find({ userId});
        console.log(data);
        
        return res.render('./pages/view_blog', { data});
    } catch (error) {
        console.log(error);
        return res.render('./pages/view_blog');
    }
}

module.exports.add_blog = async (req, res) => {
    try {
        await blogs.create(req.body);
        console.log("blog created.");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
}

module.exports.all_blogPage = async (req, res) => {
    try {
        let  userId = req.user.id
        let data = await blogs.find({});
        return res.render('./pages/all_blog', { data, userId});
    } catch (error) {
        console.log(error);
        return res.render('./pages/all_blog');
    }
}
module.exports.delete_blogPage = async(req,res)=>{
    try {
    let {id} = req.params
    await blogs.findByIdAndDelete(id)
    return res.redirect('/view_blog')
} catch (error) {
    console.log(error);
    return res.redirect('/view_blog')
}
}



module.exports.edit_blogPage = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await blogs.findById(id)
        return res.render('./pages/edit_blog', { data })
    } catch (error) {
        console.log(error);
        return res.render('./pages/edit_blog')
    }
}


module.exports.editPage = async (req, res) => {
    try {
        let { id } = req.params;
        await blogs.findByIdAndUpdate(id, req.body);
        console.log("blog Data Updated..");
        return res.redirect('/view_blog');
    } catch (error) {
        console.log(error);
        return res.redirect('/view_blog');
    }
}


module.exports.likeBlog = async (req, res) => {
    try {
        let { id } = req.params;
        let blog = await blogs.findById(id);
        let  userId  = req.user.id;
        let userIndex = blog.likeBy.indexOf(userId);
        console.log(blog);

        if (userIndex == -1) {
            blog.likeBy.push(userId);
        }
        else {
            blog.likeBy.splice(userIndex, 1);
        }
        await blog.save();

        return res.redirect('/all_blog');
    } catch (error) {
        console.log(error);
        return res.redirect('/all_blog');
    }
}

