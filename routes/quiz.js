import express from "express"
const router = express.Router()
import { getQuiz, getQuizHistory, getQuizDetails, 
  provideFeedback, answerQuiz, removeQuizFromHistory } from "../controllers/quiz.js"
import { decodeUserFromToken, checkAuth } from "../middleware/auth.js"

router.get("/quiz", checkAuth, decodeUserFromToken, getQuiz)

router.get("details/:id", checkAuth, decodeUserFromToken, getQuizDetails)

router.get("/history", checkAuth, decodeUserFromToken, getQuizHistory)

router.post("/feedback/:id", checkAuth, decodeUserFromToken, provideFeedback)

router.put("/answer/:id", checkAuth, decodeUserFromToken, answerQuiz)

router.delete("delete/:id", checkAuth, decodeUserFromToken, removeQuizFromHistory)


export { router }