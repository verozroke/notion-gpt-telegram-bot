import OpenAi from 'openai'
import config from 'config'

const GPT_MODEL = 'gpt-3.5-turbo'

const ROLES = {
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
  USER: 'user'
}

const openai = new OpenAi({
  apiKey: config.get('OPENAI_KEY'),
})

const getMessage = (m) => `
  Напиши на основании этих тезисиов, последовательную эмоциональную историю: ${m}

  Эти тезисы с описанием ключевых моментов дня.
  Необходимо в итоге получить такую историю, чтобы я запомнил этот день и смог в последствии высказывать его друзьям.
  Много текста не нужно, главное, чтобы были эмоции и правильная последовательность плюс чтение контекста.
`

export async function chatGPT(message = '') {
  const messages = [
    {
      role: ROLES.SYSTEM,
      content: 'Ты опытный копирайтер, который пишет краткие эмоциональные статьи для социальный сетей.',
    },
    {
      role: ROLES.USER,
      content: getMessage(message)
    }
  ]
  try {
    const params = {
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: GPT_MODEL,
    };
    const completion = await openai.chat.completions.create(params);

    return completion.choises[0].message
  } catch (error) {
    console.log(error);
  }
}




