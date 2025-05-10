<!-- src/components/Header.vue -->
<template>
  <header class="header">
    <img src="../assets/achareh-type-logo-v2.c68d84f.png" class="header-icon" />
    <div class="address-links">
      <router-link to="/">ثبت آدرس</router-link>
      <router-link to="/addresses">مشاهده آدرس‌ها</router-link>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  display: flex;
  align-items: center;
  height: 74px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-icon {
  height: 40px;
}

.address-links {
  justify-content: flex-end;
  display: flex;
  gap: 20px;
}

.router-link-exact-active {
  color: #1da96d !important;
}


@media (max-width: 768px) {
  .header {
    width: 90%;
  }
}
</style>
