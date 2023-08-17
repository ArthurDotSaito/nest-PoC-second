import { CoursesService } from './courses.service';
import { faker } from '@faker-js/faker';
import { CreateCourseDTO } from './dto/create-course.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService', () => {
  let service: CoursesService;
  let id: string;
  let date: Date;

  beforeEach(async () => {
    service = new CoursesService();
    id = faker.string.uuid();
    date = new Date();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a course', async () => {
    const expectOutputTags = [{ id, name: 'nestjs', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        tags: expectOutputTags,
        createdAt: date,
      },
    ];
    const mockCourseRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const createCourseDTO: CreateCourseDTO = {
      name: 'Test',
      description: 'Test Description',
      tags: ['nestJS'],
    };

    const newCourse = await service.create(createCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(newCourse).toStrictEqual(expectOutputCourse);
  });

  it('Should list all courses', async () => {
    const expectOutputTags = [{ id, name: 'nestjs', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        tags: expectOutputTags,
        createdAt: date,
      },
    ];
    const mockCourseRepository = {
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const courses = await service.findAll();
    expect(mockCourseRepository.find).toHaveBeenCalled();
    expect(courses).toStrictEqual(expectOutputCourse);
  });

  it('Should get one course findOne', async () => {
    const expectOutputTags = [{ id, name: 'nestjs', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        tags: expectOutputTags,
        createdAt: date,
      },
    ];
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    const course = await service.findOne(id);
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(course).toStrictEqual(expectOutputCourse);
  });

  it('Should return a NotFound Error when there is no course', async () => {
    const expectOutputTags = [{ id, name: 'nestjs', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        tags: expectOutputTags,
        createdAt: date,
      },
    ];
    const mockCourseRepository = {
      findOne: jest.fn().mockReturnValue(Promise.resolve(undefined)),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    try {
      await service.findOne(id);
      expect(mockCourseRepository.findOne).toHaveBeenCalled();
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });

  it('Should create a course', async () => {
    const expectOutputTags = [{ id, name: 'nestjs', createdAt: date }];
    const expectOutputCourse = [
      {
        id,
        name: 'Test',
        description: 'Test description',
        tags: expectOutputTags,
        createdAt: date,
      },
    ];
    const mockCourseRepository = {
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourse)),
    };
    const mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };

    //@ts-expect-error defined part of methods
    service['courseRepository'] = mockCourseRepository;

    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      name: 'Test',
      description: 'Test Description',
      tags: ['nestJS'],
    };

    const course = await service.uptade(id, updateCourseDTO);
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(course).toStrictEqual(expectOutputCourse);
  });
});
