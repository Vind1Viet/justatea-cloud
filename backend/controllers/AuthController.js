import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const AuthController = {
    async register(req, res) {
        const { username, password, fullName, phoneNumber, address, email } = req.body;
        try {
            const existingUser = await User.findByUsername(username);   
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            const newUser = await User.createUser(username, password);
            await User.createUserInfo(newUser.id, fullName, phoneNumber, address, email);
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ arguments: { userId: user.id, accessToken: token, role: user.role }, message: 'Login successful' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default AuthController;
