/********************************
Accepted Parameters

  language: "korean", "japanese"
  gender: "m", "f"
  formality: "formal", "casual"
  drama: "low", "med", "high"
  difficulty: "low", "med", "high"

Return type structure:

  {
    challenge: String
    answer: String
    alternateAnswers: [String] (3x)
  }

/**********************************/

async function requestNewQuiz(language, gender, formality, drama, difficulty) {

  console.log(`requested new quiz with parameters: 
  language: ${language}
  gender: ${gender}
  formality: ${formality}
  drama: ${drama}
  difficulty:${difficulty}`)

  if( gender !== "m" && gender !== "f"  ) {
    console.log("invalid gender")
    gender = "f"
  }

  if( formality !== "casual" && formality !== "formal" ) {
    console.log("invalid formality: ", formality)
    formality = "casual"
  }

  if(drama !== "low" && drama !== "med" && drama !== "high") {
    console.log("invalid drama setting: ", drama)
      drama = "low"
  }

  if(difficulty !== "low" && difficulty !== "med" && difficulty !== "high") { 
    console.log("invalid difficulty setting: ", difficulty)
    difficulty = "low"
  }


const quiz = {
  // RETURN DUMMY QUIZ
  challenge: "이 어둠 속에서 내 마음의 등대가 되어줄 사람은 과연 누구일까?",
  answer: "In this darkness, who will indeed become the lighthouse of my heart?",
  wrongAnswers: [ "In this light, who will indeed become the shadow of my heart?",
                  "Who, in this silence, will listen to the sound of my heart?",
                  "Who will navigate through this darkness with me?"],
  language: "Korean",
  gender: "F",
  formality: "Casual",
  drama: "Theatrical",
  difficulty:"Hard"
}

  return quiz
}

console.log(requestNewQuiz("korean", "f", "formal", "med", "high"))

