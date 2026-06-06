import authService from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const newUser = await authService.register(req.body);
        res.status(201).json({ success: true, message: "User was registered", data: newUser });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

export const login = async (req, res) => {
    try {
        const token = await authService.login(req.body);
        res.cookie("refreshToken", token.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({ success: true, message: "User was logged in", data: token.accessToken });
    } catch (err) {
        res.status(500).json({ success: false, message:err.message });
    }
}

export const logout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });

    res.status(200).json({ success: true, message: "User was logged out" });
}