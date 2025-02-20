import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/env.js';
import createHttpError from 'http-errors';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.API_KEY),
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    console.log(error);
    throw createHttpError(500, 'Failed to upload an image to Cloudinary');
  }
};
