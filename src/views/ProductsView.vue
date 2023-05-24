<template>
  <div>
    <section v-if="error">
      {{ error.message }}
    </section>
    <section v-else>
      <div v-if="loading">
        <h2 class="loading">Loading products...</h2>
      </div>
        <product-list v-else :products="products" :page-size="5">
          <template v-slot="slotProps">
            <span>{{ slotProps.product.name }}</span> <span>({{ slotProps.product.price }}$)</span>
          </template>
        </product-list>

    </section>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import ProductService from '@/services/ProductService.js';

export default {
  name: 'app',
  components: {
    ProductList
  },
  data() {
    return {
      products: [],
      error: null,
      loading: false
    }
  },
  created() {
    this.loading = true;
    ProductService.getProducts()
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        this.error = error;
      })
      .finally(() => this.loading = false);
  },
  errorCaptured: function (error) {
    console.error('Error in component: ', error.message);
    return true;
  },
}
</script>

<style lang="css" scoped></style>