<template>
  <div class="map-container">

    <p>موقعیت مورد نظر خود را روی نقشه مشخص کنید</p>
    <div id="map" ref="map" class="map"></div>


  </div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapPicker',
  props: ['formData'],
  data() {
    return {
      map: null,
      marker: null,
      selectedLatLng: null
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      this.map = L.map(this.$refs.map).setView([35.6892, 51.3890], 13) // تهران

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map)

      this.map.on('click', this.onMapClick)
    },
    onMapClick(e) {
      const { lat, lng } = e.latlng
      this.selectedLatLng = { lat, lng }

      if (this.marker) {
        this.marker.setLatLng(e.latlng)
      } else {
        this.marker = L.marker(e.latlng, { icon: this.createCustomIcon() }).addTo(this.map)
      }
    },
    createCustomIcon() {
      return L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [35, 45],
        iconAnchor: [17, 42]
      })
    },
    isLocationValid() {
      return !!this.selectedLatLng
    },
    submitLocation() {
      if (!this.selectedLatLng) {
        alert('لطفاً یک موقعیت روی نقشه انتخاب کنید.')
        return
      }

      this.$emit('location-selected', {
        ...this.formData,
        location: this.selectedLatLng
      })
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.map-container {
  border-radius: 4px;
  width: 808px;
  text-align: right;
  background-color: white;


  p {
    font-size: 12px;
    font-weight: 700;
    padding: 10px 30px;
    color: #37474F;
  }

  .map {
    height: 60vh;
    width: 100%;
    overflow: hidden;
  }


}

@media (max-width: 768px) {
  .map-container {

    width: 100%;
    height: 100vh;

    p {
      display: none;
    }

    .map {
      height: 75%;
    }
  }
}
</style>