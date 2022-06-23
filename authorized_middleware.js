const config = require('./config/config')

module.exports = () => {
    return (req, res, next) => {
        console.log('Authorization middleware necessary')

        const auth = req.headers['authorization'];
        if(auth != config.JWT_SECRET){
            console.log('Authorization denied')
            return res.status(401).send('Somethings went wrong')
        }else{
            console.log('Authorization confirmated!')
            next();
        }
    }
}