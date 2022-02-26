const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../helpers/auth');


//GET post by ID
router.get('/:id', async (req, res) => {

    try {
      const postData = await Post.findOne({
        where: { id: req.params.id },   
        include: { all: true, nested: true }
      });
  
      const post = postData.get({ plain: true });
  
        res.render('post', {
          post,
          logged_in: req.session.logged_in  
        });
      
      } catch (err) {
      res.status(500).json(err);
    }
  });


  router.post('/comment',  async (req, res) => {
    try {
    const newComment = req.body

    newComment.user_id = req.session.user_id
    newComment.post_id = parseInt(newComment.post_id)

    console.log(newComment)

    const savedComment = await Comment.create(newComment);

    res.redirect('/' + newComment.post_id);
    } catch  (err) {
      res.status(500).json(err);
    }
  })

  router.post('/dashboard',  withAuth, async (req, res) => {

    try {
    const newPost = req.body
    newPost.user_id = req.session.user_id
    newPost.created = new Date()

    const savedPost = await Post.create(newPost);

    res.redirect('/');
    } catch {

    }
  })

  router.delete('/delete/:id', async (req, res) => {

    console.log('Hello Delete')
const post_id = req.params.id
console.log('Post id to destroy', post_id)

    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
        },
      });
   console.log('Hello destroy')

      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  

      res.redirect('/dashboard');
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.put('/edit/:id', async (req, res) => {

    try {

      console.log("update:", req.body)
    const updatePost = req.body
   
    const savedPost = await Post.update({
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id:req.params.id,
      }
    });



    console.log("updated for real")

    if (!savedPost) {
      res.status(404).json({ message: 'No post found!' });
      return;
    }

    res.redirect('/');
  
    } catch (err) {
      res.status(500).json(err);
    }
  })
    


  module.exports = router;