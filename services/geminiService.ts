import { GoogleGenAI, Type } from "@google/genai";
import { FillBlankExercise, MCQExercise, ReadingExercise, EducationalCard } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BASE_PROMPT = "أنت معلمة لغة عربية اسمك سماح، وتصممين تمارين لطلاب الصف الرابع الابتدائي. يجب أن تكون جميع التمارين مرتبطة بعالم كرة القدم. يجب أن يكون الناتج بصيغة JSON.";

export async function generateFillInTheBlank(): Promise<FillBlankExercise> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${BASE_PROMPT} صممي تمرين 'املأ الفراغ' لقواعد اللغة العربية. يجب أن تحتوي الجملة على فراغ واحد. قدمي الجملة مع '___' مكان الفراغ. قدمي الإجابة الصحيحة، بالإضافة إلى 3 خيارات خاطئة مشابهة لتكون كلمات مفتاحية يختار الطالب منها. يجب أن يكون مجموع الخيارات 4.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          sentence: { type: Type.STRING, description: "الجملة التي تحتوي على فراغ واحد." },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "مصفوفة تحتوي على 4 خيارات نصية (الإجابة الصحيحة و3 خيارات خاطئة).",
          },
          answer: { type: Type.STRING, description: "الكلمة الصحيحة لملء الفراغ." },
        },
        required: ["sentence", "options", "answer"],
      },
    },
  });

  const json = JSON.parse(response.text);
  // Ensure there are always 4 options and the answer is one of them
  if(json.options.length !== 4 || !json.options.includes(json.answer)) {
      return generateFillInTheBlank();
  }
  return json as FillBlankExercise;
}

export async function generateMultipleChoice(): Promise<MCQExercise> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${BASE_PROMPT} صممي سؤال اختيار من متعدد لقواعد اللغة العربية. يجب أن يحتوي السؤال على 4 خيارات، واحد منها فقط صحيح.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "نص السؤال." },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "مصفوفة تحتوي على 4 خيارات نصية.",
          },
          correctAnswer: {
            type: Type.STRING,
            description: "الإجابة الصحيحة من ضمن الخيارات.",
          },
        },
        required: ["question", "options", "correctAnswer"],
      },
    },
  });

  const json = JSON.parse(response.text);
  // Ensure there are always 4 options
  if(json.options.length !== 4) {
      // If not, call recursively to try again
      return generateMultipleChoice();
  }
  return json as MCQExercise;
}

export async function generateReadingComprehension(): Promise<ReadingExercise> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${BASE_PROMPT} اكتبي فقرة قصيرة وممتعة وبسيطة عن كرة القدم (2-4 جمل). بعد الفقرة، ضعي سؤال فهم واستيعاب واحد حولها مع إجابته البسيطة والمباشرة.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          paragraph: { type: Type.STRING, description: "الفقرة النصية عن كرة القدم." },
          question: { type: Type.STRING, description: "سؤال حول الفقرة." },
          answer: { type: Type.STRING, description: "الإجابة على السؤال." },
        },
        required: ["paragraph", "question", "answer"],
      },
    },
  });

  const json = JSON.parse(response.text);
  return json as ReadingExercise;
}

export async function generateEducationalCard(): Promise<EducationalCard> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${BASE_PROMPT} أنشئي محتوى لـ 'بطاقة تعليمية'. يجب أن يكون الموضوع مفهومًا بسيطًا في قواعد اللغة العربية (مثل الاسم، الفعل، الصفة، حرف الجر)، مع شرح مبسط جدًا ومثال مرتبط بكرة القدم.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          concept: { type: Type.STRING, description: "اسم القاعدة النحوية." },
          explanation: { type: Type.STRING, description: "شرح بسيط جدًا للمفهوم." },
          example: { type: Type.STRING, description: "جملة مثال تستخدم المفهوم وتتعلق بكرة القدم." },
        },
        required: ["concept", "explanation", "example"],
      },
    },
  });

  const json = JSON.parse(response.text);
  return json as EducationalCard;
}
