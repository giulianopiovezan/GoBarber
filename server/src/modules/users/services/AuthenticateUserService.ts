import { sign } from 'jsonwebtoken';
import { jwt } from '@config/auth';
import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import AppException from '@shared/exceptions/AppException';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private repository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppException('Incorrent email/password combination.', 401);
    }

    const passwordMatches = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new AppException('Incorrent email/password combination.', 401);
    }

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    delete user.password;

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
