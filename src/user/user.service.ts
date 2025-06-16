import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  /**
   * Cria um novo usuário no banco de dados.
   * @param data - Os dados do usuário a serem criados.
   * @returns A entidade do usuário salvo.
   */
  public async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.usersRepository.create(data);

    await this.usersRepository.save(user);

    return user;
  }
}
