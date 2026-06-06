import User from "../models/User.js";
import userValidation from "../validations/userValidation.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";
import generateToken from "../utils/jwt.js";

class AuthService {
    async register(data) {
        const parsed = userValidation.parse(data);
        
        const existingUser = await User.findOne({ email: parsed.email });
        if (existingUser) {
            throw new Error("Email is already in use");
        }

        const hashedPassword = await hashPassword(parsed.password);

        const newUser = new User({
            email: parsed.email,
            password: hashedPassword
        });

        await newUser.save()

        const token = generateToken({ userId: newUser._id, email: newUser.email, role: newUser.role });

        return { newUser, token };
    }

    async login(data) {
        const parsed = userValidation.parse(data);

        const user = await User.findOne({ email: parsed.email});
        if (!user) {
            throw new Error("Invalid email or password");
        }

        const isPasswordValid = await comparePassword(parsed.password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = generateToken({ userId: user._id, email: user.email, role: user.role });

        return token;
    }
}

export default new AuthService();