import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeController } from './me.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users.module';
import { User, Product, Order, OrderItem } from '../ecomerce';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `src/config/.env.${process.env.NODE_ENV}` : 'src/config/.env'
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.hmhzqphmgzyedifcbcrz.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'Default_password#1',
      database: 'postgres',
      entities: [User, Product, Order, OrderItem]
    })
  ],
  controllers: [AppController, MeController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {}
}