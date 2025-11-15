const express = require("express");
const contacts = require("../controllers/contact.controller");

const router = express.Router();

// 🔍 Lấy tất cả hoặc tìm theo tên (?name=...)
router
  .route("/")
  .get(contacts.findAll)      // GET /api/contacts hoặc /api/contacts?name=An
  .post(contacts.create)      // POST /api/contacts
  .delete(contacts.deleteAll);// DELETE /api/contacts

// 💖 Lấy danh sách favorite
router.route("/favorite").get(contacts.findAllFavorite);

// 🧩 Các thao tác với ID
router
  .route("/:id")
  .get(contacts.findOne)      // GET /api/contacts/:id
  .put(contacts.update)       // PUT /api/contacts/:id
  .delete(contacts.delete);   // DELETE /api/contacts/:id

module.exports = router;
