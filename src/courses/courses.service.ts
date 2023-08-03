import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/Course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: parseInt(id) },
    });

    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return course;
  }

  create(createCourseDTO: CreateCourseDTO) {
    const course = this.courseRepository.create(createCourseDTO);
    return this.courseRepository.save(course);
  }

  async uptade(id: string, updateCourseDTO: UpdateCourseDTO) {
    const course = await this.courseRepository.preload({
      id: parseInt(id),
      ...updateCourseDTO,
    });
    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return this.courseRepository.remove(course);
  }
}
