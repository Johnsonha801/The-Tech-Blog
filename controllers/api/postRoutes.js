const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');
const checkAuth = require('../../utils/auth');

// Get all posts - /api/posts/
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'Desc']],
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
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get single post - /api/posts/:id
router.get('/:id', (req, res) => {
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
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create new post - /api/posts/
router.post('/', checkAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Update a post - /api/posts/:id
router.put('/:id', checkAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_body: req.body.post_body
        }, 
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(postData => {
        if(!postData) {
            res.status(404).json({message: 'No post found using this id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Delete a post - /api/posts/:id
router.delete('/:id', checkAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({message: 'No post found using that id'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;