const {Contact} = require('../models/contact');


const listContacts = async () => {
  return Contact.find().populate('owner', 'email subscription');
}

const getContactById = async (contactId) => {
  return Contact.findById(contactId);
}

const removeContact = async (contactId) => {
  return Contact.findByIdAndDelete(contactId);
}

const addContact = async (body, id) => {
  return Contact.create({...body, owner: id});
}

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate(id, body, {new: true});
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}