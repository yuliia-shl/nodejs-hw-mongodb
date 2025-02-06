import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({ page = 1, perPage = 10 }) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const data = await ContactCollection.find().skip(skip).limit(limit).exec();
  const totalItems = await ContactCollection.countDocuments();

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return result;
};

export const deleteContact = async (_id) => {
  const result = await ContactCollection.findOneAndDelete({ _id });
  return result;
};
