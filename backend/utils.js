import jwt from 'jsonwebtoken'
import userModel from './models/userModel.js';

export const genrateToken = (user) => {
    return jwt.sign({ name: user.name, email: user.email, isAdmin: user.isAdmin, id: user._id }, process.env.JWT_SCRETE_KEY, { expiresIn: '3d' });
}




export const isAuth = async (req, res, next) => {
    try {
        // Get bearer token from Authorization header
        const bearerToken = req?.headers?.authorization;
        if (!bearerToken) {
            return res.status(401).json({ message: "Token required" });
        }

        const token = bearerToken.replace("Bearer ", "");

        const decodedToken = jwt.verify(token, process.env.JWT_SCRETE_KEY); // Check the spelling of 'JWT_SECRET_KEY'

        const user = await userModel.findById(decodedToken.id);

        if (user && user._id) {
            req.user = user;
            next();
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token", error });
        }

        res.status(500).json({ message: "Middleware error", error });
    }
};
