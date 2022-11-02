import _ from 'lodash';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Cat } from './cats.entity';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(@InjectRepository(Cat) private readonly catsRepository: Repository<Cat>, private dataSource: DataSource) {}

  async existByEmail(email: string): Promise<boolean> {
    const result = await this.catsRepository.findOneBy({ email });
    return !!result;
  }

  async createAndSave({ email, name, password }: CatRequestDto): Promise<ReadOnlyCatDto> {
    const created = this.catsRepository.create({ email, name, password });
    await this.catsRepository.insert(created);
    return _.pick(created, ['id', 'name', 'email']);
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const result = await this.catsRepository.findOneBy({ email });
    return result;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catsRepository.findOneBy({ id: parseInt(catId) });
    return _.omit(cat, ['password']);
  }
}
