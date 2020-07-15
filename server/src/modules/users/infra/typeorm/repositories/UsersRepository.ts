import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({ email, name, password }: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create({ email, name, password });

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    await this.ormRepository.save(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    if (except_user_id) {
      return this.ormRepository.find({
        where: {
          id: Not(except_user_id),
        },
      });
    }

    return this.ormRepository.find();
  }
}

export default UsersRepository;
