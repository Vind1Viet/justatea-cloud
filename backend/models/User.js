import { createPoolCluster } from 'mysql2';
import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

const User = {
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    },

    async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    async createUser(username, password, role = 'user') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        return { id: result.insertId, username, role };
    },

    async createUserInfo(userId, fullName, phoneNumber, address, email) {
        const [result] = await pool.query('INSERT INTO userInfo (userId, fullName, phoneNumber, address, email) VALUES (?, ?, ?, ?, ?)', [userId, fullName, phoneNumber, address, email]);
        return { id: result.insertId, userId, fullName, phoneNumber, address, email };
    },

    async getUserInfo(userId) {
        const [rows] = await pool.query('SELECT * FROM userInfo WHERE userId = ?', [userId]);
        return rows[0];
    }
};

export default User;