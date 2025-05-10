<template>
    <form class="address-form" @submit.prevent="submitForm">

        <div class="form-titel">
            <p>لطفا مشخصات و آدرس خود را وارد کنید</p>
        </div>

        <div class="form-group">
            <label for="firstname">نام:</label>
            <input v-model="form.firstName" type="text" id="firstname" placeholder="مثال: امین" />
            <span v-if="errors.firstName">{{ errors.firstName }}</span>
        </div>

        <div class="form-group">
            <label for="lastname">نام خانوادگی:</label>
            <input id="lastname" v-model="form.lastName" type="text" placeholder="مثال: گودرزی" />
            <span v-if="errors.lastName">{{ errors.lastName }}</span>
        </div>

        <div class="form-group">
            <label for="mobile-phone">شماره تلفن همراه:</label>
            <input id="mobile-phone" v-model="form.mobile" type="text" placeholder="مثال: 09121234567" />
            <span v-if="errors.mobile">{{ errors.mobile }}</span>
        </div>

        <div class="form-group small">
            <label for="phone">تلفن ثابت (اختیاری): <span style="color:#757575; margin-right: 20px;">* با پیش
                    شماره</span></label>

            <input id="phone" v-model="form.phone" type="text" placeholder="مثال: 0211234567" />
            <span v-if="errors.phone">{{ errors.phone }}</span>
        </div>

        <div class="form-group larg">
            <label for="address">آدرس:</label>
            <input id="address" type="text" v-model="form.address"></input>
            <span v-if="errors.address">{{ errors.address }}</span>
        </div>

        <div class="form-group gender-group">
            <label>جنسیت:</label>
            <label><input type="radio" value="مرد" v-model="form.gender" /> آقا</label>
            <label><input type="radio" value="زن" v-model="form.gender" /> خانم</label>
            <span v-if="errors.gender">{{ errors.gender }}</span>
        </div>


    </form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                mobile: '',
                phone: '',
                address: '',
                gender: ''
            },
            errors: {}
        }
    },
    methods: {
        validate() {
            this.errors = {}

            if (this.form.firstName.length < 3) {
                this.errors.firstName = 'نام باید حداقل ۳ حرف باشد'
            }

            if (this.form.lastName.length < 3) {
                this.errors.lastName = 'نام خانوادگی باید حداقل ۳ حرف باشد'
            }

            if (!/^09\d{9}$/.test(this.form.mobile)) {
                this.errors.mobile = 'فرمت موبایل نادرست است (مثلاً 09123456789)'
            }

            if (this.form.phone && !/^\d{11}$/.test(this.form.phone)) {
                this.errors.phone = 'تلفن ثابت باید ۱۱ رقم باشد'
            }

            if (this.form.address.length < 10) {
                this.errors.address = 'آدرس باید حداقل ۱۰ حرف باشد'
            }

            if (!this.form.gender) {
                this.errors.gender = 'جنسیت را انتخاب کنید'
            }

            return Object.keys(this.errors).length === 0
        },

        submitForm() {
            if (this.validate()) {
                this.$emit('form-submitted', { ...this.form })
                return true
            }
            return false
        }
    }
}
</script>

<style lang="scss" scoped>
.address-form {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    max-width: 808px;
    margin: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 20px;
    padding: 20px 50px;
    background-color: white;

    .form-titel {
        grid-column: span 3;
        font-size: 16px;
        font-weight: 700;
    }


    .larg {
        grid-column: span 2;
    }

    .small {
        grid-column: span 1;
    }

    .form-group {
        display: flex;
        flex-direction: column;



        input,
        textarea {
            padding: 8px;
            border: 1px solid #D4D4D4;
            border-radius: 4px;
            outline: none;
            height: 46px;
            font-size: 14px;
        }

        input::placeholder {
            color: #B6B6B6;
        }

        input[type="text"]:focus {
            border: 1px solid #00BFA5;
        }

        span {
            color: red;
            font-size: 0.8rem;
            margin-top: 4px;
        }
    }

    .gender-group {
        flex-direction: row;
        align-items: center;
        grid-column: span 2;

        label {
            display: flex;
            margin-left: 10px;
            gap: 5px;
            align-items: center;
        }

        input[type="radio"] {
            -webkit-appearance: none;
            appearance: none;
            background-color: #fff;
            margin: 0;
            font: inherit;
            color: currentColor;
            width: 1.15em;
            height: 1.15em;
            border: 1px solid #00BFA5;
            border-radius: 50%;
            transform: translateY(-0.075em);
            display: grid;
            place-content: center;
        }

        input[type="radio"]::before {
            content: "";
            width: 0.65em;
            height: 0.65em;
            border-radius: 50%;
            transform: scale(0);
            transition: 120ms transform ease-in-out;
            box-shadow: inset 1em 1em var(--form-control-color);
            background-color: #00BFA5;
        }

        input[type="radio"]:checked::before {
            transform: scale(1);
        }
    }


}

@media (max-width: 768px) {
    .address-form {
        display: flex;
        flex-direction: column;
        height: 90vh;

        .form-titel {
            font-size: 12px;
        }

        .form-group {

            input,
            textarea {
                font-size: 14px;
                height: 46px;
            }

            label {
                font-size: 12px;
            }

            span {
                font-size: 0.75rem;
            }
        }

        .gender-group {
            gap: 10px;
            align-items: flex-start;

            label {
                margin-left: 0;

            }
        }
    }
}
</style>