import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { InvalidModelError, NotFoundError } from "@shared/errors";
import { IBaseRepository } from "@shared/repository";
import { DatabaseService, Models } from "@shared/service";

export class BaseRepository<T extends { id: any }>
  implements IBaseRepository<T>
{
  constructor(
    private readonly db: DatabaseService,
    private readonly model: string
  ) {
    if (!Models.includes(model))
      throw new InvalidModelError(`Model ${model} already exists`);
  }

  async create(data: any): Promise<T> {
    return this.db[this.model].create({ data });
  }

  async createMany(data: any): Promise<T[]> {
    return this.db[this.model].createMany({ data });
  }

  async findAll(): Promise<T[]> {
    return this.db[this.model].findMany();
  }

  async findById(id: T["id"]): Promise<T> {
    return this.db[this.model].findUnique({ where: { id } });
  }

  async findMany(query: any): Promise<T[]> {
    return this.db[this.model].findMany({ ...query });
  }

  findOne(query: any): Promise<T> {
    return this.db[this.model].findFirst({ ...query });
  }

  async update(id: T["id"], query: any): Promise<T> {
    let object = undefined;
    try {
      object = await this.db[this.model].update({ where: { id }, ...query });
    } catch (e: any) {
      if (e instanceof PrismaClientKnownRequestError)
        throw new NotFoundError(e.code);
      throw e;
    }
    return object;
  }
}
