import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/ContactBook.vue";

const routes = [
  // Trang danh bạ
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  // Trang cập nhật liên hệ
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("@/views/ContactEdit.vue"),
    props: true, // truyền id từ $route.params vào props
  },
  // Route 404 - luôn để cuối cùng
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
