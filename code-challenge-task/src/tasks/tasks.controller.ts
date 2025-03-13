import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { ApiQuery } from '@nestjs/swagger';
import { UpdateTaskDto } from './dto/update-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() taskData: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(taskData);
  }

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Número de elementos por página',
    example: 10,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Task[]> {
    return await this.tasksService.findAll(Number(page), Number(limit));
  }

  @Get('status-count')
  async getStatusCount() {
    const pending = await this.tasksService.countByCompleted(false);
    const completed = await this.tasksService.countByCompleted(true);
    return { pending, completed };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(Number(id), updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.tasksService.remove(Number(id));
  }
}
