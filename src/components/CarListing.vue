<script setup>
import { Car } from '@/models/Car.js';

defineProps({
  carProp: { type: Car, required: true }
})

</script>


<template>
  <div class="shadow-lg position-relative car-border" :style="{ borderColor: carProp.color }">
    <img :src="carProp.imgUrl" :alt="`${carProp.year} ${carProp.make} ${carProp.model}`" class="car-img">
    <div class="p-3">
      <div class="d-flex justify-content-between align-items-start">
        <p class="fs-4 fw-bold">{{ carProp.year }} {{ carProp.make }} {{ carProp.model }}</p>
        <small>{{ carProp.createdAt.toLocaleDateString() }}</small>
      </div>
      <p>{{ carProp.description }}</p>
      <p>{{ carProp.engineType }} engine</p>
      <div class="d-flex justify-content-end">
        <div class="text-center">
          <img :src="carProp.creator.picture" :alt="'A picture of ' + carProp.creator.name" class="creator-img">
          <span class="d-block">{{ carProp.creator.name }}</span>
        </div>
      </div>
    </div>

    <kbd class="position-absolute top-0 end-0 m-2 text-gregslist-green">
      {{ '$' + carProp.price.toLocaleString() }}
    </kbd>
  </div>
</template>


<style lang="scss" scoped>
.car-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.car-border {
  border-width: 10px;
  border-style: groove;
}

.creator-img {
  height: 100px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
}
</style>