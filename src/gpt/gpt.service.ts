import { Injectable } from '@nestjs/common';
import {
  ProConsDiscusserStreamUseCase,
  ProConsDiscusserUseCase,
  OrthographyCheckUseCase,
} from './use-cases';
import { OrthographyDto } from './dtos';
import OpenAI from 'openai';
import { ProConsDiscusserDto } from './dtos/proConsDiscusser.dto';

@Injectable()
export class GptService {
  private openAi = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY,
  });

  async ortographyCheck(orthographyDto: OrthographyDto) {
    return await OrthographyCheckUseCase(this.openAi, {
      prompt: orthographyDto.prompt,
    });
  }
  async proConsDiscusser(proconsdiscusserDto: ProConsDiscusserDto) {
    return await ProConsDiscusserUseCase(this.openAi, {
      prompt: proconsdiscusserDto.prompt,
    });
  }
  async proConsDiscusserStream(proconsdiscusserDto: ProConsDiscusserDto) {
    return await ProConsDiscusserStreamUseCase(this.openAi, {
      prompt: proconsdiscusserDto.prompt,
    });
  }
}
