import {
  ConflictException,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { DbService } from '../db/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
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

  async findOneById(id: string) {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOneById(id);

    const isOldPasswordCorrect = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isOldPasswordCorrect) {
      throw new ForbiddenException('Old password is wrong');
    }

    const salt = parseInt(this.configService.get<string>('CRYPT_SALT', '10'));
    user.password = await bcrypt.hash(updatePasswordDto.newPassword, salt);
    user.version += 1;
    user.updatedAt = Date.now();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async remove(id: string) {
    await this.findOneById(id);
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
