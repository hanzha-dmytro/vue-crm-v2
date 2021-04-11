<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Profile_Title' | localize }}</h3>
        </div>

        <form class="form" @submit.prevent="onSubmit">
            <div class="input-field">
                <input
                    id="description"
                    type="text"
                    v-model="name"
                    :class="{invalid: $v.name.$error}"
                >
                <label for="description">{{ 'Profile_Name' | localize}}</label>
                <small
                        v-if="$v.name.$dirty && !$v.name.required"
                        class="helper-text invalid"
                >{{ 'Profile_NameRequired' | localize }}
                </small>
                <small
                        v-if="$v.name.$dirty && !$v.name.minLength"
                        class="helper-text invalid"
                >{{ 'Profile_NameMinLength' | localize }}
                </small>
            </div>

            <div class="switch">
                <label>
                    English
                    <input
                        type="checkbox"
                        v-model="isRuLocale"
                    >
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'Profile_Update' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import {required, minLength, email} from 'vuelidate/lib/validators'

    export default {
        name: "profile",
        metaInfo() {
            return {
                title: this.$title('Category_Title')
            }
        },
        data: () => ({
            name: '',
            isRuLocale: true
        }),
        validations: {
            name: {required, minLength: minLength(3)},
        },
        methods: {
            ...mapActions(['updateInfo']),
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    name: this.name
                }

                try {
                    await this.updateInfo({
                        name: this.name,
                        locale: this.isRuLocale ? 'ru-RU' : 'en-US'
                    })
                } catch (e) {}
            }
        },
        mounted() {
            this.name = this.info.name
            this.isRuLocale = this.info.locale === 'ru-RU'
            setTimeout(() => {
                M.updateTextFields()
            }, 0)
        },
        computed: {
            ...mapGetters(['info'])
        }
    }
</script>

<style scoped>
    .switch {
        margin-bottom: 2rem;
    }
</style>