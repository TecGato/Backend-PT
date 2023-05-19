require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { SECRET_KEY, SALT } = process.env;

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
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json('User created successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
  register,
  login,
};
