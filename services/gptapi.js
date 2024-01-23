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
  feminine: "feminine",
  masculine: "masculine"
}

const DRAMA_LEVEL = {
  high: "high",
  medium: "med",
  low: "low"
}

const CHALLENGE_LEVEL = {
  high: "high",
  medium: "med",
  low: "low"
}

const INFORMALITY_LEVEL = {
  casual: "casual",
  formal: "formal"
}

const PROMPT_LANGUAGE = {
  chinese: "chinese",
  english: "english",
  spanish: "spanish",
  arabic: "arabic",
  Bengali: "bengali",
  hindi: "hindi",
  russian: "russian",
  portuguese: "portuguese",
  japanese: "japanese",
  german: "german",
  javanese: "javanese",
  korean: "korean",
  french: "french",
  turkish: "turkish",
  vietnamese: "vietnamese",
  telugu: "telugu",
  marathi: "marathi",
  tamil: "tamil",
  italian: "italian",
  urdu: "urdu",
  gujarati: "gujarati",
  polish: "polish",
  ukrainian: "ukrainian",
  persian: "persian",
  malayalam: "malayalam",
  kannada: "kannada",
  oriya: "oriya",
  sunda: "sunda",
  panjabi: "panjabi",
  romanian: "romanian",
  bhojpuri: "bhojpuri",
  azerbaijani: "azerbaijani",
  maithili: "maithili",
  hausa: "hausa",
  burmese: "burmese",
  croatian: "croatian",
  awadhi: "awadhi",
  thai: "thai",
  dutch: "dutch",
  yoruba: "yoruba",
  sindhi: "sindhi"
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

async function requestQuiz(language, tone, informalityLevel, dramaLevel, challengeLevel) {

  const sampleResponse = {
    "id": "chatcmpl-8kH8yL6LTbQvqmWiWpKVmpxVXbqz2",
    "object": "chat.completion",
    "created": 1706039680,
    "model": "gpt-4-0613",
    "choices": [
      {
        "index": 0,
        "message": {
          "role": "assistant",
          "content": "{\n\"question\": \"What is the English translation of the Spanish phrase 'Buenos días'?\",\n\"answer\": \"Good morning\",\n\"alternate\": [\"Good night\", \"Good evening\", \"Goodbye\"]\n}"
        },
        "logprobs": null,
        "finish_reason": "stop"
      }
    ],
    "usage": {
      "prompt_tokens": 63,
      "completion_tokens": 44,
      "total_tokens": 107
    },
    "system_fingerprint": null
  }

  const content = "Please generate a multiple choice language quiz question. Provide a sentence in Spanish, and a translation in the user's native language (English), then three incorrect alternative answers. Please respond with a JSON object with the format {question: String, answer: String, alternate: [String, String, String]} without additional commentary"

  try {

    // const gpt_response = await fetchOpenAIChatCompletion(apiKey, content)

    const contentString = sampleResponse.choices[0].message.content

    const contentObj = await JSON.parse(contentString)

    const parsedResponse = {
      question: contentObj.question,
      answer: contentObj.answer,
      alternateAnswers: contentObj.alternate,
      language: language,
      tone: tone,
      informalityLevel: informalityLevel,
      dramaLevel: dramaLevel,
      challengeLevel: challengeLevel
    }

    return parsedResponse

  } catch (error) {
    console.log(error)
    console.log("ERROR - GPT RESPONSE: ", sampleResponse.choices)
    return error
  }
}

async function fetchOpenAIChatCompletion(apiKey, content) {
  const requestBody = {
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: content
      }
    ],
    temperature: 0.7
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

// const test = await requestQuiz("spanish", "feminine", "casual", "high", "low")
// console.log(test)

export {
  requestSampleQuiz,
  requestQuiz
} 
