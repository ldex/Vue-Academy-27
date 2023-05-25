<template>
    <div>
        <section v-if="error">
            {{ error.message }}
        </section>
        <section v-else>
            <div v-if="loading">
                <h2 class="loading">Loading</h2>
            </div>
            <div v-else>
                <h2>{{ product.name }}</h2>
                <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200"
                    style="float:right" />
                <h3>{{ product.description }}</h3>
                <p>Price: {{ product.price }}</p>
                <p>Fixed price? {{ product.fixedPrice }}</p>
                <p>Discontinued? {{ product.discontinued }}</p>
                <p>Modified date: {{ product.modifiedDate }}</p>
                <p>
                    <button @click="confirmDelete">Delete</button>
                </p>
            </div>
        </section>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            error: null,
            loading: false
        }
    },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    computed: {
        ...mapState(['product']), // map `this.product` to `this.$store.state.product`
    },
    created() {
        this.fetchProduct(this.id);
    },
    methods: {
        ...mapActions(['fetchProduct', 'deleteProduct']), // map `this.fetchProduct(this.id)` to `this.$store.dispatch('fetchProduct', this.id)`
        confirmDelete() {
            if (window.confirm('Are you sure ?')) {
                this.deleteProduct(this.product)
                    .then(
                        () => this.$router.push({ name: 'products' })
                    )
                    .catch(
                        error => {
                            console.error(error.message);
                            this.$router.push({ name: 'error' });
                        }
                    )
            }
        }
    }
}
</script>

<style lang="css" scoped></style>