/************
  Returns:
 *********************************************

  {
    question: String,
    answer: String,
    wrongAnswers: [String, String, String],
    language: String,  ("korean", "spanish")
    gender: String,    ("f", "m")
    formality: String, ("formal", "casual")
    drama: String,     ("low", "med", "high")
    difficulty: String ("low", "med", "high")
  }

/**********************************/

const PROMPT_TONE = {
  feminine:"feminine",
  masculine:"masculine"
}

const DRAMA_LEVEL = {
  high:"high",
  medium:"med",
  low:"low"
}

const CHALLENGE_LEVEL = {
  high:"high",
  medium:"med",
  low:"low"
}

const INFORMALITY_LEVEL = {
  casual:"casual",
  formal:"formal"
}

const PROMPT_LANGUAGE = {
  chinese:"chinese",
  english:"english",
  spanish:"spanish",
  arabic:"arabic",
  Bengali:"bengali",
  hindi:"hindi",
  russian:"russian",
  portuguese:"portuguese",
  japanese:"japanese",
  german:"german",
  javanese:"javanese",
  korean:"korean",
  french:"french",
  turkish:"turkish",
  vietnamese:"vietnamese",
  telugu:"telugu",
  marathi:"marathi",
  tamil:"tamil",
  italian:"italian",
  urdu:"urdu",
  gujarati:"gujarati",
  polish:"polish",
  ukrainian:"ukrainian",
  persian:"persian",
  malayalam:"malayalam",
  kannada:"kannada",
  oriya:"oriya",
  sunda:"sunda",
  panjabi:"panjabi",
  romanian:"romanian",
  bhojpuri:"bhojpuri",
  azerbaijani:"azerbaijani",
  maithili:"maithili",
  hausa:"hausa",
  burmese:"burmese",
  croatian:"croatian",
  awadhi:"awadhi",
  thai:"thai",
  dutch:"dutch",
  yoruba:"yoruba",
  sindhi:"sindhi"
}

// async function requestSampleQuiz(language, tone, informalityLevel, dramaLevel, challengeLevel) {
function requestSampleQuiz() {

  return {
    prompt: "이 어둠 속에서 내 마음의 등대가 되어줄 사람은 과연 누구일까?",
    correctTranslation: "In this darkness, who will indeed become the lighthouse of my heart?",
    alternativeTranslations: [ 
        "In this light, who will indeed become the shadow of my heart?",
        "Who, in this silence, will listen to the sound of my heart?",
        "Who will navigate through this darkness with me?"
    ],
    promptLanguage: "korean",
    promptTone: "feminine",
    informalityLevel: "casual",
    dramaLevel: "medium",
    challengeLevel: "high"
  } 
}

export default requestSampleQuiz
