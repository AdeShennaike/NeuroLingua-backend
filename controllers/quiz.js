import { requestQuiz } from '../services/gptapi.js'
import { arabicQuizBufferHard,arabicQuizBufferEasy, chineseQuizBuffer, spanishQuizBuffer, koreanQuizBuffer } from '../services/gptapi.js'

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
      difficulty: profile.difficulty
    })

    if (quiz) {
      return res.status(200).json(quiz)
    } else {
      const newQuiz = {
        prompt: "No more quizzes :(",
        answer: "...",
        wrongAnswers: ["...","...","..."]
      }
      return res.status(200).json(newQuiz)
    }
  } catch (error) {
    console.error('Error in getQuiz:', error)
    return res.status(500).json({ message: 'Internal server error in getQuiz' })
  }
}

async function answerQuiz(req, res) {
  try {
    console.log("answerQuiz - User: ", req.user)
    console.log("answerQuiz - id: ", req.params.id)

    if (!req.user) {
      throw "missing user id" 
    }

    if (!req.params || !req.params.id) {
      throw "missing quiz id params"
    }

    const profile = Profile.findOne({_id: req.user.profile})
    const quiz = Quiz.find({_id: req.params.id})

    if (!profile) {
      throw `no profile found for ${req.user}`
    }

    if (!quiz) {
      throw `no quiz found for ${req.params.id}`
    }

    profile.quizzes.push(quiz._id)
    profile.save()

    return getQuiz()
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

async function seedQuizzes() {

  for (const quiz of arabicQuizBufferHard) {
    const newQuiz = {
      prompt: quiz.prompt,
      answer: quiz.answer,
      wrongAnswers: quiz.alternate,
      language: "arabic",
      difficulty: "hard",
      formality: "low",
      drama: "low"
    }
    console.log(newQuiz)
    const freshQuiz = await Quiz.create(newQuiz)
  }

  for (const quiz of arabicQuizBufferEasy) {
    const newQuiz = {
      prompt: quiz.prompt,
      answer: quiz.answer,
      wrongAnswers: quiz.alternate,
      language: "arabic",
      difficulty: "easy",
      formality: "low",
      drama: "low"
    }
    const freshQuiz = await Quiz.create(newQuiz)
  }

  for (const quiz of chineseQuizBuffer) {
    const newQuiz = {
      prompt: quiz.prompt,
      answer: quiz.answer,
      wrongAnswers: quiz.alternate,
      language: "chinese",
      difficulty: "medium",
      formality: "low",
      drama: "low"
    }
    const freshQuiz = await Quiz.create(newQuiz)
  }

  for (const quiz of spanishQuizBuffer) {
    const newQuiz = {
      prompt: quiz.prompt,
      answer: quiz.answer,
      wrongAnswers: quiz.alternate,
      language: "spanish",
      difficulty: "medium",
      formality: "low",
      drama: "low"
    }
    const freshQuiz = await Quiz.create(newQuiz)
  }

  for (const quiz of koreanQuizBuffer) {
    const newQuiz = {
      prompt: quiz.prompt,
      answer: quiz.answer,
      wrongAnswers: quiz.alternate,
      language: "korean",
      difficulty: "hard",
      formality: "low",
      drama: "low"
    }
    const freshQuiz = await Quiz.create(newQuiz)
  }
}

export {
  getQuizHistory,
  getQuizDetails,
  getQuiz,
  answerQuiz,
  removeQuizFromHistory,
  provideFeedback,
  seedQuizzes
}