const { ObjectId } = require("mongodb");

class ContactService {
  constructor(client) {
    this.Contact = client.db().collection("contacts");
  }

  // 🧩 Lọc dữ liệu hợp lệ trước khi ghi vào DB
  extractContactData(payload) {
    const contact = {
      name: payload.name,
      email: payload.email,
      address: payload.address,
      phone: payload.phone,
      favorite: payload.favorite === true, // đảm bảo là boolean
    };

    // Xóa các trường undefined
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }

  // 🟢 Tạo mới contact 
  async create(payload) {
    const contact = this.extractContactData(payload);
    const result = await this.Contact.insertOne(contact);

    return result.insertedId
      ? await this.Contact.findOne({ _id: result.insertedId })
      : null;
  }

  // 🔍 Tìm tất cả contact theo điều kiện filter
  async find(filter) {
    const cursor = await this.Contact.find(filter);
    return await cursor.toArray();
  }

  // 🔍 Tìm theo tên (không phân biệt hoa/thường)
  async findByName(name) {
    const trimmedName = name.trim();
    const safeRegex = new RegExp(trimmedName, "i");
    return await this.find({ name: safeRegex });
  }

  // 🔍 Tìm contact theo ID
  async findById(id) {
    return await this.Contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // ✏️ Cập nhật contact theo ID
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractContactData(payload);
    const result = await this.Contact.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" } // trả về document sau khi cập nhật
    );

    return result.value; // document sau khi update
  }

  // ❌ Xóa contact theo ID
  async delete(id) {
    const result = await this.Contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value; // document đã bị xóa
  }

  // 🗑️ Xóa tất cả contact
  async deleteAll() {
    const result = await this.Contact.deleteMany({});
    return result.deletedCount; // số lượng contact đã xóa
  }

  // 💖 Lấy danh sách contact yêu thích
  async findFavorite() {
    return await this.find({ favorite: true });
  }
}

module.exports = ContactService;
