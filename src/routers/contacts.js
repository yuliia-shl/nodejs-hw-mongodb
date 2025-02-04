import { Router } from 'express';
import * as contactsCtrl from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsCtrl.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsCtrl.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsCtrl.addContactsController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactsCtrl.upsertContactController),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsCtrl.deleteContactController),
);

export default contactsRouter;
