const FollowController = require('../controllers/follow.controller')

const Router = require('express').Router;

const UserRouter = new Router();

UserRouter.post('/follow', FollowController.follow);
UserRouter.delete('/unfollow', FollowController.unfollow);

module.exports = UserRouter;