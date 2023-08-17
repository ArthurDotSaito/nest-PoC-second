import { CoursesService } from './courses.service';
import { faker } from '@faker-js/faker';
import { CreateCourseDTO } from './dto/create-course.dto';

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
});
