import express from "express"
const router = express.Router()
import * as quizController from "../controllers/quiz.js"

router.get("/quiz", quizController.getQuiz)

router.get("/:id", quizController.getQuizDetails)

router.get("/history", quizController.getQuizHistory)

router.post("/:id/feedback", quizController.provideFeedback)

router.put("/:id/answer", quizController.answerQuiz)

router.delete("/:id/delete", quizController.removeQuizFromHistory)


export { router }