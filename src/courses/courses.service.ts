import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/Course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Tag } from './entities/Tag.entity';

@Injectable()
export class CoursesService {
  constructor(
    @Inject('COURSES_REPOSITORY')
    private readonly courseRepository: Repository<Course>,
    @Inject('TAGS_REPOSITORY')
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.courseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: ['tags'],
    });

    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return course;
  }
  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = this.courseRepository.create({ ...createCourseDTO, tags });
    return this.courseRepository.save(course);
  }

  async uptade(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      id: id,
      ...updateCourseDTO,
      tags,
    });
    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });
    if (!course)
      throw new NotFoundException(`There's no course with id:#${id}`);

    return this.courseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name: name } });
    if (tag) {
      return tag;
    }

    return this.tagRepository.create({ name: name });
  }
}
