const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middlewares/admin.middleware');

const Router = require('express').Router;

const AdminRouter = new Router();

AdminRouter.post('/role', adminMiddleware, adminController.changeUserRole);

module.exports = AdminRouter;