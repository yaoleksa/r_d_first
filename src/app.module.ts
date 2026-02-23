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
import { FileRecord } from '../file-storage/FileRecord';
import { OrderItemResolver, OrderResolver } from './app.resolver';
import { FileRecordModule } from './file-record-entity';
import { ProductDataLoader } from './entities/products/product.loader';
import { AuthModule } from './file-record-entity/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `src/config/.env.${process.env.NODE_ENV}` : 'src/config/.env',
      isGlobal: true
    }),
    UsersModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, OrderItem, FileRecord],
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: `${process.cwd()}/schema.gql`
    }),
    FileRecordModule
  ],
  controllers: [AppController, MeController],
  providers: [AppService, OrderResolver, ProductDataLoader, OrderItemResolver],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {}
}