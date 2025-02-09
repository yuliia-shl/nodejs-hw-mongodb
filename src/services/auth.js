import createHttpError from 'http-errors';
import userCollection from '../db/models/User.js';
import bcrypt from 'bcrypt';

export const registerUser = async (payload) => {
  const user = await userCollection.findOne({
    email: payload.email,
  });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await userCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
