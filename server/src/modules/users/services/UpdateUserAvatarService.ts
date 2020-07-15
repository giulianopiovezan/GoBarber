import path from 'path';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import uploadConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/User';
import AppException from '@shared/exceptions/AppException';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<Omit<User, 'password'>> {
    const user = await this.repository.findById(user_id);

    if (!user) {
      throw new AppException(
        'Only authenticated users can change avatar.',
        401,
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.repository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
