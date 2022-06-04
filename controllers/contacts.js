const contacts = require("../services/contact.service")

const listContacts = async (req, res, next) => {
    try {
      const all = await contacts.listContacts()
      res.json({
        status: "success",
        code: 200,
        data: {
          result: all
        }
    })
      
    } catch (error) {
      next(error)    
    }
    
  };

const getContactById = async (req, res, next) => {
    try {
      const {id} = req.params;
      const result = await contacts.getContactById(id);
      if(!result){
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      })
    } catch (error) {
      next(error)
    }
  };

const addContact = async (req, res, next) => {
    try {
    //   const {error} = contactSchema.validate(req.body);
    //   if(error){
    //     error.status = 400;
    //     error.message = "missing required name field";
    //     throw error;
    //   }
      const result = await contacts.addContact(req.body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result
        }
      })
    } catch (error) {
      next(error)
    }
  };

const removeContact = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await contacts.removeContact(id);
      if(!result){
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
          result,
        }
      })
    } catch (error) {
      next(error)
    }
  };

const updateContact = async (req, res, next) => {
    try {
    //   const {error} = contactSchema.validate(req.body);
    //   if(error){
    //     error.status = 400;
    //     error.message = "missing fields";
    //     throw error;
    //   }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result){
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        }
      })
    } catch (error) {
      next(error)
    }
  };

const updateStatusContact = async (req, res, next) => {
    try {
    //   const {error} = contactSchema.validate(req.body);
    //   if(error){
    //     error.status = 400;
    //     error.message = "missing fields";
    //     throw error;
    //   }
      const {favorite} = req.body;
      if(favorite === undefined) {
        const error = new Error("missing field favorite");
        error.status = 400;
        throw error;
      }
      const {id} = req.params;
      const result = await contacts.updateContact(id, req.body);
      if(!result){
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result,
        }
      })
    } catch (error) {
      next(error)
    }
  };

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}