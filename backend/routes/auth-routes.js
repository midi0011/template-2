import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtTokens } from '../utils/jwt-helper.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        // password check
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwtTokens(user.rows[0]);

        // Set cookie and send JSON response
        res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
        res.cookie('access_token', token.accessToken, { httpOnly: true });
        return res.status(200).json({
            message: 'Login successful',
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        return res.status(200).json({
            data: req.user,
            authenticated: true,
        });

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
})

router.get('/refresh_token', (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: err.message });
            let token = jwtTokens(user);
            res.cookie('refresh_token', token.refreshToken, { httpOnly: true });
            return res.status(200).json({
                message: 'Refresh token successful',
                ...token,  // include token data in the response
            });
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/logout', (req, res) => {
    try {
        res.clearCookie('refresh_token');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router