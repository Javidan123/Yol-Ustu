import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

