<template>
  <div class="page">
    <p>
      Oops, không thể tìm thấy trang. Trở về
      <router-link to="/">trang chủ.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
