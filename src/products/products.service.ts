import { Injectable, NotFoundException } from '@nestjs/common';

import { v4 as UuidV4 } from 'uuid';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {


  private products: Product[] = [];




  create(createProductDto: CreateProductDto) {


    const { name, description, price } = createProductDto;


    const newProduct = new Product(
      UuidV4(),
      name,
      description,
      price
    );

    this.products.push(newProduct);
    return newProduct;

    return 'This action adds a new product';
  }

  findAll() {

    return this.products;

    // return `This action returns all products`;
  }

  findOne(id: string): Product {

    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new NotFoundException(`Product not found ${id}`)
    }


    return product;

    // return `This action returns a #${id} product`;
  }

  update(id: string, updateProductDto: UpdateProductDto) {


    const { id: _, name, description, price } = updateProductDto;

    const product = this.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product not found ${id}`)
    }

    product.updateWith({ name, description, price });


    return product;

  }

  remove(id: string): Product {


    const product = this.findOne(id);

    this.products = this.products.filter(product => product.id !== id);

    return product;

  }
}
