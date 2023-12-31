import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { ProductDto } from './productDTO/productDTO';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

 
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({where:{id}});
          

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async create(createProductDto: ProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductDto: ProductDto): Promise<Product> {
    await this.productsRepository.update(id, updateProductDto);
    return this.productsRepository.findOne({where:{id}});
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}