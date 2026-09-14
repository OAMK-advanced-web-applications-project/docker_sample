import { ApiError } from '../helper/ApiError.js' 
import { compare, hash } from 'bcrypt' 
import jwt from 'jsonwebtoken' 
import { getUserByEmail } from '../models/User.js'

const { sign } = jwt 
 
const signin = async (req, res,next) => { 
  try { 
    const email = req.body.user?.email?.trim().toLowerCase() 
    const password = req.body.user?.password 
    if (!email || !password) { 
      const error = new Error('Email and password are required') 
      error.status = 400 
      return next(error) 
    } 

    // mock up data. should come from database in future
    const result = await getUserByEmail(email);

    const dbUser = result.rows[0] 
    if (!dbUser || !(await compare(password, dbUser.password.trimEnd()))) { 
      const error = new Error('Invalid email or password') 
      error.status = 401 
      return next(error) 
    } 
    const token = sign( 
      { userId: dbUser.userID, email: dbUser.email }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, 
    ) 
    return res.status(200).json({ id: dbUser.id, email: dbUser.email, token })
  } catch (error) { 
    console.log(error);
    return next(error) 
  } 
} 
 
export { signin } 
