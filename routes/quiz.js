import express from "express"
const router = express.Router()
import { getQuiz, getQuizHistory, getQuizDetails, 
  provideFeedback, answerQuiz, removeQuizFromHistory } from "../controllers/quiz.js"
import { decodeUserFromToken } from "../middleware/auth.js"

router.get("/quiz", decodeUserFromToken, getQuiz)

router.get("details/:id", decodeUserFromToken, getQuizDetails)

router.get("/history", decodeUserFromToken, getQuizHistory)

router.post("/feedback/:id", decodeUserFromToken, provideFeedback)

router.put("/answer/:id", decodeUserFromToken, answerQuiz)

router.delete("delete/:id", decodeUserFromToken, removeQuizFromHistory)


export { router }