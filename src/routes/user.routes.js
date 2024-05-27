const FollowController = require('../controllers/follow.controller');
const settingsController = require('../controllers/settings.controller');
const userController = require('../controllers/user.controller');

const Router = require('express').Router;

const UserRouter = new Router();

UserRouter.post('/follow', FollowController.follow);
UserRouter.delete('/unfollow', FollowController.unfollow);
UserRouter.get('/followers', FollowController.getFollowers);
UserRouter.get('/subscriptions', FollowController.getSubscriptions);
UserRouter.get('/topics', userController.getUserTopics);
UserRouter.get('/rank', userController.getRankOfUsers);
UserRouter.get('/words', userController.getWordsLearned);
UserRouter.get('/search', userController.searchByName);
UserRouter.put('/settings/avatar', settingsController.uploadAvatar);

module.exports = UserRouter;