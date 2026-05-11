import { createPoolCluster } from 'mysql2';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
    // Find user by ID
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    // Find user by username
    async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    // Create a new user
    async createUser(username, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        return { id: result.insertId, username, role };
    },

    // Create user information
    async createUserInfo(userId, fullName, phoneNumber, address, email) {
        const [result] = await pool.query('INSERT INTO userInfo (userId, fullName, phoneNumber, address, email) VALUES (?, ?, ?, ?, ?)', [userId, fullName, phoneNumber, address, email]);
        return { id: result.insertId, userId, fullName, phoneNumber, address, email };
    },

    // Get user information
    async getUserInfo(userId) {
        const [rows] = await pool.query('SELECT * FROM userInfo WHERE userId = ?', [userId]);
        return rows[0];
    }
};

export default User;