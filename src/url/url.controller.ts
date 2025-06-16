import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dtos/url.dto';
import { Response } from 'express';
import { GetUser } from 'src/auth/getUser.decorator';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlService.findOneAndIncrement(shortCode);

    // Redireciona o usuário para a URL original com um status 302 (redirecionamento temporário)
    return res.redirect(302, url.originalUrl);
  }

  @Post('url')
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @GetUser() user: UserEntity | null,
  ) {
    return this.urlService.create(createUrlDto.originalUrl, user?.id);
  }
}
