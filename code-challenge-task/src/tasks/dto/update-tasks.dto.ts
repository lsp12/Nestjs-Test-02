import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'The title of the task',
    required: false,
    example: 'This is a task title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'The description of the task',
    required: false,
    example: 'This is a task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The completion status of the task',
    required: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;
}
