<template>
  <header>
    <h2 v-if="isMapPage">
      <span class="back-button" @click="goBack">
        →
      </span>
      <span class=" title-desktop">انتخاب آدرس</span>
      <span class="title-mobile">انتخاب موقعیت</span>


    </h2>

    <h2 v-else>
      ثبت آدرس
    </h2>


  </header>
  <!-- بخش انتخاب موقعیت روی نقشه -->
  <MapPicker v-if="isMapPage && !showSuccessMessage" ref="mapPicker" :form-data="formData"
    @location-selected="handleLocationSelected" />
  <div class="register-page">
    <!-- بخش فرم ورود اطلاعات -->
    <AddressForm v-if="!formSubmitted" ref="addressForm" @form-submitted="handleFormSubmitted" />



    <!-- نمایش پیغام موفقیت بعد از انتخاب موقعیت -->
    <div v-if="showSuccessMessage" class="success-message">
      <div class="success-icon">
        <i class='far fa-check-circle' style='font-size:36px'></i>
      </div>
      <h3>اطلاعات شما با موفقیت ثبت شد</h3>
      <button @click="viewDetails" class="submit-btn">مشاهده اطلاعات</button>
    </div>

    <footer class="footer" v-if="!showSuccessMessage">
      <button @click="onFooterSubmit" :disabled="isLoading" class="submit-btn">
        <template v-if="isLoading">
          <div class="loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </template>
        <template v-else>
          ثبت و ادامه
        </template>
      </button>
    </footer>

  </div>

</template>

<script>
import AddressForm from '../components/AddressForm.vue'
import axios from 'axios'
import MapPicker from '../components/MapPicker.vue'

export default {
  components: { AddressForm, MapPicker },
  data() {
    return {
      isMapPage: false,
      formSubmitted: false,
      formData: null,
      showSuccessMessage: false,
      isLoading: false,
    }
  },
  methods: {
    async onFooterSubmit() {

      if (!this.formSubmitted) {
        const isValid = await this.$refs.addressForm.submitForm()
        if (isValid) {
          const form = this.$refs.addressForm.form
          this.handleFormSubmitted({ ...form })
        }
      } else if (this.isMapPage) {
        const isValid = await this.$refs.mapPicker.submitLocation()

        if (isValid) {
          this.isLoading = true
          // موقعیت با موفقیت ثبت شده، اتفاقات بعدی در handleLocationSelected اجرا می‌شن
        }
      }

    },
    handleFormSubmitted(data) {
      this.formData = data
      this.formSubmitted = true
      this.isMapPage = true
    },
    async handleLocationSelected(location) {

      const payload = {
        ...this.formData,
        lat: location.lat,
        lng: location.lng,
        region: 1
      }

      try {
        const response = await axios.post('https://stage.achareh.ir/api/karfarmas/address', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4'
          }
        })

        this.showSuccessMessage = true
        this.isMapPage = false
      } catch (error) {
        this.showSuccessMessage = true
        this.isMapPage = false
      } finally {
        this.isLoading = false
      }
    },
    goBack() {
      this.isMapPage = false
      this.formSubmitted = false
      this.showSuccessMessage = false
    },
    viewDetails() {
      this.$router.push({ name: 'addressListPage' })
    }
  }

}
</script>

<style scoped lang="scss">
header {
  width: 808px;

  h2 {
    font-size: 16px;
    font-weight: 400;
    margin: 20px 0;
  }

  .title-desktop {
    display: inline;
  }

  .title-mobile {
    display: none;
  }

  .back-button {
    font-size: 1.5rem;
    cursor: pointer;
    margin-left: 10px;
  }
}

.register-page {
  width: 808px;

  .success-icon {

    border-radius: 50%;
    color: #323232;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;

    i {
      font-weight: 100;
    }
  }

  .success-message {
    text-align: center;
    margin-top: 20px;
  }

  .submit-btn {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .submit-btn:hover {
    background-color: #369e72;
  }
}

.footer {

  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

  button {
    padding: 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    width: 224px;
    cursor: pointer;

    &:hover {
      background-color: #369e72;
    }
  }

  background-color: white;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

.submit-btn .loader {
  display: inline-block;
  width: 40px;
  height: 10px;
  position: relative;
}

.submit-btn .loader div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  animation: bounce-scale 1.2s infinite ease-in-out;
}

.submit-btn .loader div:nth-child(1) {
  left: 0;
  animation-delay: 0s;
}

.submit-btn .loader div:nth-child(2) {
  left: 20px;
  animation-delay: 0.2s;
}

.submit-btn .loader div:nth-child(3) {
  left: 40px;
  animation-delay: 0.4s;
}

@keyframes bounce-scale {

  0%,
  100% {
    transform: scale(1);
    /* حالت اولیه */
  }

  50% {
    transform: scale(1.5);
    /* بزرگتر شدن */
  }
}



@media (max-width: 768px) {

  header,
  .register-page {
    width: 90%;
    margin: 0;
    box-sizing: border-box;

  }

  header {
    height: 38px;

    h2 {
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    .title-desktop {
      display: none;
    }

    .back-button {
      position: absolute;
      right: 25px;
    }

    .title-mobile {
      display: inline;
    }
  }

  .register-page {
    .footer {
      width: 100%;
      left: 0;
      transform: none;

      button {
        width: 90%;
        max-width: 300px;
      }
    }


    .submit-btn {
      width: 90%;
      max-width: 300px;
    }
  }

}
</style>
