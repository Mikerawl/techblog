const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../models');
const sequelize = require("../Config/connection");
const withAuth = require('../helpers/auth');



router.get('/', async (req, res) => {
    try{
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: [  'firstname', 'lastname' ],
                },
              ],
        });
       
        if (!postData) {
            res.status(404).json({
                message: "There are no posts!"
            });
            return }

            const posts = postData.map((post) => post.get({ plain: true }));

            res.render('index', {
                posts,
                logged_in: req.session.logged_in 
              });
    } catch (err) {
        res.status(500).json(err);
    }   
});


router.get('/dashboard', withAuth, async (req, res) => {
 
    const userId = req.session.user_id;
    try{
        const getUser = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
          });
       
          const user = getUser.get({ plain: true });
        
       const getPost = await Post.findAll({
        where: {
            user_id: user.id
          },
      });


      const posts = getPost.map((post) => post.get({ plain: true }));

        res.render("dashboard",{
            posts,
            user,
            logged_in: req.session.logged_in 
        })
        
    } catch (err) {
        res.status(500).json(err);
    }   
});

router.get('/:id', async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id,{ 
        
            include: [ 
                {
                    model: User,
                    attributes: ['firstname', 'lastname']
                },
                {
                    model: Comment,
                    attributes: ['comment']
                }
            ]
        });

        if (!postData) {   
            res.status(404).json({
              message: "There are no posts",
            });
            return;
          }

        const post = postData.get({ plain: true });
       
        res.render('post', {
            post,
            logged_in: req.session.logged_in 
          });
    } catch (err) {
        res.status(500).json(err);
    }   
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.findByPk(req.params.id,{ 
        
            include: [ 
                {
                    model: User,
                    attributes: ['firstname', 'lastname']
                },
            ]
        });

        if (!postData) {   
            res.status(404).json({
              message: "There are no posts",
            });
            return;
          }

        const post = postData.get({ plain: true });
       
        
        res.render('edit', {
            post,
            logged_in: req.session.logged_in 
          });
    } catch (err) {
        res.status(500).json(err);
    }   
});

module.exports=router