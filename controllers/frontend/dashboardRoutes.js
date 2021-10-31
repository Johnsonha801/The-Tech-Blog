const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');
const checkAuth = require('../../utils/auth');

// Render Dashboard
router.get('/', checkAuth, (req, res) => {
    Post.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: Comment,
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      })
        .then(postData => {
          const posts = postData.map(post => post.get({ plain: true }));
          res.render('dashboard', { posts, isLoggedIn: req.session.isLoggedIn, username: req.session.username });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// Render Edit Post
router.get('/edit/:id', checkAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'created_at', 'user_id', 'post_id'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }

        // serialize the data
        const post = postData.get({ plain: true });

        res.render('edit-post', { post, isLoggedIn: req.session.isLoggedIn, username: req.session.username });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Render Create Post
router.get('/create', checkAuth, (req, res) => {
    res.render('create-post', {isLoggedIn: req.session.isLoggedIn, username: req.session.username});
});

module.exports = router;