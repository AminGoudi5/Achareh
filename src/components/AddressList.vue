// ViewDetailsPage.vue
<template>
    <div class="view-details " v-for="(item, index) in addresses" :key="index">

        <div class="detail-group desktop-only">
            <p class="titel">نام</p>
            <p>{{ item.first_name }}</p>
        </div>
        <div class="detail-group desktop-only">
            <p class="titel">نام خانوادگی</p>
            <p>{{ item.last_name }}</p>
        </div>
        <div class="detail-group mobile-only">
            <p class="titel">نام و نام خانوادگی</p>
            <p>{{ item.first_name }} {{ item.last_name }}</p>
        </div>
        <div class="detail-group">
            <p class="titel">شماره همراه</p>
            <p>{{ item.coordinate_mobile }}</p>
        </div>
        <div class="detail-group mobile-phone">
            <p class="titel">شماره تلفن ثابت</p>
            <p>{{ item.coordinate_phone_number }}</p>
        </div>
        <div class="detail-group mobile-gender">
            <p class="titel"> جنسیت</p>
            <p>{{ item.gender ? '' : '-' }}</p>
        </div>
        <div class="detail-group mobile-address">
            <p class="titel">آدرس</p>
            <p>{{ item.address }}</p>
        </div>

    </div>
</template>
<script>
export default {
    props: {
        addresses: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.view-details {
    border-radius: 4px;
    width: 808px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    padding: 20px 50px;
    background-color: white;

    .mobile-only {
        display: none !important;
    }

    .detail-group {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .titel {
        color: #9B9B9B;
        font-size: 14px;
        font-weight: 400;
    }

    p {
        font-size: 16px;
        font-weight: 700;
    }


}

@media (max-width: 768px) {
    .desktop-only {
        display: none !important;
    }

    .mobile-only {
        display: flex !important;
    }

    .view-details {
        width: 65%;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 1fr);

        .detail-group {
            flex-direction: row;
            justify-content: space-between;
        }

        .mobile-address {
            flex-direction: column;
        }

        .mobile-gender {
            grid-row-end: 3;

        }

        .mobile-phone {
            padding-bottom: 10px;
            border-bottom: 1px solid #E0E0E0;
        }
    }

}
</style>
