import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateTaskDto } from './update-tasks.dto';

describe('UpdateTaskDto', () => {
  it('should validate correctly with valid data', async () => {
    const input = {
      title: 'Updated Task Title',
      description: 'Updated Task Description',
      completed: true,
    };
    const dto = plainToInstance(UpdateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores de validación
  });

  it('should pass validation when no data is provided', async () => {
    const input = {};
    const dto = plainToInstance(UpdateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBe(0); // No debe haber errores, ya que todas las propiedades son opcionales
  });

  it('should fail validation when provided data does not meet criteria', async () => {
    const input = {
      title: '', // Título vacío no válido
      description: 'Updated Task Description',
      completed: 'not-a-boolean', // Valor no booleano
    };
    const dto = plainToInstance(UpdateTaskDto, input);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); // Debe haber errores de validación
  });
});
