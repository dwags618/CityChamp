import express from 'express';
import auth from './auth.route';
import matchdetails from './matchdetails.route';

const routes = express.Router();

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/auth', auth);
routes.use('/matchdetails', matchdetails);

export default routes;
