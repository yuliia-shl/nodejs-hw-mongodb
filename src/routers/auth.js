import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController,
  logoutUserController,
  refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import {
  loginUserValidSchema,
  registerUserValidSchema,
} from '../validation/authValidSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserValidSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  validateBody(loginUserValidSchema),
  ctrlWrapper(loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(refreshSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;
