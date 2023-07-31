import { Injectable } from '@nestjs/common';
import { Course } from './entities/Course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJS curious stuff',
      description: 'NestJs stuff',
      tags: ['nestjs', 'nodejs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    return this.courses.find((course: Course) => course.id === parseInt(id));
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
  }

  uptade(id: string, updateCourseDTO: any) {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === parseInt(id),
    );

    this.courses[courseIndex] = updateCourseDTO;
  }

  remove(id: string) {
    const courseIndex = this.courses.findIndex(
      (course: Course) => course.id === parseInt(id),
    );

    if (courseIndex >= 0) this.courses.splice(courseIndex, 1);
  }
}
