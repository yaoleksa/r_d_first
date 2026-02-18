import DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { Product } from '../../../ecomerce';
import { DataSource, In, Repository } from 'typeorm';

@Injectable({ scope: Scope.REQUEST }) // one loader per request
export class ProductDataLoader {
    private readonly productRepo: Repository<Product>;
    constructor(private readonly dataSource: DataSource) {
        this.productRepo = this.dataSource.getRepository(Product);
    }

    readonly batchProducts = new DataLoader<number, Product>(async (ids: number[]) => {
        console.log(`Proof that DataLoader works: ${ids}`);
        const products = await this.productRepo.findBy({
            id: In(ids)
        });
        const productsMap = new Map(products.map(p => [p.id, p]));
        return ids.map(id => productsMap.get(id));
    }); 
}