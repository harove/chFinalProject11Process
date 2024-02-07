import mongoose, {Schema} from "mongoose"
import { randomUUID } from "node:crypto"
import { hasheadasSonIguales, hashear } from '../utils/criptografia.js'
import { DEFAULT_USER_AVATAR_PATH } from "../config.js"


const collection = 'usuarios'

const schema = new Schema({
    // _id: {type: String, default: randomUUID},
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'carts', // Reference to the 'products' collection
        required: true,
    },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: { type: String, required: true},
    password: {type: String, required: true},
    // foto: { type: String, default: DEFAULT_USER_AVATAR_PATH},
    rol: {type: String, enum:['admin', 'user'], default: 'user'}
}, {
    versionKey: false,
    strict: 'throw',
    statics: {
        registrar: async function (userData) {
            try {
                if(userData.password){
                    userData.password = hashear(userData.password)
                }
                userData.rol = 'user'
                const user = await this.create(userData)
                return user.toObject()
            } catch(error){
                const typedError = new Error(error.message)
                typedError['type'] = 'INVALID_ARGUMENT'
                throw typedError
            }  
        },

        autenticar: async function (email, password){
            const user = await this.findOne({email})
            if (!user){
                const typedError = new Error('error de authenticación')
                typedError['type'] = 'FAILED AUTHENTICATION'
                throw typedError
            }
            if(!hasheadasSonIguales(password, user.password)){
                const typedError = new Error('error de authenticación')
                typedError['type'] = 'FAILED AUTHENTICATION'
                throw typedError
            }
            return user.toObject()
        }
        

    }

})

export const manager = mongoose.model(collection, schema)