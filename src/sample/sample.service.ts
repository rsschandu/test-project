import { Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sample } from './entities/sample.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SampleService {
  constructor(
    @InjectRepository(Sample)
    private readonly sampleRepository: Repository<Sample>,
  ) {}
  create(createSampleDto: CreateSampleDto) {
    return this.sampleRepository.save(createSampleDto);
  }

  findAll() {
    return this.sampleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`;
  }

  update(id: string, updateSampleDto: UpdateSampleDto) {
    return this.sampleRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.sampleRepository.delete(id);
  }
}
