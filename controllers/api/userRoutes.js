const router = require('express').Router();
const { User, Post, Comment } = require('../../models/index');
const checkAuth = require('../../utils/auth');

// Get all users - /api/users/
router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['id', 'title']
                }
            }
        ]
    })
    .then(userData => {
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Get single user - /api/users/:id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {exclude: ['password']},
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_body', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['id', 'title']
                }
            }
        ]
    })
    .then(userData => {
        if(!userData) {
            res.status(404).json({message: 'No user found with that id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Create new user - /api/users/
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.isLoggedIn = true;
        
            res.json(userData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// User login - /api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({message: 'No user found with this username'});
            return;
        }

        // Validate password
        const validatePass = userData.checkPassword(req.body.password);
        if (!validatePass) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }

        // Save new session
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.isLoggedIn = true;


            res.json({user: userData, message: 'Logged In!'});
        });
    })
    .catch(err => res.status(500).json(err));
});

// User logout - /api/users/logout
router.post('/logout', (req, res) => {
    if (req.session.isLoggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Delete a user - /api/users/:id
router.delete('/:id', checkAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;