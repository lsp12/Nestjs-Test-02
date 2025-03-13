import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    required: true,
    example: 'This is a task title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the task',
    required: true,
    example: 'This is a task description',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'The completion status of the task',
    required: true,
    example: false,
  })
  @IsBoolean()
  completed: boolean;
}
