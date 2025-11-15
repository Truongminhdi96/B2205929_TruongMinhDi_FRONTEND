<template>
  <div class="page">
    <h4>Thêm mới Liên hệ <i class="fas fa-plus"></i></h4>
    
    <!-- Sử dụng ContactForm -->
    <ContactForm 
      :contact="contact" 
      @submit:contact="createContact" 
    />

    <p>{{ message }}</p>

    <!-- Nút quay về danh sách nếu muốn -->
    <button class="btn btn-secondary mt-2" @click="$router.push({ name: 'contactbook' })">
      <i class="fas fa-arrow-left"></i> Quay về danh bạ
    </button>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: { ContactForm },
  data() {
    return {
      // Form rỗng cho thêm mới
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        alert("Liên hệ mới đã được thêm thành công.");
        // Quay về trang danh bạ
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        this.message = "Lỗi khi thêm liên hệ. Vui lòng thử lại.";
      }
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 750px;
}
</style>
