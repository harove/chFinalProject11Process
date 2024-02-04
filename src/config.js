// export const MONGODB_CNX_STR = 'mongodb://localhost/ecommerce';
export const MONGODB_CNX_STR = 'mongodb+srv://harove:harove@cluster0.56slkyh.mongodb.net/ecommerce';
export const PORT = 8080
export const SESSION_SECRET = 'SecretCoder'
export const ADMIN_EMAIL = 'adminCoder@coder.com'
export const GITHUB_APP_ID = 783915
export const GITHUB_CLIENT_ID = 'Iv1.03ebfa74d8919e54'
export const GITHUB_CLIENT_SECRET = '0c349a21b1d19182d33d2640dcd7917ca8ca0f66'
export const GITHUB_CALLBACK_URL = 'http://localhost:8080/githubcallback'
export const COOKIE_SECRET = "cookieSecret"
export const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 1000*60*60*24,
    signed: true,
}
export const JWT_PRIVATE_KEY = 'jwtSecret'
export const DEFAULT_USER_AVATAR_PATH = './static/imgs/default-user.webp'