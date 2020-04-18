import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import handleErrorMiddleware from './middlewares/handleError';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(handleErrorMiddleware);

app.listen(3333, () => console.log('Server Started'));
