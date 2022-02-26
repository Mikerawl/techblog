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

             const posts = postData.map((post) => post.get({plain:true}))
            //console.log(posts);

             res.render('index', {posts, logged_in: req.session.logged_in})

    } catch (error) {res.status(500).json(error)  
    }
})

router.get('/dashboard', async(req, res) => {
    try {
        const userId = req.session.user_id;
        console.log(userId)
    //     const postData = await Post.findAll({
    //         include:[{
    //             model: User,
    //             attributes: ['firstname', 'lastname']
    //         }]
    //     })
    //  console.log(postData);   
    //         if(!postData) {
    //             res.status (400).json({
    //                 message:"There are no posts."
    //             }); return
    //          }

    //          const posts = postData.map((post) => post.get({plain:true}))
    //         //console.log(posts);

    //          res.render('index', {posts, logged_in: req.session.logged_in})

    } catch (error) {res.status(500).json(error)  
    }
})


router.get('/:id', async(req, res) => {
    console.log("Hello");
    try {
        const postData = await Post.findByPk(req.params.id, {
            include:[{
                model: User,
                attributes: ['firstname', 'lastname']
            },{
                model: Comment,
                attributes:['comment']   
            } ]
        })
     console.log(postData);   
             if(!postData) {
                res.status (400).json({
                    message:"There are no posts."
                }); return
             }

             console.log("Post Data", postData);

             const post = postData.get({plain:true})
             console.log("Posts", post);

             res.render('post', {post, logged_in: req.session.logged_in})

    } catch (error) {res.status(500).json(error)  
    }
})



router.get('/login', (req, res) => {
    res.render('login')
 })


module.exports=router