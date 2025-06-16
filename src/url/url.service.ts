import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  private readonly baseUrl = 'http://localhost:3000/';

  /**
   * Cria uma nova URL encurtada
   */
  async create(originalUrl: string, userId?: number): Promise<string> {
    if (!originalUrl) {
      throw new NotFoundException('URL não pode ser vazia.');
    }

    const existingUrl = await this.urlRepository.findOneBy({
      originalUrl,
      userId,
    });

    if (existingUrl) {
      return `${this.baseUrl}${existingUrl.shortCode}`;
    }

    let shortCode = this.generateShortCode();

    let existingShortCode = await this.urlRepository.findOneBy({ shortCode });

    while (existingShortCode) {
      shortCode = this.generateShortCode();
      existingShortCode = await this.urlRepository.findOneBy({ shortCode });
    }

    const newUrl = this.urlRepository.create({
      originalUrl,
      shortCode,
      userId,
    });

    await this.urlRepository.save(newUrl);

    return `${this.baseUrl}${shortCode}`;
  }

  /**
   * Gera um código alfanumérico aleatório de 6 caracteres
   */
  private generateShortCode(): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Encontra uma URL pelo seu código curto e incrementa o contador de cliques
   */
  async findOneAndIncrement(shortCode: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findOneBy({ shortCode });

    if (!url) {
      throw new NotFoundException('URL não encontrada.');
    }

    await this.urlRepository.increment({ shortCode }, 'clicks', 1);

    return url;
  }
}
