<template>
    <div>
        <div class="page-title">
            <h3>{{ 'Category_Title' | localize }}</h3>
        </div>
        <section>
            <loader v-if="loading" />
            <div class="row" v-else>
                <create @created="addNewCategory"/>
                <update
                    v-if="categories.length"
                    :categories="categories"
                    @updated="updateCategories"
                    :key="categories.length + updateCount"
                />
                <p v-else class="center">{{ 'Category_NoCategories' | localize }}</p>
            </div>
        </section>
    </div>
</template>

<script>
    import Create from "../components/category/Create";
    import Update from "../components/category/Update";

    export default {
        name: "Categories.vue",
        metaInfo() {
            return {
                title: this.$title('Profile_Title')
            }
        },
        data: () => ({
            categories: [],
            loading: true,
            updateCount: 0
        }),
        async mounted() {
            this.categories = await this.$store.dispatch('fetchCategories')
            this.loading = false
        },
        components: {Update, Create},
        comments: {
            Create, Update
        },
        methods: {
            addNewCategory(category) {
                this.categories.push(category)
            },
            updateCategories(category) {
                const idx = this.categories.findIndex(cat => cat.id === category.id)
                this.categories[idx].name = category.name
                this.categories[idx].limit = category.limit
                this.updateCount++
            }

        }
    }
</script>