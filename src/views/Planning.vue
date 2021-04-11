<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Planning_Title' | localize }}</h3>
            <h4>{{ info.bill | currency('RUB') }}</h4>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!categories.length">{{ 'Planning_NoCategories' | localize }} <router-link to="/categories">{{ 'Planning_CreateNewCategory' | localize }}</router-link></p>

        <section v-else>
            <div v-for="category of categories" :key="category.id">
                <p>
                    <strong>{{ category.name }}:</strong>
                    {{ category.spend | currency }} {{ 'Planning_of' | localize }} {{ category.limit | currency }}
                </p>
                <div class="progress" v-tooltip="category.tooltip">
                    <div
                        class="determinate"
                        :class="category.color"
                        :style="{width: category.progress + '%'}"
                    ></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import currencyFilter from '@/filters/currency.filter'
    import localizeFilter from '../filters/localize.filter'
    export default {
        name: "planning",
        metaInfo() {
            return {
                title: this.$title('Planning_Title')
            }
        },
        data: () => ({
            categories: [],
            loading: true
        }),
        computed: {
            ...mapGetters(['info'])
        },
        async mounted() {
            const records = await this.$store.dispatch('fetchRecords')
            const categories = await this.$store.dispatch('fetchCategories')

            this.categories = categories.map(category => {

                const spend = records
                    .filter(record => record.categoryId === category.id)
                    .filter(record => record.type === 'outcome')
                    .reduce((total, record) => {
                        return total += +record.amount
                    }, 0)

                const percent = (100 * spend / category.limit)
                const progress = percent > 100 ? 100 : percent
                const color = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
                const value = category.limit - spend
                const tooltip = `${value < 0 ? localizeFilter('Planning_excess') : localizeFilter('Planning_left')}  ${currencyFilter(Math.abs(value))}`


                return { ...category, spend, progress, color, tooltip}
            })

            this.loading = false
        }
    }
</script>