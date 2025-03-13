/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;

  let tasksRepositoryMock: {
    create: jest.Mock;
    save: jest.Mock;
    find: jest.Mock;
    findOne: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    findAndCount: jest.Mock;
    count: jest.Mock;
  };

  let cacheManagerMock: {
    get: jest.Mock;
    set: jest.Mock;
    del: jest.Mock;
  };

  beforeEach(async () => {
    tasksRepositoryMock = {
      create: jest.fn().mockReturnThis(),
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      findAndCount: jest.fn().mockResolvedValue([[], 0]),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    };

    cacheManagerMock = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: tasksRepositoryMock,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: cacheManagerMock,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    cacheManagerMock = module.get('CACHE_MANAGER');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a task', async () => {
    const taskData = {
      completed: false,
      description: 'Test Description',
      title: 'Test Title',
    };
    const task = {
      id: 1,
      ...taskData,
    };
    tasksRepositoryMock.create.mockReturnValue(task);
    tasksRepositoryMock.save.mockResolvedValue(task);

    const result = await service.create(taskData);

    expect(result).toEqual(task);
  });

  it('should return an array of tasks', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should return a task from cache if available', async () => {
    const taskId = 1;
    const cachedTask = {
      id: taskId,
      completed: false,
      description: 'Test Description',
      title: 'Test Title',
    };
    cacheManagerMock.get.mockResolvedValue(cachedTask);
    const result = await service.findOne(taskId);

    expect(result).toEqual(cachedTask);
  });

  it('should throw NotFoundException when task is not found', async () => {
    const taskId = 1;
    try {
      await service.findOne(taskId);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe(`Task with id ${taskId} not found`);
      } else {
        throw error;
      }
    }
  });

  it('should return a task', async () => {
    const taskId = 1;
    const task = {
      id: taskId,
      completed: false,
      description: 'Test Description',
      title: 'Test Title',
    };
    tasksRepositoryMock.findOne.mockResolvedValue(task);

    const result = await service.findOne(taskId);

    expect(result).toEqual(task);
  });

  //countByCompleted
  it('should return the count of completed tasks', async () => {
    const completedTasks = 10;
    tasksRepositoryMock.count.mockResolvedValue(completedTasks);

    const result = await service.countByCompleted(true);

    expect(result).toBe(completedTasks);
  });

  it('should update a task', async () => {
    const taskId = 1;
    const updateData = {
      completed: true,
      description: 'Updated Description',
      title: 'Updated Title',
    };
    const updatedTask = {
      id: taskId,
      ...updateData,
    };
    tasksRepositoryMock.update.mockResolvedValue(undefined);
    tasksRepositoryMock.findOne.mockResolvedValue(updatedTask);

    const result = await service.update(taskId, updateData);

    expect(result).toEqual(updatedTask);
  });

  it('should throw NotFoundException when no data to update', async () => {
    const taskId = 1;
    const updateData = {};
    try {
      await service.update(taskId, updateData);
    } catch (error: unknown) {
      if (error instanceof NotFoundException) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('No data to update');
      } else {
        throw error;
      }
    }
  });

  // entra al if (cacheValue) {
  it('should delete a task and remove it from cache', async () => {
    const taskId = 1;
    const task = {
      id: taskId,
      completed: false,
      description: 'Test Description',
      title: 'Test Title',
    };
    cacheManagerMock.get.mockResolvedValue(task);
    tasksRepositoryMock.delete.mockResolvedValue(undefined);

    await service.remove(taskId);

    expect(cacheManagerMock.get).toHaveBeenCalledWith(`task-${taskId}`);

    expect(cacheManagerMock.del).toHaveBeenCalledWith(`task-${taskId}`);
  });

  it('should delete a task', async () => {
    const result = await service.remove(1);
    expect(result).toBeUndefined();
  });
});
