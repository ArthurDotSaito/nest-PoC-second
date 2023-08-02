import { IsString } from 'class-validator';

export class UpdateCourseDTO {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly description?: string;

  @IsString({ each: true })
  readonly tags?: string[];
}
