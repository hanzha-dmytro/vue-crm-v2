<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
            <span class="card-title">{{ 'AppName' | localize }}</span>
            <div class="input-field">
                <input
                       id="email"
                       type="text"
                       v-model.trim="email"
                       :class="{invalid: $v.password.$error}"
                >
                <label for="email">{{ 'Login_Email' | localize }}</label>
                <small
                        v-if="$v.email.$dirty && !$v.email.required"
                        class="helper-text invalid"
                >{{ "Login_EmailRequired" | localize }}
                </small>
                <small
                        v-else-if="$v.email.$dirty && !$v.email.email"
                        class="helper-text invalid"
                >{{ "Login_EmailValidation" | localize }}
                </small>
            </div>
            <div class="input-field">
                <input
                        id="password"
                        type="password"
                        v-model.trim="password"
                        :class="{invalid: $v.password.$dirty && $v.password.$error}"
                >
                <label for="password">{{ "Login_Password" | localize }}</label>
                <small
                       v-if="$v.password.$dirty && !$v.password.required"
                       class="helper-text invalid"
                >{{ 'Login_PasswordRequired' | localize }}
                </small>
                <small
                        v-else-if="$v.password.$dirty && !$v.password.minLength"
                        class="helper-text invalid"
                >{{ 'Login_EmailMinLength' | localize }}
                </small>
            </div>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    {{ 'Login_Submit' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <p class="center">{{ 'Login_DontHaveAccount' | localize }} <router-link to="/register">{{ 'Login_Register' | localize }}</router-link></p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'
    import messages from '../utils/messages'

    export default {
        name: "login",
        data: () => ({
            email: '',
            password: ''
        }),
        metaInfo() {
            return {
                title: this.$title('Authentication')
            }
        },
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)}
        },
        mounted() {
            if(messages[this.$route.query.message]) {
                this.$message(messages[this.$route.query.message])
            }
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }

                try {
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>

</style>