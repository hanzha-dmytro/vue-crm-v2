<template>

    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4> {{ 'Category_Edit' | localize }} </h4>
            </div>

            <form @submit.prevent="onSubmit">
                <div class="input-field">
                    <select ref="select" v-model="current">
                        <option
                            v-for="category of categories"
                            :ke="category.id"
                            :value="category.id"
                        >{{ category.name }}</option>
                    </select>
                    <label>{{ 'Category_ChooseCategory' | localize }}</label>
                </div>

                <div class="input-field">
                    <input
                        type="text"
                        id="name"
                        v-model.trim="name"
                        :class="{invalid: $v.name.$error}"
                    >
                    <label for="name">{{ 'Category_Name' | localize }}</label>
                    <small
                            v-if="$v.name.$dirty && !$v.name.required"
                            class="helper-text invalid"
                    >{{ 'Category_NameRequired' | localize }}</small>
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
                    {{ 'Category_Update' | localize }}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
    import {required, minValue} from "vuelidate/lib/validators";

    export default {
        name: "update",
        props: {
            categories: {
                type: Array,
                required: true
            }
        },
        data: () => ({
            name: '',
            limit: 1,
            select: null,
            current: null
        }),
        validations: {
            name: {required},
            limit: {required, minValue: minValue(1)}
        },
        watch: {
            current(catId) {
                const {name, limit} = this.categories.find(category => category.id === catId)
                this.name = name
                this.limit = limit
            }
        },
        created() {
            const {id, name, limit} = this.categories[0]
            this.current = id
            this.name = name
            this.limit = limit
        },
        mounted() {
            M.updateTextFields()
            this.select = M.FormSelect.init(this.$refs.select);
        },
        destroyed() {
            if(this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                try {
                    await this.$store.dispatch('updateCategory', {
                        id: this.current,
                        name: this.name,
                        limit: this.limit
                    })
                    this.$emit('updated', {
                        id: this.current,
                        name: this.name,
                        limit: this.limit
                    })
                    this.$message('Категория успешно обновлена')
                } catch (e) {}
            }
        }
    }
</script>
