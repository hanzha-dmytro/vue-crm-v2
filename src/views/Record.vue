<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Record_Title' | localize }}</h3>
        </div>

        <loader v-if="loading" />

        <p class="center" v-else-if="!categories.length">{{ 'Record_NoCategories' | localize }} <router-link to="/categories">{{ 'Record_CreateNewCategory' | localize }}</router-link></p>

        <form class="form" @submit.prevent="onSubmit" v-else>
            <div class="input-field" >
                <select ref="select" v-model="category">
                    <option
                        v-for="category of categories"
                        :ke="category.id"
                        :value="category.id"
                    >{{ category.name }}</option>
                </select>
                <label>{{ 'Record_ChooseCategory' | localize }}</label>
            </div>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="income"
                        v-model="type"
                    />
                    <span>{{ 'Record_Income' | localize }}</span>
                </label>
            </p>

            <p>
                <label>
                    <input
                        class="with-gap"
                        name="type"
                        type="radio"
                        value="outcome"
                        v-model="type"
                    />
                    <span>{{ 'Record_Outcome' | localize }}</span>
                </label>
            </p>

            <div class="input-field">
                <input
                        id="amount"
                        type="number"
                        v-model.number="amount"
                >
                <label for="amount">{{ 'Record_Amount' | localize }}</label>
                <small
                        v-if="$v.amount.$dirty && !$v.amount.minValue"
                        class="helper-text invalid"
                >{{ 'Record_AmountMinValue' | localize }}</small>
            </div>

            <div class="input-field">
                <input
                        id="description"
                        type="text"
                        v-model="description"
                >
                <label for="description">{{ 'Record_Description' | localize }}</label>
                <small
                        v-if="$v.description.$dirty && !$v.description.required"
                        class="helper-text invalid"
                >{{ 'Record_DescriptionRequired' | localize }}</small>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'Record_Create' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
    import {required, minValue} from "vuelidate/lib/validators";
    import {mapGetters} from 'vuex'
    import localizeFilter from '../filters/localize.filter'

    export default {
        name: "record",
        metaInfo() {
            return {
                title: this.$title('Record_Title')
            }
        },
        data: () => ({
            categories: [],
            type: "outcome",
            amount: 1,
            description: '',
            loading: true,
            select: null,
            category: null
        }),
        validations: {
            amount: {required, minValue: minValue(1)},
            description: {required}
        },
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false

            if(this.categories.length) {
                this.category = this.categories[0].id
            }

            setTimeout(() => {
                M.updateTextFields()
                this.select = M.FormSelect.init(this.$refs.select);
            }, 0)

        },
        destroyed() {
            if(this.select && this.select.destroy) {
                this.select.destroy()
            }
        },
        computed: {
            ...mapGetters(['info']),
            canCreateRecord() {
                if(this.type === 'income') {
                    return true
                }

                return this.info.bill >= this.amount
            }
        },
        methods: {
            async onSubmit() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }

                if (this.canCreateRecord) {
                    try {
                        await this.$store.dispatch('createRecord', {
                            categoryId: this.category,
                            amount: this.amount,
                            description: this.description,
                            type: this.type,
                            date: new Date().toJSON()
                        })

                        const bill = this.type === 'income'
                            ? this.info.bill + this.amount
                            : this.info.bill - this.amount

                        await this.$store.dispatch('updateInfo', {bill})
                        this.$message(localizeFilter('Record_CreateSuccessfully'))
                        this.$v.$reset()
                        this.amount = 1
                        this.description = ''
                    } catch (e) {}
                } else {
                    this.$message(`${localizeFilter('Record_NotEnoughMoney')} (${this.amount - this.info.bill})`)
                }
            }
        }
    }
</script>

<style scoped>

</style>