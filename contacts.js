const fs = require("fs/promises");
const path = require("path");
const {v4} = require("uuid");

const contactsPath = path.resolve('./db/contacts.json');

// Документируем каждую функцию
const listContacts = async() => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async(id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === Number(id));
    if (!result) {
        return null
    }
    return result;
}

const removeContact = async(id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(id));
    if (idx === -1) {
        return null;
    } 
    const updateContacts = contacts.filter(contact => contact.id !== Number(id));
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return updateContacts;
   }

const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};
