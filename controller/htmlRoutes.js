const express = require('express');
const router = express.Router();
const {Comment, Post, User} = require('../models');



router.get('/', async(req, res) => {
    try {
        const postData = await Post.findAll({
            include:[{
                model: User,
                attributes: ['firstname', 'lastname']
            }]
        })
     console.log(postData);   
            if(!postData) {
                res.status (400).json({
                    message:"There are no posts."
                }); return
             }

             const posts = postData.map((post)=> post.get({plain:true}))
             console.log(posts);

             res.render('index', {posts})

    } catch (error) {res.status(500).json(error)  
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})


module.exports=router