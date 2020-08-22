import express from 'express';
import UserController from './controller/Users';

const userController = new UserController();

const routes = express.Router();

routes.get('/auth', (req, res) => userController.login(req, res));

routes.get('/verify', (req, res) => userController.verify(req, res));

export default routes;