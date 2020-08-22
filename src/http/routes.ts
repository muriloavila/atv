import express from 'express';
import UserController from '../database/controller/Users';

const userController = new UserController();

const routes = express.Router();

routes.get('/auth', (req, res) => userController.login(req, res));

export default routes;