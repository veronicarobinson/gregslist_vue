<script setup>
import { carsService } from '@/services/CarsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';


const engineTypes = [
  'unknown',
  '2 stroke',
  '4 cylinder',
  'v6',
  'v8',
  'v10',
  'v12',
  'small',
  'medium',
  'large',
  'chuncko',
]

const editableCarData = ref({
  make: '',
  model: '',
  year: new Date().getFullYear(),
  description: '',
  price: 0,
  color: '',
  engineType: '',
  imgUrl: ''
})

async function createCar() {
  try {
    logger.log('Create the car!')
    // NOTE .value is what is stored INSIDE of the ref object
    await carsService.createCar(editableCarData.value)
    // clears form
    editableCarData.value = {
      make: '',
      model: '',
      year: new Date().getFullYear(),
      description: '',
      price: 0,
      color: '',
      engineType: '',
      imgUrl: ''
    }
  } catch (error) {
    Pop.error(error)
    logger.error('COULD NOT CREATE CAR', error)
  }
}

</script>


<template>
  <form @submit.prevent="createCar()" class="container-fluid my-3">
    <div class="row">
      <div class="col-md-6">
        <label for="car-make" class="form-label">Car Make</label>
        <input v-model="editableCarData.make" id="car-make" class="form-control" type="text" required minlength="3"
          maxlength="500">
      </div>
      <div class="col-md-6">
        <label for="car-model" class="form-label">Car Model</label>
        <input v-model="editableCarData.model" id="car-model" class="form-control" type="text" required minlength="1"
          maxlength="500">
      </div>
      <div class="col-md-6">
        <label for="car-year" class="form-label">Car Year</label>
        <input v-model="editableCarData.year" id="car-year" class="form-control" type="number" required min="1885"
          :max="new Date().getFullYear() + 1">
      </div>
      <div class="col-md-6">
        <label for="car-price" class="form-label">Car Price</label>
        <input v-model="editableCarData.price" id="car-price" class="form-control" type="number" required min="0"
          max="1000000">
      </div>
      <div class="col-12">

      </div>

      <div class="col-md-6">
        <label for="car-img-url" class="form-label">Car ImgUrl</label>
        <input v-model="editableCarData.imgUrl" id="car-img-url" class="form-control" type="url" required
          maxlength="1000">
        <small>Image preview</small>
        <img v-if="editableCarData.imgUrl" :src="editableCarData.imgUrl" alt="Your car image" class="img fluid w-100">
        <img v-else src="https://placehold.co/600x400/EEE/31343C" alt="Placeholder image" class="img-fluid w-100">
      </div>
      <div class="col-md-6 ">
        <div class="d-flex gap-4">
          <div>
            <label for="car-color" class="form-label">Car Color</label>
            <input v-model="editableCarData.color" id="car-color" type="color" class="form-control form-control-color">
          </div>
          <div class="flex-grow-1">
            <label for="car-engine-type" class="form-label">Select an engine type</label>
            <select v-model="editableCarData.engineType" id="car-engine-type" class="form-control">
              <option value="" disabled>Select an engine please</option>
              <option v-for="engineType in engineTypes" :key="engineType" :value="engineType">
                {{ engineType }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <label for="car-description" class="form-label">Car Description</label>
          <textarea v-model="editableCarData.description" id="car-description" maxlength="500"
            placeholder="Describe your car!" class="form-control"></textarea>
        </div>
      </div>
      <div class="col-12 mt-3 text-end">
        <button class="btn btn-gregslist-green" type="submit">
          Submit
        </button>
      </div>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>