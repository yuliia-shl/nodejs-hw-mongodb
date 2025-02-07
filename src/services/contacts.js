import createHttpError from 'http-errors';
import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const contactQuery = ContactCollection.find();

  if (typeof filter.isFavourite === 'boolean') {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [totalItems, data] = await Promise.all([
    ContactCollection.find().merge(contactQuery).countDocuments(),
    contactQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  if (page > paginationData.totalPages || page < 1) {
    throw createHttpError(400, `Invalid page number`, {
      requestedPage: page,
      totalPages: paginationData.totalPages,
    });
  }

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
