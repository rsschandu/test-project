import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SampleModule } from './sample/sample.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { CustomerModule } from './customer/customer.module';
import { BookModule } from './book/book.module';
import { LendingHistoryModule } from './lending_history/lending_history.module';
import { PricingTableModule } from './pricing_table/pricing_table.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SampleModule,
    CustomerModule,
    BookModule,
    LendingHistoryModule,
    PricingTableModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
