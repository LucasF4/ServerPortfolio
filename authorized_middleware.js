
const config = require('./config/config')

module.exports = () => {
    return (req, res, next) => {
        console.log(req.headers)
        console.log('Authorization middleware necessary')

        const auth = req.headers['authorization'];
        if(auth != process.env.SECRET){
            console.log(auth)
            console.log(config.HEADER_SECRET)
            console.log(process.env.SECRET)
            console.log('Authorization denied')
            return res.status(401).send('Somethings went wrong')
        }else{
            console.log('Authorization confirmated!')
            next();
        }
    }
}