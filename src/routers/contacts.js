import { Router } from 'express';
import * as contactsCtrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addContactValidSchema,
  updateContactValidSchema,
} from '../validation/contactValidSchema.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsCtrl.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsCtrl.getContactByIdController),
);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(addContactValidSchema),
  ctrlWrapper(contactsCtrl.addContactsController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactValidSchema),
  ctrlWrapper(contactsCtrl.updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsCtrl.deleteContactController),
);

export default contactsRouter;
