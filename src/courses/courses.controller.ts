import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(@Res() response) {
    return response.status(HttpStatus.OK).send('List all courses');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `return #${id} course`;
  }

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `Update course ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Remove #${id} course`;
  }
}
