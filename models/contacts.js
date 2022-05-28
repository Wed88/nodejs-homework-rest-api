const fs = require('fs/promises')
const path = require("path");
const uuid = require("uuid")

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if(!contact){
    return null;
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  const removeContact = contacts[index];
  if(index !== -1) {
    contacts.splice(index,1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return removeContact;
}

const addContact = async (body) => {
  const newContact = {
    id: uuid.v4(),
    ...body
  };
  const contacts = await listContacts();
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if(idx === -1){
      return null;
  }
  contacts[idx] = {id, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
