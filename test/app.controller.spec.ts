import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { TestingModule, Test } from '@nestjs/testing';
import { PrismaModule } from '../src/prisma/prisma.module';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = module.get<AppController>(AppController);
  });
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
