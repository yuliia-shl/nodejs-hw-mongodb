import { model, Schema } from 'mongoose';
import { contactType } from '../../constants/contactsConst.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactType,
      default: 'personal',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
