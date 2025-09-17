<script setup>
import { AppState } from '@/AppState.js';
import CarForm from '@/components/CarForm.vue';
import CarListing from '@/components/CarListing.vue';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cars = computed(() => AppState.cars)

onMounted(() => {
  getCars()
})


async function getCars() {
  try {
    await carsService.getCars()
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT GET CARS', error)
  }
}
</script>


<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1 class="display-3">Cars</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <CarForm />
      </div>
    </div>
    <div class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-6 mb-3">
        <CarListing :carProp="car" />
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>