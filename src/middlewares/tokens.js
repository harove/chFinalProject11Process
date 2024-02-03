
import { COOKIE_OPTIONS } from "../config.js"
import { encriptar } from "../utils/criptografia.js"

export async function tokenizeUserInCookie(req, res, next){
    try{
        const token = await encriptar(req.user)
        res.cookie('authorization', token, COOKIE_OPTIONS)
        next()
    }catch(error){
        next(error)
    }
}

export async function deleteTokenFromCookie(req, res, next){
    res.clearCookie('authorization', COOKIE_OPTIONS)
    next()
}