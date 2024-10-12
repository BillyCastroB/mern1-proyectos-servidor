import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denegada' });
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (err) {
        console.error("Error en el token:", err);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export default authMiddleware;
