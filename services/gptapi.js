import 'dotenv/config.js'

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

function requestSampleQuiz() {

  return {
    prompt: "이 어둠 속에서 내 마음의 등대가 되어줄 사람은 과연 누구일까?",
    answer: "In this darkness, who will indeed become the lighthouse of my heart?",
    wronganswers: [
      "In this light, who will indeed become the shadow of my heart?",
      "Who, in this silence, will listen to the sound of my heart?",
      "Who will navigate through this darkness with me?"
    ]
  }
}

async function requestQuiz(localization, language, tone, informalityLevel, dramaLevel, challengeLevel) {

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

  const content = `Please generate a multiple choice language quiz question. Provide a sentence in ${language}, and a translation in the user's native language (${localization}), then three incorrect alternative answers. Make the tone of sentence ${tone}, make the informality ${informalityLevel}, and the challenge level ${challengeLevel} difficulty. Please respond with a JSON object with the format {question: String, answer: String, alternate: [String, String, String]} without additional commentary.`

  try {

    const gptResponse = await fetchOpenAIChatCompletion(process.env.GPT_KEY, content)

    const contentString = gptResponse.choices[0].message.content

    const contentObj = await JSON.parse(contentString)

    const parsedResponse = {
      prompt: contentObj.question,
      answer: contentObj.answer,
      wrongAnswers: contentObj.alternate,
    }

    return parsedResponse

  } catch (error) {
    console.log(error)
    console.log("ERROR - GPT RESPONSE: ", sampleResponse.choices)
    return {prompt: error.message,
            answer: "error",
            wronganswers: [".",".","."]}
  }
}

