import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto, ProConsDiscusserDto } from './dtos';
import { Response } from 'express';
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(@Body() orthographyDto: OrthographyDto) {
    return this.gptService.ortographyCheck(orthographyDto);
  }
  @Post('pro-cons-discusser')
  proConsDiscusser(@Body() proconsdiscusserDto: ProConsDiscusserDto) {
    return this.gptService.proConsDiscusser(proconsdiscusserDto);
  }
  @Post('pro-cons-discusser-stream')
  async proConsDiscusserStream(
    @Body() proconsdiscusserDto: ProConsDiscusserDto,
    @Res() res: Response,
  ) {
    const stream =
      await this.gptService.proConsDiscusserStream(proconsdiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status(HttpStatus.OK);

    for await (const chunk of stream) {
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }
}
