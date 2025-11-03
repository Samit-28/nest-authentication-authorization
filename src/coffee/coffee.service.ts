import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class CoffeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const data: Prisma.CoffeeCreateInput = {
      name: createCoffeeDto.name,
      brand: createCoffeeDto.brand,
      flavors: createCoffeeDto.flavors,
      coffeeType: createCoffeeDto.coffeeType,
    };
    return await this.prisma.coffee.create({ data });
  }

  async findAll() {
    return await this.prisma.coffee.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.coffee.findUnique({ where: { id } });
  }

  async update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return await this.prisma.coffee.update({
      where: { id },
      data: updateCoffeeDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.coffee.delete({ where: { id } });
  }
}
