import { requestQuiz, requestSampleQuiz } from '../services/gptapi.js'
import { Quiz, Feedback } from '../models/quiz.js'
import { Profile } from '../models/profile.js'
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
    const id = req.params.id
    return res.status(200).json(requestQuiz(...options))
  } catch (error) {
    console.error('Error in getQuizDetails:', error)
    return res.status(500).json({ message: 'Internal server error in getQuizDetails' })
  }
}

async function getQuiz(req, res) {
  try {
    console.log("getQuiz, user: ", req.user)
    const profile = await Profile.findOne({ _id: req.user.profile })

    const quiz = await Quiz.findOne({
      _id: { $nin: profile.quizzes },
      language: profile.language,
      difficulty: profile.difficulty,
      formality: profile.formality,
      drama: profile.drama 
    })

    if (quiz) {
      return res.status(200).json(quiz)
    } else {
      const preferences = [profile.localized, profile.language, profile.tone, profile.formality, profile.drama, profile.difficulty ]
      const newQuizPrompt = await requestQuiz(...preferences)
      if(!newQuizPrompt.prompt || !newQuizPrompt.answer || !newQuizPrompt.wrongAnswers) {
        console.log("ERROR CREATING QUIZ: ", newQuizPrompt)
        throw "ERROR CREATING QUIZ"
      }
      const newQuiz = {
        prompt: newQuizPrompt.prompt,
        answer: newQuizPrompt.answer,
        wrongAnswers: newQuizPrompt.wrongAnswers,
        language: profile.language,
        difficulty: profile.difficulty,
        formality: profile.formality,
        drama: profile.drama
      }
      console.log(newQuiz)
      const freshQuiz = await Quiz.create(newQuiz)
      return res.status(200).json(freshQuiz)

    }
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