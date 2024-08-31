import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');
        res.json({ users: users.rows });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, first_name, last_name, email, password, user_address, user_role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, first_name, last_name, email, password, user_address, user_role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [username, first_name, last_name, email, hashedPassword, user_address, user_role];
        const newUser = await pool.query(query, values);
        res.json({ user: newUser.rows[0], message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router