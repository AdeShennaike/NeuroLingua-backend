import { requestQuiz } from '../services/gptapi.js'
import { Profile, Quiz, Feedback } from '../models/quiz.js'
import { User } from '../models/user.js'

const options = ["spanish", "feminine", "casual", "high", "low"]

async function getQuizHistory(req, res) {
  try {
    console.log("getQuizHistory - User: ", req.user)
    const response = await requestQuiz(...options)
    return res.status(200).json([response, response, response, response])
  } catch (error) {
    console.error('Error in getQuizHistory:', error)
    return res.status(500).json({ message: 'Internal server error in getQuizHistory' })
  }
}

async function getQuizDetails(req, res) {
  try {
    console.log("getQuizDetails - User: ", req.user)
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in getQuizDetails:', error)
    return res.status(500).json({ message: 'Internal server error in getQuizDetails' })
  }
}

async function getQuiz(req, res) {
  try {
    console.log("getQuiz, user: ", req.user)
    const profile = await Profile.findOne({_id: req.user.profile})
    console.log(profile)
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in getQuiz:', error)
    return res.status(500).json({ message: 'Internal server error in getQuiz' })
  }
}

async function answerQuiz(req, res) {
  try {
    console.log("answerQuiz - User: ", req.user)
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in answerQuiz:', error)
    return res.status(500).json({ message: 'Internal server error in answerQuiz' })
  }
}

async function removeQuizFromHistory(req, res) {
  try {
    console.log("removeQuizFromHistory - User: ", req.user)
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in removeQuizFromHistory:', error)
    return res.status(500).json({ message: 'Internal server error in removeQuizFromHistory' })
  }
}

async function provideFeedback(req, res) {
  try {
    console.log("provideFeedback - User: ", req.user)
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in provideFeedback:', error)
    return res.status(500).json({ message: 'Internal server error in provideFeedback' })
  }
}


export {
  getQuizHistory,
  getQuizDetails,
  getQuiz,
  answerQuiz,
  removeQuizFromHistory,
  provideFeedback
}