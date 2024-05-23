const testController = require('../controllers/test.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

const Router = require('express').Router;

const TestRouter = new Router();

TestRouter.get('/topics', testController.getTopics);
TestRouter.post('/topic/create', adminMiddleware, testController.createTopic);
TestRouter.delete('/topic/delete', adminMiddleware, testController.deleteTopic);
TestRouter.post('/topic/start', testController.startTopic);
TestRouter.get('/topic/search', testController.searchTopic);
TestRouter.get('/topic/words', testController.getTopicWords);

TestRouter.get('/words', adminMiddleware, testController.getAllWords);
TestRouter.put('/word/create', adminMiddleware, testController.createWord);
TestRouter.delete('/word/delete', adminMiddleware, testController.deleteWord);
TestRouter.get('/word/search', testController.searchWord);

TestRouter.get('/result', testController.getResult);
TestRouter.post('/answer', testController.answering);


module.exports = TestRouter;