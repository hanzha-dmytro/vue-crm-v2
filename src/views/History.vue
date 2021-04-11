<template>
    <div>
        <div class="page-title">
            <h3>{{ 'History_Title' | localize }}</h3>
        </div>

        <Loader v-if="loading" />

        <p class="center" v-else-if="!records.length">
            {{ 'History_NoRecords' | localize }}
            <router-link to="/record">{{ 'History_AddFirst' | localize }}</router-link>
        </p>

        <section v-else>
            <Chart :records="records" :categories="categories"/>

            <Table :records="items" />

            <Paginate
                v-model="page"
                :page-count="pageCount"
                :click-handler="pageChangeHandler"
                :prev-text="'Paginate_Prev' | localize"
                :next-text="'Paginate_Next' | localize"
                :container-class="'pagination'"
                :page-class="'waves-effect'"
            />
        </section>
    </div>
</template>

<script>
    import paginationMixin from '../mixins/pagination.mixin'
    import Table from '../components/history/Table'
    import Chart from '../components/history/Chart'
    import { Pie } from 'vue-chartjs'
    import localizeFilter from '../filters/localize.filter'

    export default {
        name: 'history',
        extends: Pie,
        mixins: [paginationMixin],
        metaInfo() {
            return {
                title: this.$title('History_Title')
            }
        },
        data: () => ({
            records: [],
            categories: [],
            loading: true
        }),
        async mounted() {
            this.records = await this.$store.dispatch('fetchRecords')
            this.categories = await this.$store.dispatch('fetchCategories')

            this.setupPagination(this.records.map(record => {
                return {
                    ...record,
                    category: this.categories.find(category => category.id === record.categoryId).name,
                    typeClass: record.type === 'income' ? 'green' : 'red',
                    typeText: record.type === 'income' ?  localizeFilter('History_Income') : localizeFilter('History_Outcome'),
                }
            }))

            this.loading = false
        },
        components: {
            Table, Chart
        }
    }
</script>

