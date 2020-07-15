import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppException from '@shared/exceptions/AppException';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppException('User does not exists');
    }

    const userWithUpdatedEmail = await this.repository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppException('E-mail already in user.');
    }

    Object.assign(user, {
      name,
      email,
    });

    if (password && !old_password) {
      throw new AppException(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppException('Old password does not match.');
      }

      if (password) {
        user.password = await this.hashProvider.generateHash(password);
      }
    }

    return this.repository.save(user);
  }
}

export default UpdateProfileService;
