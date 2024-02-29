import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const ProConsDiscusserStreamUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    messages: [
      {
        role: 'system',
        content: `Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras,
        la respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
  });
  // const data = completion.choices[0].message.content;
  // return data;
  // const jsonRes = JSON.parse(completion.choices[0].message.content);
  // return jsonRes;
};
