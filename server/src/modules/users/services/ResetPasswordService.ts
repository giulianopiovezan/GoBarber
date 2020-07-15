import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppException from '@shared/exceptions/AppException';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('UserTokensRepository')
    private UserTokensRepository: IUserTokensRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.UserTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppException('User token does not exists');
    }

    const user = await this.repository.findById(userToken.user_id);

    if (!user) {
      throw new AppException('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAt) > 2) {
      throw new AppException('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.repository.save(user);
  }
}

export default ResetPasswordService;
