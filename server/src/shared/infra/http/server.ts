import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import '@shared/container';

import uploadConfig from '@config/upload';
import AppException from '@shared/exceptions/AppException';
import routes from './routes';

import '@shared/infra/typeorm/database';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((error: Error, req: Request, res: Response, _: NextFunction) => {
  console.error(error);
  if (error instanceof AppException) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started.');
});
