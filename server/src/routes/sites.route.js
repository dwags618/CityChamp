import {Router} from 'express';
import {ok, badRequest} from './utils';
import {Op} from 'sequelize';
import models from '../models';

export const site_list = (req, res) => {
  models.Maps.findAll({

  })
    .then((sites) => {
      var response = {};
      response['sites'] = sites;
      return response;
    })
    .then(ok(res))
    .catch(badRequest(res));
}

export const site_description = (req, res) => {
  models.Maps.findAll({
    attributes: ['name', 'value']
  })
    .then((sites) => {
      var response = sites;
      
      return response;
    })
    .then(ok(res))
    .catch(badRequest(res));
}

export const site_create = (req, res) => {
  models.Maps.create(req.body)
    .then(ok(res))
    .catch(badRequest(res));
}

export const site_destroyAll = (req, res) => {
  models.Maps.destroy({
    where: {}
  })
    .then(ok(res))
    .catch(badRequest(res));
};



const router = new Router();

router.get("/", site_list);
router.get("/description", site_description);
router.post("/", site_create);
router.delete("/all", site_destroyAll);

export default router;
