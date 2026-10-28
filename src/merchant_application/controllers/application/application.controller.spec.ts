import { jest } from '@jest/globals';
import { ApplicationUseCase } from '../../application/usecases/application.usecase';
import { ApplicationController } from './application.controller';

describe('ApplicationController', () => {
  let controller: ApplicationController;
  let applicationUseCase: jest.Mocked<Pick<
    ApplicationUseCase,
    'create' | 'getApplicationList' | 'update' | 'updateRiskDecision'
  >>;

  beforeEach(() => {
    applicationUseCase = {
      create: jest.fn(),
      getApplicationList: jest.fn(),
      update: jest.fn(),
      updateRiskDecision: jest.fn(),
    };
    controller = new ApplicationController(applicationUseCase as unknown as ApplicationUseCase);
  });

  it('delegates create with the user and request body', async () => {
    const user = { userId: 10 };
    const body = { businessName: 'Example Ltd' } as any;

    await controller.create(user, body);
    expect(applicationUseCase.create).toHaveBeenCalledWith(user, body);
  });

  it('delegates application listing with the user and query', async () => {
    const user = { userId: 10 };
    const query = { page: 2, limit: 15, status: 'submitted' };

    await controller.getApplicationList(user, query);
    expect(applicationUseCase.getApplicationList).toHaveBeenCalledWith(user, query);
  });

  it('delegates application updates with the user, ID, and body', async () => {
    const user = { userId: 10 };
    const applicationId = 42;
    const body = { businessName: 'Updated Ltd' } as any;

    await controller.updateApplication(user, body, applicationId);
    expect(applicationUseCase.update).toHaveBeenCalledWith(user, applicationId, body);
  });

  it('delegates risk decision updates with the user, ID, and status', async () => {
    const user = { userId: 10 };
    const applicationId = 42;
    const body = { status: 'accepted' as any };

    await controller.updateRiskDecision(user, body, applicationId);
    expect(applicationUseCase.updateRiskDecision).toHaveBeenCalledWith(user, applicationId, body);
  });

  it('delegates the legacy risk decision route to the same use case', async () => {
    const user = { userId: 10 };
    const applicationId = 42;
    const body = { status: 'rejected' };

    await controller.updateRiskDecisionWithLegacyPath(user, body, applicationId);
    expect(applicationUseCase.updateRiskDecision).toHaveBeenCalledWith(user, applicationId, body);
  });
});
