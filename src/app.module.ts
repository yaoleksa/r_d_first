import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeController } from './me.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductModule, UsersModule } from './entities';
import { User, Product, Order, OrderItem } from '../ecomerce';
import { OrderResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `src/config/.env.${process.env.NODE_ENV}` : 'src/config/.env'
    }),
    UsersModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db.hmhzqphmgzyedifcbcrz.supabase.co',
      port: 5432,
      username: 'postgres',
      password: 'Default_password#1',
      database: 'postgres',
      entities: [User, Product, Order, OrderItem],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    })
  ],
  controllers: [AppController, MeController],
  providers: [AppService, OrderResolver],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {}
}