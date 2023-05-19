require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { SECRET_KEY, SALT } = process.env;

async function register(req, res) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send('Missing email or password');
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).send('User already exists');
    }
    const salt = await bcrypt.genSalt(SALT);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      email,
      password: hash,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
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
    const token = jwt.sign({ id: user.id }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
