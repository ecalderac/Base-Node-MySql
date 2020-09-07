const jwt = require('jsonwebtoken');

//VERIFICA TOKEN
let verifyToken = (req, res, next) => {

    let token = req.get('Authorization'); //Token por Headers en Authorization

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token Invalido!'
                },
                err
            });
        }

        req.user = decoded.user;
        next();

    });

};


module.exports = {
    verifyToken
}