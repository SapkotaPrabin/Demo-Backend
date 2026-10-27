import { NestFactory } from '@nestjs/core';
import { DemoGatewayModule } from './demo-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(DemoGatewayModule);
  const port = Number(process.env.CORE_SERVICE_PORT ?? 3000);

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');
  console.log(`API Gateway is running at http://localhost:${port}`);
}

void bootstrap();
