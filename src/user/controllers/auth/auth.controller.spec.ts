import { Test, TestingModule } from '@nestjs/testing';
import { jest } from '@jest/globals';
import { AuthController } from './auth.controller';
import { AuthUseCase } from '../../application/usecases/auth.usecase';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthUseCase,
          useValue: { login: jest.fn(), getProfile: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
