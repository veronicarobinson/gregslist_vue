<script setup>
import { AppState } from '@/AppState.js';
import { Car } from '@/models/Car.js';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)

// NOTE if you want access to props within the script tag, you must create a variable for it
const props = defineProps({
  carProp: { type: Car, required: true },
})

async function deleteCar() {
  const confirmed = await Pop.confirm(
    `Are you sure you want to delete your ${props.carProp.make} ${props.carProp.model}?`,
    'It will be gone forever',
    'Yes I am sure',
    'Wait I am not so sure'
  )

  if (!confirmed) {
    return
  }

  try {
    logger.log('Delete that car', props.carProp.id);
    await carsService.deleteCar(props.carProp.id)
    Pop.success('Your car was successfully deleted!')
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT DELETE CAR', error)
  }

}

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
      <div class="d-flex justify-content-between align-items-end">
        <div>
          <!-- NOTE only show this button if the logged in user created the car -->
          <button v-if="account?.id == carProp.creatorId" @click="deleteCar()" class="btn btn-outline-danger"
            type="button">
            Delete
          </button>
        </div>
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