async function fetchOpenAIChatCompletion(apiKey, content) {
  const requestBody = {
    model: "gpt-3.5-turbo", // or "gpt-4"
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

// const test = await requestQuiz("english", "spanish", "feminine", "casual", "high", "low")
// console.log(test)


const spanishQuizBuffer = [
  {
    "prompt": "¿Cómo estás hoy?",
    "answer": "How are you today?",
    "alternate": ["What are you doing today?", "Where are you going today?", "What is your name?"]
  },
  {
    "prompt": "¿Qué hora es?",
    "answer": "What time is it?",
    "alternate": ["What is your name?", "Where are you?", "How old are you?"]
  },
  {
    "prompt": "¿Dónde está la biblioteca?",
    "answer": "Where is the library?",
    "alternate": ["Where is the bathroom?", "Where is the bus station?", "Where can I find a taxi?"]
  },
  {
    "prompt": "¿Puedo tener un vaso de agua, por favor?",
    "answer": "Can I have a glass of water, please?",
    "alternate": ["Can I have a cup of tea, please?", "Can I use your phone, please?", "Can you help me, please?"]
  },
  {
    "prompt": "¿Cuál es tu color favorito?",
    "answer": "What is your favorite color?",
    "alternate": ["What is your favorite food?", "What is your name?", "How old are you?"]
  },
  {
    "prompt": "¿Podrías ayudarme?",
    "answer": "Could you help me?",
    "alternate": ["Do you understand me?", "Can you call me?", "Would you like something to drink?"]
  },
  {
    "prompt": "Me gusta mucho leer libros.",
    "answer": "I really like reading books.",
    "alternate": ["I enjoy playing sports.", "I love to cook meals.", "I often go for a walk."]
  },
  {
    "prompt": "Vamos a la playa este fin de semana.",
    "answer": "We are going to the beach this weekend.",
    "alternate": ["We are going to the party this weekend.", "We are going to the mountain this weekend.", "We are watching a movie this weekend."]
  },
  {
    "prompt": "¿Cuántos años tienes?",
    "answer": "How old are you?",
    "alternate": ["How many siblings do you have?", "How tall are you?", "How many books do you have?"]
  },
  {
    "prompt": "No entiendo la pregunta.",
    "answer": "I do not understand the question.",
    "alternate": ["I do not like the question.", "I do not have a question.", "I have not heard the question."]
  },
  {
    "prompt": "Mi cumpleaños es en julio.",
    "answer": "My birthday is in July.",
    "alternate": ["My birthday party is in July.", "My friend's birthday is in July.", "My anniversary is in July."]
  },
  {
    "prompt": "¿Puedes hablar más despacio, por favor?",
    "answer": "Can you speak more slowly, please?",
    "alternate": ["Can you speak louder, please?", "Can you write it down, please?", "Can you repeat that, please?"]
  }
]

const koreanQuizBuffer = [
    {
      "prompt": "이 문제의 해결책을 찾는 것이 쉽지 않을 것입니다.",
      "answer": "Finding a solution to this problem will not be easy.",
      "alternate": ["This problem is easy to solve.", "I will not find a solution to this problem.", "This problem is not important."]
    },
    {
      "prompt": "그녀는 그 소식을 듣고 매우 놀랐습니다.",
      "answer": "She was very surprised to hear the news.",
      "alternate": ["She was not interested in the news.", "She already knew the news.", "She was the one who spread the news."]
    },
    {
      "prompt": "이번 프로젝트는 우리 모두에게 큰 도전이 될 것입니다.",
      "answer": "This project will be a big challenge for all of us.",
      "alternate": ["This project will be easy for all of us.", "We are not ready for this project.", "This project will be completed quickly."]
    },
    {
      "prompt": "우리는 이 문제에 대해 다양한 관점에서 접근해야 합니다.",
      "answer": "We need to approach this issue from various perspectives.",
      "alternate": ["We have only one way to solve this problem.", "This problem is not worth our attention.", "We should avoid this problem."]
    },
    {
      "prompt": "그의 의견은 회의에서 많은 관심을 받았습니다.",
      "answer": "His opinion received a lot of attention at the meeting.",
      "alternate": ["His opinion was ignored at the meeting.", "He didn't give his opinion at the meeting.", "He was not present at the meeting."]
    },
    {
      "prompt": "그녀는 복잡한 상황을 잘 처리하고 있습니다.",
      "answer": "She is handling the complicated situation well.",
      "alternate": ["She is avoiding the complicated situation.", "She is not interested in handling the situation.", "She is making the situation more complicated."]
    },
    {
      "prompt": "이 기술은 우리 산업에 혁신을 가져올 것입니다.",
      "answer": "This technology will bring innovation to our industry.",
      "alternate": ["This technology is outdated for our industry.", "Our industry does not need this technology.", "This technology will be detrimental to our industry."]
    },
    {
      "prompt": "이 변화는 장기적으로 긍정적인 영향을 미칠 것입니다.",
      "answer": "This change will have a positive impact in the long run.",
      "alternate": ["This change will have immediate effects.", "This change is irrelevant to our goals.", "This change will negatively impact our plans."]
    },
    {
      "prompt": "그는 그 문제에 대한 깊은 통찰력을 보여주었습니다.",
      "answer": "He showed deep insight into the problem.",
      "alternate": ["He had no opinion about the problem.", "He misunderstood the problem completely.", "He ignored the problem."]
    },
    {
      "prompt": "우리 팀은 이번 달에 성과를 크게 향상시켰습니다.",
      "answer": "Our team greatly improved performance this month.",
      "alternate": ["Our team's performance declined this month.", "Our team did not change their performance.", "Our team's performance was the worst this month."]
    }
]

const arabicQuizBufferHard = [
    {
      "prompt": "هل يمكنك التحدث عن تجربتك في تعلم لغات جديدة؟",
      "answer": "Can you talk about your experience in learning new languages?",
      "alternate": ["Can you write about your experience in learning new languages?", "What are your thoughts on learning new languages?", "Do you like learning new languages?"]
    },
    {
      "prompt": "يجب أن نفكر في حلول بديلة لهذه المشكلة.",
      "answer": "We must think of alternative solutions to this problem.",
      "alternate": ["We must avoid this problem completely.", "We need to focus on this single solution.", "We should ignore alternative solutions."]
    },
    {
      "prompt": "تحدث الخبير عن أهمية الابتكار في عالم الأعمال.",
      "answer": "The expert talked about the importance of innovation in the business world.",
      "alternate": ["The expert discussed the problems of innovation in the business world.", "The expert ignored the topic of innovation in business.", "The expert focused on the risks of innovation in business."]
    },
    {
      "prompt": "يعتقد الكثيرون أن التعليم المستمر هو مفتاح النجاح.",
      "answer": "Many believe that continuous education is the key to success.",
      "alternate": ["Many think that avoiding education is the way to succeed.", "Few people believe in the value of continuous education.", "Continuous education is considered unnecessary by most people."]
    },
    {
      "prompt": "التغييرات الأخيرة في السياسة أدت إلى نتائج إيجابية.",
      "answer": "The recent changes in policy have led to positive results.",
      "alternate": ["The recent policy changes have had no impact.", "The policy changes have been universally negative.", "No recent changes have been made to the policy."]
    },
    {
      "prompt": "كان لابد من مراجعة الخطة لضمان الفعالية.",
      "answer": "It was necessary to revise the plan to ensure effectiveness.",
      "alternate": ["The plan was effective without any revisions.", "The plan was abandoned instead of being revised.", "Revising the plan did not contribute to its effectiveness."]
    },
    {
      "prompt": "تتطلب هذه المهمة تعاونًا وثيقًا بين جميع الأقسام.",
      "answer": "This task requires close cooperation between all departments.",
      "alternate": ["This task can be completed by one department.", "The departments are competing to complete this task.", "No cooperation is needed to complete this task."]
    },
    {
      "prompt": "أظهرت النتائج أن هناك حاجة إلى مزيد من البحث.",
      "answer": "The results showed that more research is needed.",
      "alternate": ["The results indicated that no further research is necessary.", "The research concluded that the results are final.", "The results were inconclusive and no further action will be taken."]
    },
    {
      "prompt": "يمكن للابتكار أن يحدث فرقًا كبيرًا في نجاح الشركات.",
      "answer": "Innovation can make a significant difference in the success of companies.",
      "alternate": ["Innovation has little impact on a company's success.", "Companies are discouraged from pursuing innovation.", "Innovation leads to more problems than solutions in companies."]
    },
    {
      "prompt": "ينبغي علينا التركيز على تطوير مهاراتنا القيادية.",
      "answer": "We should focus on developing our leadership skills.",
      "alternate": ["Our leadership skills are not important to develop.", "We should focus only on technical skills.", "Developing leadership skills is less valuable than other skills."]
    }  
]

const chineseQuizBuffer = [
  {
    "prompt": "你明天有空吗？",
    "answer": "Are you free tomorrow?",
    "alternate": ["Do you like it here?", "What will you do tomorrow?", "Do you work tomorrow?"]
  },
  {
    "prompt": "这家餐厅的食物很好吃。",
    "answer": "The food at this restaurant is delicious.",
    "alternate": ["This restaurant is very expensive.", "The food at this restaurant is not good.", "This restaurant is far from here."]
  },
  {
    "prompt": "我可以用信用卡支付吗？",
    "answer": "Can I pay with a credit card?",
    "alternate": ["Can I pay in cash?", "Do you accept checks here?", "Do you have a credit card?"]
  },
  {
    "prompt": "她比我大三岁。",
    "answer": "She is three years older than me.",
    "alternate": ["She is three years younger than me.", "She is as old as I am.", "She is my sister."]
  },
  {
    "prompt": "他们正在讨论新的项目。",
    "answer": "They are discussing the new project.",
    "alternate": ["They are completing the project.", "They are starting a new project.", "They are not interested in the project."]
  },
  {
    "prompt": "请把窗户打开。",
    "answer": "Please open the window.",
    "alternate": ["Please close the door.", "Please clean the window.", "The window is broken."]
  },
  {
    "prompt": "这本书很有趣。",
    "answer": "This book is very interesting.",
    "alternate": ["This book is very boring.", "This book is very long.", "I don't like this book."]
  },
  {
    "prompt": "我们应该尊重每个人的意见。",
    "answer": "We should respect everyone's opinions.",
    "alternate": ["We should ignore other people's opinions.", "We all have the same opinion.", "People's opinions don't matter."]
  },
  {
    "prompt": "我需要一些时间来考虑这个问题。",
    "answer": "I need some time to think about this issue.",
    "alternate": ["I don't want to think about this issue.", "I have already decided on this issue.", "I don't have any issues."]
  },
  {
    "prompt": "这个问题很难回答。",
    "answer": "This question is hard to answer.",
    "alternate": ["This question is easy to answer.", "I don't want to answer this question.", "I know the answer to this question."]
  }
]

const spanishQuizBufferEasy = [
  {
    "prompt": "¿Cómo te llamas?",
    "answer": "What is your name?",
    "alternate": ["How old are you?", "Where are you from?", "How are you?"]
  },
  {
    "prompt": "¿Dónde vives?",
    "answer": "Where do you live?",
    "alternate": ["What is your job?", "How old are you?", "Do you speak Spanish?"]
  },
  {
    "prompt": "¿Qué hora es?",
    "answer": "What time is it?",
    "alternate": ["What day is it today?", "How is the weather?", "Are you ready?"]
  },
  {
    "prompt": "¿Cuántos años tienes?",
    "answer": "How old are you?",
    "alternate": ["What is your name?", "Where do you live?", "Do you have any siblings?"]
  },
  {
    "prompt": "¿Cuál es tu color favorito?",
    "answer": "What is your favorite color?",
    "alternate": ["What is your favorite food?", "Where are you going?", "Who is your best friend?"]
  },
  {
    "prompt": "¿Tienes hermanos?",
    "answer": "Do you have siblings?",
    "alternate": ["Do you have children?", "Do you have a pet?", "Do you have a car?"]
  },
  {
    "prompt": "¿Qué te gusta hacer en tu tiempo libre?",
    "answer": "What do you like to do in your free time?",
    "alternate": ["What is your job?", "Where do you want to travel?", "What did you study?"]
  },
  {
    "prompt": "¿Cuál es tu comida favorita?",
    "answer": "What is your favorite food?",
    "alternate": ["What is your favorite drink?", "What is your favorite movie?", "What is your favorite sport?"]
  },
  {
    "prompt": "¿Cómo está el clima?",
    "answer": "How is the weather?",
    "alternate": ["How are you feeling?", "Is it late?", "Are you busy?"]
  },
  {
    "prompt": "¿Quieres café o té?",
    "answer": "Do you want coffee or tea?",
    "alternate": ["Do you prefer cats or dogs?", "Do you have milk or sugar?", "Are you hungry or thirsty?"]
  }
]


const arabicQuizBufferEasy = [
  {
    "prompt": "كيف حالك؟",
    "answer": "How are you?",
    "alternate": ["What is your name?", "Where are you from?", "What time is it?"]
  },
  {
    "prompt": "ما اسمك؟",
    "answer": "What is your name?",
    "alternate": ["How old are you?", "Where do you live?", "What do you do?"]
  },
  {
    "prompt": "أين الحمام؟",
    "answer": "Where is the bathroom?",
    "alternate": ["Where is the kitchen?", "Where is the market?", "Where is the exit?"]
  },
  {
    "prompt": "كم الساعة؟",
    "answer": "What time is it?",
    "alternate": ["What day is it?", "How long will it take?", "When will you arrive?"]
  },
  {
    "prompt": "أريد كوباً من الماء.",
    "answer": "I want a glass of water.",
    "alternate": ["I want a cup of tea.", "I need a bottle of water.", "Can I have some coffee?"]
  },
  {
    "prompt": "شكراً لك.",
    "answer": "Thank you.",
    "alternate": ["Please.", "You're welcome.", "Excuse me."]
  },
  {
    "prompt": "أنا أحب القراءة.",
    "answer": "I like reading.",
    "alternate": ["I like swimming.", "I like to cook.", "I play football."]
  },
  {
    "prompt": "الطقس حار اليوم.",
    "answer": "The weather is hot today.",
    "alternate": ["The weather is cold today.", "It is raining today.", "It is a windy day."]
  },
  {
    "prompt": "هذا الكتاب مثير للاهتمام.",
    "answer": "This book is interesting.",
    "alternate": ["This book is boring.", "This movie is interesting.", "This song is interesting."]
  },
  {
    "prompt": "أين يمكنني شراء تذاكر؟",
    "answer": "Where can I buy tickets?",
    "alternate": ["How much are the tickets?", "Do you have tickets?", "When does the show start?"]
  }
]



export {
  requestSampleQuiz,
  requestQuiz,
  koreanQuizBuffer,
  arabicQuizBufferHard,
  arabicQuizBufferEasy,
  spanishQuizBuffer,
  spanishQuizBufferEasy,
  chineseQuizBuffer
}
