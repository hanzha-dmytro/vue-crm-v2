<template>
    <form class="card auth-card" @submit.prevent="onSubmit">
        <div class="card-content">
            <span class="card-title">{{ 'AppName' | localize }}</span>
            <div class="input-field">
                <input
                    id="email"
                    type="text"
                    v-model.trim="email"
                    :class="{invalid: $v.email.$error}"
                >
                <label for="email">{{ 'Register_Email' | localize }}</label>
                <small
                    v-if="$v.email.$dirty && !$v.email.required"
                    class="helper-text invalid"
                >{{ 'Register_EmailRequired' | localize }}
                </small>
                <small
                    v-if="$v.email.$dirty && !$v.email.email"
                    class="helper-text invalid"
                >{{ 'Register_EmailValidation' | localize }}
                </small>
            </div>
            <div class="input-field">
                <input
                    id="password"
                    type="password"
                    v-model.trim="password"
                    :class="{invalid: $v.password.$error}"
                >
                <label for="password">{{ 'Register_Password' | localize }}</label>
                <small
                        v-if="$v.password.$dirty && !$v.password.required"
                        class="helper-text invalid"
                >{{ 'Register_PasswordRequired' | localize }}
                </small>
                <small
                    v-if="$v.password.$dirty && !$v.password.minLength"
                        class="helper-text invalid"
                >{{ 'Register_PasswordMinLength' | localize }}
                </small>
            </div>
            <div class="input-field">
                <input
                    id="name"
                    type="text"
                    v-model.trim="name"
                     :class="{invalid: $v.name.$error}"
                >
                <label for="name">{{ 'Register_Name' | localize }}</label>
                <small
                        v-if="$v.name.$dirty && !$v.name.required"
                        class="helper-text invalid"
                >{{ 'Register_NameRequired' | localize }}
                </small>
                <small
                    v-if="$v.name.$dirty && !$v.name.minLength"
                    class="helper-text invalid"
                >{{ 'Register_NameMinLength' | localize }}
                </small>
            </div>
            <p>
                <label>
                    <input type="checkbox" v-model="agree" />
                    <span>{{ 'Register_AgreeWithRules' | localize }}</span>
                </label>
            </p>
            <small
                    v-if="$v.agree.$dirty && !$v.agree.checked"
                    class="helper-text invalid"
            >{{ 'Register_AgreeWithRulesRequired' | localize }}
            </small>
        </div>
        <div class="card-action">
            <div>
                <button class="btn waves-effect waves-light auth-submit" type="submit">
                    {{ 'Register_Submit' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </div>
            <p class="center">
                {{ 'Register_Registered' | localize }}
                <router-link to="/login">{{ 'Register_Login' | localize }}</router-link>
            </p>
        </div>
    </form>
</template>

<script>
    import {email, required, minLength} from 'vuelidate/lib/validators'

    export default {
        name: "register",
        metaInfo() {
            return {
                title: this.$title('Register_Title')
            }
        },
        data: () => ({
            email: '',
            password: '',
            name: '',
            agree: false
        }),
        validations: {
            email: {email, required},
            password: {required, minLength: minLength(6)},
            name: {required, minLength: minLength(3)},
            agree: {checked: v => v}
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }

                try {
                    await this.$store.dispatch('register', formData)
                    this.$router.push('/')
                } catch (e) {}
            }
        }
    }
</script>

<style scoped>

</style>