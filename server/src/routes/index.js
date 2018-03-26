import express from 'express';
import auth from './auth.route';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/auth', auth);

export default routes;
