import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../models/userModel.js';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = await findUserByEmail(email);
  if (user) return res.status(400).json({ message: 'User already exists' });

  const hashed = await bcrypt.hash(password, 10);
  const userId = await createUser(name, email, hashed, role);
  res.status(201).json({ userId });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token, userId: user.id, role: user.role });  // ✅ Send role & id
};
