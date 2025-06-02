import { ConflictException, Injectable } from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    private db: DbService,
    private configService: ConfigService,
  ) {}

  async findOneByLogin(login: string) {
    return this.db.users.find((user) => user.login === login);
  }

  async findAll() {
    return this.db.users.map((user) => {
      const { ...rest } = user;
      return rest;
    });
  }

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.findOneByLogin(createUserDto.login);
    if (userExists) {
      throw new ConflictException('User with this login already exists');
    }
    const salt = parseInt(this.configService.get<string>('CRYPT_SALT', '10'));
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const newUser = {
      id: uuidv4(),
      login: createUserDto.login,
      password: hashedPassword,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.db.users.push(newUser);

    const { ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
