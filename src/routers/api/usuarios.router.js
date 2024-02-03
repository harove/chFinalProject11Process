import { Router } from 'express'
import { usuariosManager } from '../../dao/index.js'
import passport from 'passport'
import { tokenizeUserInCookie } from '../../middlewares/tokens.js'
import { soloRoles } from '../../middlewares/authorization.js'





export const usuariosRouter = Router()

// usuariosRouter.post('/', async (req, res) => {
//   try {
//     const usuario = await usuariosManager.create({...req.body, password:hashear(req.body.password)})
//     res.status(201).json({
//       status: 'success',
//       payload: usuario.toObject()
//     })
//   } catch (error) {
//     res.status(400).json({ status: 'error', message: error.message })
//   }
// })

// usuariosRouter.get('/current', soloLogueadosApi, async (req, res) => {
//   //ahora viene el email, ya no depende del _json
//   // @ts-ignore
//   const usuario = await usuariosManager.findOne({ email: req.user.email }, { password: 0 }).lean()
//   res.json({ status: 'success', payload: usuario })
// })

// usuariosRouter.put('/', async function (req, res) {
//   try {

//     // encripto password!
//     req.body.password = hashear(req.body.password)

//     const actualizado = await usuariosManager.updateOne(
//       { email: req.body.email },
//       { $set: { password: req.body.password } },
//       { new: true }
//     )

//     if (!actualizado) {
//       return res.status(404).json({ status: 'error', message: 'usuario no encontrado' })
//     }

//     res.json({ status: 'success', payload: actualizado })
//   } catch (error) {
//     res.status(400).json({ status: 'error', message: error.message })
//   }
// })


usuariosRouter.post('/', 
    async (req, res, next)=>{
        try {
            const user = await usuariosManager.registrar(req.body)
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

usuariosRouter.get('/current', 
    passport.authenticate('jwt', {failWithError: true, session: false}),
    async (req, res, next) =>{
        res.json(req.user)
    }
)

usuariosRouter.get('/findAll', 
    passport.authenticate('jwt', {failWithError: true, session: false}),
    soloRoles(['admin']),
    async (req,res,next)=>{
        try{
            const users = await usuariosManager.find().lean()
            res.json(users) 
        }catch(error){
            next(error)
        }
    }
)