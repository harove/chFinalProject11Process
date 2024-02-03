import { Router } from 'express'
import { usuariosManager } from '../../dao/index.js'
import { deleteTokenFromCookie, tokenizeUserInCookie } from '../../middlewares/tokens.js'

export const sesionesRouter = Router()

// sesionesRouter.post('/',
//   passport.authenticate('loginLocal', {
//     failWithError: true
//   }),
//   async (req, res, next) => {
//     res.status(201).json({ status: 'success', message: 'login success' })
//   },
//   (error, req, res, next) => {
//     res.status(401).json({ status: 'error', message: error.message })
//   }
// )

// sesionesRouter.get('/current', soloLogueadosApi, (req, res) => {
//   res.json(req.user)
// })

// sesionesRouter.delete('/current', async (req, res) => {
//   req.session.destroy(err => {
//     res.status(204).json({ status: 'success' })
//   })
// })

sesionesRouter.post('/', 
    async (req, res, next)=>{
        try {
            const user = await usuariosManager.autenticar(req.body.email, req.body.password)
            req.user = user
            next()
        }catch(error){
            next(error)
        }
    },
    tokenizeUserInCookie,
    (req, res)=>{
        res.status(201).json(req.user)
    }
)

sesionesRouter.delete('/current',
    deleteTokenFromCookie,
    (req, res, next)=>{
        res.sendStatus(204)
    }
)