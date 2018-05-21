import {Router} from 'express';
import {ok, badRequest} from './utils';
import {Op} from 'sequelize';
import models from '../models';

export const bet_update = (req, res) => {

 models.User.update({minimumBet: req.body.rangeValue[0], maximumBet: req.body.rangeValue[1]}, {where: {username: req.body.username}})
 .then((sites) => {
  var response = sites;
  return response;
 })
 .then(ok(res))
 .catch(badRequest(res));
    
}

export const user_list = (req, res) => {

  models.User.findAll({

  })
    .then((sites) => {
      var response = {};
      response['sites'] = sites;
      return response;
    })
    .then(ok(res))
    .catch(badRequest(res));
    
}

const router = new Router();

router.put("/", bet_update);
router.get("/", user_list);

export default router;
