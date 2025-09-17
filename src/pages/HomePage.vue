<script setup>


</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <div class="text-center">
          <!-- TODO have this span router link to your own House and Cats Listings Page -->
<!-- SECTION HOUSES PAGE -------------------------------------------------->
          <RouterLink :to="{name: 'House Listings'}" title="Go to the House Listings Page">
            <span class="mdi mdi-home"></span>
          </RouterLink>
<!-- SECTION CARS PAGE ---------------------------------------------------->
          <RouterLink :to="{ name: 'Car Listings' }" title="Go to the Car Listings page!">
            <span class="mdi mdi-car"></span>
          </RouterLink>
<!-- SECTION PETS PAGE ---------------------------------------------------->
          <span class="mdi mdi-cat"></span>
          <h1 class="display-1">Gregslist</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: unset;
  transition: color 200ms ease-in-out;
}

a:hover {
  color: var(--bs-gregslist-green);
}

.mdi {
  font-size: 12rem;
}
</style>
