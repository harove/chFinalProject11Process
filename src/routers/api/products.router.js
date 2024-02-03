import { Router } from 'express';
import { getController, postController, getByIdController, updateController, deleteController } from '../../controllers/rest/products.controller.js';
import { soloLogueadosApi } from '../../middlewares/autorizacion.js';
import { soloRoles } from '../../middlewares/authorization.js';
import passport from 'passport';


export const productsRouter = Router()
productsRouter.get('/:id', getByIdController)
productsRouter.get('',passport.authenticate('jwt', {failWithError: true, session: false}) ,soloRoles(['user']), getController)
productsRouter.post('', postController)
productsRouter.put('/:id', updateController)
productsRouter.delete('/:id', deleteController)
productsRouter.post('/:id/actualizaciones', updateController)