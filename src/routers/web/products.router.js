import { Router } from 'express'
import { getByIdController, getController } from '../../controllers/web/products.controller.js';
import { soloRoles } from '../../middlewares/authorization.js';
import passport from 'passport';

export const productsRouter = Router()

productsRouter.get('/products',passport.authenticate('jwt', {failWithError: true, session: false}), soloRoles(['user']), getController);
productsRouter.get('/products/:id', getByIdController);

