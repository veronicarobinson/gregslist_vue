<script setup>
import { AppState } from '@/AppState.js';
import CarForm from '@/components/CarForm.vue';
import CarListing from '@/components/CarListing.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const cars = computed(() => AppState.cars)
const account = computed(() => AppState.account)

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
    <!-- NOTE only show the form if i am logged in! -->
    <div v-if="account" class="row">
      <div class="col-12 my-2">
        <button class="btn btn-gregslist-green" data-bs-toggle="modal" data-bs-target="#car-form-modal" type="button">
          List Your Car
        </button>
        <!-- REVIEW moved to modal -->
        <!-- <CarForm /> -->
      </div>
    </div>
    <div class="row">
      <div v-for="car in cars" :key="car.id" class="col-md-6 mb-3">
        <CarListing :carProp="car" />
      </div>
    </div>
  </div>
  <!-- NOTE if your props have string data types, you do not need to 'bind' the attribute -->
  <ModalWrapper modalId="car-form-modal" modalTitle="Create Car">
    <!-- NOTE this CarForm SLOTS into the slot tag of the ModalWrapper -->
    <CarForm />
  </ModalWrapper>
</template>


<style lang="scss" scoped></style>