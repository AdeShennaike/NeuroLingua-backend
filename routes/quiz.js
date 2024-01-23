import express  from "express"
const router = express.Router()
import quizController from "../controllers"

router.get("/quiz",)

router.get("/:id",quizController.getQuizDetails())

router.get("/history", quizController.getQuizHistory())

router.post("/:id/feedback",quizController.provideFeedback())

router.put("/:id/answer",quizController.answerQuiz())

router.delete("/:id/delete",quizController.removeQuizFromHistory())



export default router