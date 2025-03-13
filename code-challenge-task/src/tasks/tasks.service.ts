import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  async create(taskData: Partial<Task>): Promise<Task> {
    const task = this.tasksRepository.create(taskData);
    return await this.tasksRepository.save(task);
  }
  async findAll(page: number = 1, limit: number = 10): Promise<Task[]> {
    const [tasks] = await this.tasksRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const cacheKey = `task-${id}`;
    const cacheValue = await this.cacheManager.get(cacheKey);
    if (cacheValue) {
      return cacheValue as Task;
    }
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.cacheManager.set(cacheKey, task, 4000 * 1);
    return task;
  }

  async countByCompleted(completed: boolean): Promise<number> {
    return this.tasksRepository.count({ where: { completed } });
  }

  async update(id: number, updateData: Partial<Task>): Promise<Task> {
    // validar si existe el registro en el cache
    const cacheKey = `task-${id}`;
    const cacheValue = await this.cacheManager.get(cacheKey);
    if (cacheValue) {
      await this.cacheManager.del(cacheKey);
    }

    let existData = false;
    for (const key in updateData) {
      if (updateData[key]) {
        existData = true;
      }
    }

    if (!existData) {
      throw new NotFoundException(`No data to update`);
    }
    await this.tasksRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const cacheKey = `task-${id}`;
    const cacheValue = await this.cacheManager.get(cacheKey);
    if (cacheValue) {
      await this.cacheManager.del(cacheKey);
    }
    await this.tasksRepository.delete(id);
  }
}
