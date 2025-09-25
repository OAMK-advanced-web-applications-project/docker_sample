import { getAllTests } from '../models/Test.js'

const getTest = async (req, res, next) => {
  try {
    const result = await getAllTests()
    res.status(200).json(result.rows || [])
  } catch (error) {
    next(error) 
  }
}

export {
  getTest
}