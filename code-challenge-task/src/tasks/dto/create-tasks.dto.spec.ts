import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateTaskDto } from './create-tasks.dto';

describe('CreateTaskDto', () => {
  it('should validate correctly with valid data', async () => {
    const input = {
      title: 'Valid Task Title',
      description: 'Valid Task Description',
      completed: true,
    };
    const dto = plainToInstance(CreateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores de validación
  });

  it('should fail validation when title is missing', async () => {
    const input = {
      description: 'Valid Task Description',
      completed: true,
    };
    const dto = plainToInstance(CreateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores de validación
    expect(errors[0].property).toBe('title');
  });

  it('should fail validation when description is not a string', async () => {
    const input = {
      title: 'Valid Task Title',
      description: 12345, // Valor no válido
      completed: true,
    };
    const dto = plainToInstance(CreateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores de validación
    expect(errors[0].property).toBe('description');
  });

  it('should fail validation when completed is not a boolean', async () => {
    const input = {
      title: 'Valid Task Title',
      description: 'Valid Task Description',
      completed: 'yes', // Valor no válido
    };
    const dto = plainToInstance(CreateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores de validación
    expect(errors[0].property).toBe('completed');
  });
});
