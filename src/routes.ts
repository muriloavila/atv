import express from 'express';
import UserController from './controller/Users';

const userController = new UserController();

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send({message: 'Hello World'});
});

routes.get('/auth', (req, res) => userController.verify(req, res));


export default routes;