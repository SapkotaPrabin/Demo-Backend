import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { DemoGatewayModule } from './../src/demo-gateway.module';

describe('DemoGateway authentication (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DemoGatewayModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('rejects unauthenticated requests to protected routes', () => {
    return request(app.getHttpServer())
      .get('/applications')
      .expect(401);
  });

  afterEach(async () => {
    await app.close();
  });
});
