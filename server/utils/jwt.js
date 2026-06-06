import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return { accessToken, refreshToken };
}

export default generateToken;