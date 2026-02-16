import "reflect-metadata";
import { DataSource } from "typeorm";
import { Order } from "../ecomerce/entity/Order";
import { OrderItem } from "../ecomerce/entity/OrderItem";
import { Product } from "../ecomerce/entity/Product";
import { User } from '../ecomerce/entity/User';
import dotenv from 'dotenv';
import path from 'path';
// Config paath to environmental variables
dotenv.config({
    path: path.resolve(__dirname, 'config/.env')
});

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Order, OrderItem, Product, User],
    migrations: ["src/migrations/*.ts"],
    synchronize: true
});