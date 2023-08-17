import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { Connection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Course } from './entities/Course.entity';
import { Tag } from './entities/Tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  findOne: jest.fn(),
});

describe('CoursesService', () => {
  let service: CoursesService;
  let coursesRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Course),
          useValue: createMockRepository(),
        },
        { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    coursesRepository = module.get<MockRepository>(getRepositoryToken(Course));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('should search course by id', () => {
      it('Should return a course object', async () => {
        const courseId = '1';
        const expectCourse = {};

        coursesRepository.findOne.mockReturnValue(expectCourse);
        const course = await service.findOne(courseId);
        expect(course).toEqual(expectCourse);
      });
      it('Should return a notFoundException if there is no corse', () => {});
    });
  });
});
