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

export const save_image = (req, res) => {
 
 models.User.update({image: req.body.file}, {where: {username: req.body.username}})
 .then((sites) => {
  var response = sites;
  return response;
 })
 .then(ok(res))
 .catch(badRequest(res));
}

export const save_coordinates = (req, res) => {
 
 models.User.update({latitude: req.body.latitude, longitude: req.body.longitude}, {where: {username: req.body.username}})
 .then((sites) => {
  var response = sites;
  return response;
 })
 .then(ok(res))
 .catch(badRequest(res));
}

export const save_slidervalue = (req, res) => {
 
 models.User.update({maximumDistance: req.body.maximumDistance}, {where: {username: req.body.username}})
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
    .then((users) => {
      var response = {};
      response['users'] = users;
      return response;
    })
    .then(ok(res))
    .catch(badRequest(res));
}

export const user_details = (req, res) => {

  models.User.findOne({
  where: {username: req.body.username},
  attributes: ['name', 'username', 'maximumDistance']
})
    .then((users) => {
      var response = {};
      response['users'] = users;
      return response;
    })
    .then(ok(res))
    .catch(badRequest(res));
}

const router = new Router();

router.put("/", bet_update);
router.put("/image", save_image);
router.put("/coordinates", save_coordinates);
router.put("/slidervalue", save_slidervalue);
router.get("/", user_list);
router.get("/userdetails", user_details);

export default router;
