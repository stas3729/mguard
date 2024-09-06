import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  logger = new Logger('PrismaService');
  onModuleInit() {
    this.$connect()
      .then(() => this.logger.log('Connected to DB'))
      .catch((error) => this.logger.error(error));
  }
}
