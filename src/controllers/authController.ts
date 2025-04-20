import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

interface RegisterDTO { name: string; email: string; password: string }
interface LoginDTO { email: string; password: string }

export async function registerUser({ name, email, password }: RegisterDTO) {
  const exists = await User.findOne({ email })
  if (exists) throw new Error('Email already in use')
  const hash = await bcrypt.hash(password, 10)
  const user = await User.create({ name, email, passwordHash: hash })
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
}

export async function loginUser({ email, password }: LoginDTO) {
  const user = await User.findOne({ email })
  if (!user) throw new Error('Invalid credentials')
  const match = await bcrypt.compare(password, user.passwordHash)
  if (!match) throw new Error('Invalid credentials')
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' })
}