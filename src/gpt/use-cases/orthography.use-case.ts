import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const OrthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `Te seran proveidos textos en español  mcon posibles errores de escritura,
        Debes de responder en formato JSON,
        Tu debes es corregirlos, retornar soluciones y sugerir mejoras para los textos,
        tambien dar un porcentaje de acierto del usuario,
        
        Si no hay errores, retorna un mensaje de felicitaciones para el usuario.
        
        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error => solucion]
          message: string, // Usa emojis acorde al puntaje para felicitar al usuario.
        }
        `,
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-3.5-turbo',
  });
  const jsonRes = JSON.parse(completion.choices[0].message.content);
  return jsonRes;
};
