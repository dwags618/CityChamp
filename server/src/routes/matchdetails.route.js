import {Router} from 'express';
import {ok, badRequest} from './utils';
import {Op} from 'sequelize';
import models from '../models';

export const bet_update = (req, res) => {

  /*const userData = {
        name: req.body.name,
        username: req.body.username,
        password: password,
        minimumBet: req.body.rangeValue[0],
        maximumBet: req.body.rangeValue[1]
      };

  models.User.create(userData)
    .then(ok(res))
    .catch(badRequest(res));*/

 models.User.update({minimumBet: req.body.rangeValue[0], maximumBet: req.body.rangeValue[1]}, {where: {username: req.body.username}})
 .then((sites) => {
  var response = sites;
  return response;
 })
 .then(ok(res))
 .catch(badRequest(res));
    
}

    
  

const router = new Router();

router.put("/", bet_update);

export default router;
