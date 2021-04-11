<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{ 'Category_Create' | localize }}</h4>
            </div>

            <form @submit.prevent="onSubmit">
                <div class="input-field">
                    <input
                        id="name"
                        type="text"
                        v-model.trim="name"
                        :class="{invalid: $v.name.$error}"
                    >
                    <label for="name">{{ 'Category_Name' | localize }}</label>
                    <small
                            v-if="$v.name.$dirty && !$v.name.required"
                            class="helper-text invalid"
                    >{{ 'Category_NameRequired' | localize }}
                    </small>
                </div>

                <div class="input-field">
                    <input
                        id="limit"
                        type="number"
                        v-model.trim="limit"
                        :class="{invalid: $v.limit.$error}"
                    >
                    <label for="limit">{{ 'Category_Limit' | localize }}</label>
                    <small
                            v-if="$v.limit.$dirty && !$v.limit.required"
                            class="helper-text invalid"
                    >{{ 'Category_LimitRequired' | localize }}
                    </small>
                    <small
                            v-if="$v.limit.$dirty && !$v.limit.minValue"
                            class="helper-text invalid"
                    >{{ 'Category_LimitMinValue' | localize }}
                    </small>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{ 'Category_Create' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from 'vuelidate/lib/validators'

    export default {
        name: "Create",
        data: () => ({
            name: '',
            limit: 1000
        }),
        validations: {
            name: {required},
            limit: {required, minValue: minValue(1)}
        },
        mounted() {
            M.updateTextFields()
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    const category = await this.$store.dispatch('createCategory', {
                        name: this.name,
                        limit: this.limit
                    })
                    this.name = ''
                    this.limit = 1000
                    this.$v.$reset()
                    this.$message('Категория была создана')
                    this.$emit('created', category)
                } catch (e) {}
            }
        }
    }
</script>
