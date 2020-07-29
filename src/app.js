import express from 'express';

import router from './routes';
import { errorMiddleware } from './middlewares';

const app = express();
app.use(express.json());
app.use(router);
app.use(errorMiddleware);

export default app;
