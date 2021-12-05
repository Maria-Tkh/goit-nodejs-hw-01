// const fs = require("fs/promises");
// const contactsPath = require("./contactsPath");
const listContacts = require("./listContacts");

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === Number(id));
    if (!result) {
        return null
    }
    return result;
}

module.exports = getContactById;