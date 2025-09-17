<script setup>
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';

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
  <h1>Cars Page</h1>
</template>


<style lang="scss" scoped></style>