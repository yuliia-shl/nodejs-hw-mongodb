import { Router } from 'express';
import * as contactsCtrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  addContactValidSchema,
  updateContactValidSchema,
} from '../validation/contactValidSchema.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsCtrl.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsCtrl.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(addContactValidSchema),
  ctrlWrapper(contactsCtrl.addContactsController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactValidSchema),
  ctrlWrapper(contactsCtrl.updateContactController),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsCtrl.deleteContactController),
);

export default contactsRouter;
