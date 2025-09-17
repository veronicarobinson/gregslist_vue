<script setup>
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const editableHouseData = ref({
    bedrooms: '',
    bathrooms: '',
    levels: '',
    imgUrl: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
})

async function createHouse() {
    try {
    await housesService.createHouse(editableHouseData.value)
    // CLEARS OUT FORM
    editableHouseData.value = {
    bedrooms: '',
    bathrooms: '',
    levels: '',
    imgUrl: '',
    year: new Date().getFullYear(),
    price: 0,
    description: '',
}
    }
    catch (error){
    Pop.error(error)
    logger.log('COULD NOT CREATE HOUSE', error)
    }
}
</script>


<template>
<form @submit.prevent="createHouse()" class="container-fluid my-3">
    <div class="row justify-content-between">
        <div class="col-md-6">
            <div>
                <label for="house-description" class="form-label">House Description</label>
                <textarea v-model="editableHouseData.description" id="house-description" maxlength="250" placeholder="House Description" class="form-control"></textarea>
            </div>
        </div>
        <div class="col-md-6">
            <label for="house-bedrooms" class="form-label">Bedrooms</label>
            <input type="text">
        </div>
        <div class="col-md-6">
            <label for="house-bathrooms" class="form-label">Bathrooms</label>
            <input type="text">
        </div>
        <div class="col-md-6">
            <label for="house-year" class="form-label">Year Built</label>
            <input type="text">
        </div>
        <div class="col-md-6">
            <label for="house-price" class="form-label">Price</label>
            <input type="text">
        </div>
        <div class="row justify-content-between align-content-center">
            <div class="col-md-6">
                <label for="house-img-url" class="form-label">House Image URL</label>
                <input id="house-img-url" class="form-control" type="url" required maxlength="1000">
                <small>Image Preview</small>
                    <img v-if="editableHouseData.imgUrl" :src="editableHouseData.imgUrl" alt="Your Image" class="img-preview">
                    <img v-else src="https://placehold.co/600x400?font=roboto&text=Your+Image" alt="PlaceHolder Img" class="img-preview">
            </div>

    </div>


    <div class="col-12">
        <button class="btn btn-gregslist-green" type="submit">
            submit
        </button>
    </div>
</div>

</form>
</template>


<style lang="scss" scoped>

.img-preview{
    width: 100%;
    height: 100px;

}


</style>