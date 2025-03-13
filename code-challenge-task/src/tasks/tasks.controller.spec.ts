import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-tasks.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const tasksRepositoryMock = {
      create: jest.fn().mockReturnThis(),
      save: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: tasksRepositoryMock,
        },
        {
          provide: 'CACHE_MANAGER',
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create and return a task', async () => {
    const createTaskDto: CreateTaskDto = {
      completed: false,
      description: 'Test Description',
      title: 'Test Title',
    };
    const result: Task = {
      id: 1,
      ...createTaskDto,
    };

    const createSpy = jest.spyOn(service, 'create').mockResolvedValue(result);

    expect(await controller.create(createTaskDto)).toBe(result);
    expect(createSpy).toHaveBeenCalledWith(createTaskDto);
  });

  it('should return an array of tasks', async () => {
    const result: Task[] = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: true,
      },
    ];

    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue(result);

    expect(await controller.findAll()).toBe(result);
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should return a task', async () => {
    const result: Task = {
      id: 1,
      title: 'Task 1',
      description: 'Description 1',
      completed: false,
    };

    const findOneSpy = jest.spyOn(service, 'findOne').mockResolvedValue(result);

    expect(await controller.findOne('1')).toBe(result);
    expect(findOneSpy).toHaveBeenCalledWith(1);
  });

  it('should return the count of completed and pending tasks', async () => {
    const countByCompletedSpy = jest
      .spyOn(service, 'countByCompleted')
      .mockResolvedValue(10);

    const result = await controller.getStatusCount();
    expect(result).toEqual({ pending: 10, completed: 10 });
    expect(countByCompletedSpy).toHaveBeenCalledWith(false);
    expect(countByCompletedSpy).toHaveBeenCalledWith(true);
  });

  it('should update and return a task', async () => {
    const updateTaskDto: CreateTaskDto = {
      completed: true,
      description: 'Updated Description',
      title: 'Updated Title',
    };
    const result: Task = {
      id: 1,
      ...updateTaskDto,
    };

    const updateSpy = jest.spyOn(service, 'update').mockResolvedValue(result);

    expect(await controller.update('1', updateTaskDto)).toBe(result);
    expect(updateSpy).toHaveBeenCalledWith(1, updateTaskDto);
  });

  it('should remove a task', async () => {
    const removeSpy = jest
      .spyOn(service, 'remove')
      .mockResolvedValue(undefined);

    expect(await controller.remove('1')).toBeUndefined();
    expect(removeSpy).toHaveBeenCalledWith(1);
  });
});
