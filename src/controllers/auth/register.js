require('dotenv').config();
const bcrypt = require('bcrypt');
const { User } = require('../../db');
const { SALT } = process.env;
const { transporter } = require('../../config/mailer');

async function register(req, res) {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      return res.status(400).send('Missing email, password or name');
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send('User already exists');
    }
    console.log(SALT);
    const salt = await bcrypt.genSalt(parseInt(SALT));
    const hash = await bcrypt.hash(password, salt);
    await User.create({
      name,
      email,
      password: hash,
    });
    await transporter.sendMail({
      from: '"User Created 👻" <franco.elvis0606@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'User Created Successfully', // Subject line
      html: `
      <h1>Hi ${name} </h1>
      <p>Your count on Disney World API was created successfully</p>
      `, // html body
    });
    res.status(201).json('User created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
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
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - name
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing email, password, or name / User already exists
 *       500:
 *         description: Internal server error
 */
