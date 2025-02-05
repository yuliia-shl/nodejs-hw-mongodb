import { Router } from 'express';
import * as contactsCtrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addContactValidSchema,
  updateContactValidSchema,
} from '../validation/contactValidSchema.js';
import { isValidId } from '../middlewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsCtrl.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsCtrl.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(addContactValidSchema),
  ctrlWrapper(contactsCtrl.addContactsController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactValidSchema),
  ctrlWrapper(contactsCtrl.updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsCtrl.deleteContactController),
);

export default contactsRouter;
