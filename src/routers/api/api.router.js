import { Router } from 'express';
import { productsRouter } from './products.router.js';
import { cartsRouter } from './carts.router.js';
import { sesionesRouter } from './sesiones.router.js';
import { usuariosRouter } from './usuarios.router.js';


export const apiRouter = Router()
apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)

apiRouter.use((error, req, res, next) => {
    switch (error.name){
        case 'INVALID_ARGUMENT':
            res.status(400)
            break
        case 'FAILED_AUTHENTICATION':
            res.status(401)
            break
        case 'FAILED_AUTHORIZATION':
            res.status(403)
            break    
        case 'INTERNAL_ERROR':
            res.status(500)
            break
        case 'AuthenticationError':
            res.status(401)
            break
        default:
            console.log('no se que pasó')
            console.log(JSON.stringify(error,null,2))
            res.status(500)
    }



    res.json({
        status:'error',
        message: error.message
    })
})