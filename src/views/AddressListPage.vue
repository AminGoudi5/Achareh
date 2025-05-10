<template>
  <header>
    <h1>آدرس ها و مشخصات</h1>
  </header>

  <AddressList :addresses="addresses" />

</template>

<script>
import axios from 'axios'
import AddressList from '../components/AddressList.vue'

export default {
  components: { AddressList },
  data() {
    return {
      addresses: []
    }
  },
  async mounted() {
    try {
      const response = await axios.get('https://stage.achareh.ir/api/karfarmas/address', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
        }

      })
      console.log('آدرس‌های دریافتی:', response.data)
      this.addresses = response.data
    } catch (error) {
      console.error('خطا در دریافت آدرس‌ها:', error)
    }
  }
}
</script>

<style scoped lang="scss">
header {
  width: 808px;

  h1 {
    font-size: 16px;
    font-weight: 400;
    margin: 15px;
  }
}

@media (max-width: 768px) {
  header {
    width: 90%;

    h1 {
      font-size: 16px;
      font-weight: 400;
      margin: 15px;
    }
  }


}
</style>