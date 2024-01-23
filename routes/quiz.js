import express from "express"
const router = express.Router()
import { getQuiz, getQuizHistory, getQuizDetails, 
  provideFeedback, answerQuiz, removeQuizFromHistory } from "../controllers/quiz.js"

router.get("/quiz", getQuiz)

router.get("details/:id", getQuizDetails)

router.get("/history", getQuizHistory)

router.post("/feedback/:id", provideFeedback)

router.put("/answer/:id", answerQuiz)

router.delete("delete/:id", removeQuizFromHistory)


export { router }