const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const listContacts = require("./listContacts");

const removeContact = async(id) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(id));
    if (idx === -1) {
        return null;
    } 
    const updateContacts = contacts.filter(contact => contact.id !== Number(id));
    fs.writeFile(contactsPath, JSON.stringify(updateContacts));
    return updateContacts;
}
   
module.exports = removeContact;
