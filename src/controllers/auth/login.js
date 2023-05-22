require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../db');
const { SECRET_KEY } = process.env;

async function login(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Invalid password');
    }
    const payload = { email: user.email, password: user.password };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 60 * 1,
      sameSite: 'none',
      secure: true,
    });
    res.status(200).send("You're logged in");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User Email.
 *               password:
 *                 type: string
 *                 description: User Password.
 *             example:
 *               email: juan@gmail.com
 *               password: juan1234
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: You're logged in
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               description: Authentication token cookie
 *       400:
 *         description: Invalid email, user not found, or invalid password
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Invalid email, user not found, or invalid password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
