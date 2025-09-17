<script setup>
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';

const editableHouseData = ref({
    bedrooms: 0,
    bathrooms: 0,
    levels: 0,
    imgUrl: '',
    year: new Date().getFullYear(),
    price: '',
    description: '',
})

async function createHouse() {
    try {
        await housesService.createHouse(editableHouseData.value)
        // CLEARS OUT FORM
        editableHouseData.value = {
            bedrooms: 0,
            bathrooms: 0,
            levels: 0,
            imgUrl: '',
            year: new Date().getFullYear(),
            price: '',
            description: '',
        }

        Modal.getInstance('#house-form-modal').hide()
    }
    catch (error) {
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
                    <textarea v-model="editableHouseData.description" id="house-description" maxlength="250"
                        placeholder="House Description" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-md-6">
                <label for="house-bedrooms" class="form-label">Bedrooms</label>
                <input v-model="editableHouseData.bedrooms" id="house-bedrooms" type="number" class="form-control"
                    required min="0" max="50">
            </div>
            <div class="col-md-6">
                <label for="house-bathrooms" class="form-label">Bathrooms</label>
                <input v-model="editableHouseData.bathrooms" id="house-bathrooms" type="number" class="form-control"
                    required min="0" max="50">
            </div>
            <div class="col-md-6">
                <label for="house-year" class="form-label">Year Built</label>
                <input v-model="editableHouseData.year" id="house-year" type="number" class="form-control" required
                    min="1500" :max="new Date().getFullYear()">
            </div>
            <div class="col-md-6">
                <label for="house-price" class="form-label">Price</label>
                <input v-model="editableHouseData.price" id="house-price" type="number" class="form-control" required
                    min="0" max="1000000" placeholder="0">
            </div>
            <div class="row justify-content-between align-content-center">
                <div class="col-md-6">
                    <label for="house-img-url" class="form-label">House Image URL</label>
                    <input v-model="editableHouseData.imgUrl" id="house-img-url" class="form-control" type="url"
                        required maxlength="1000">
                    <small>Image Preview</small>
                    <img v-if="editableHouseData.imgUrl" :src="editableHouseData.imgUrl" alt="Your Image"
                        class="img-fluid img-preview">
                    <img v-else src="https://placehold.co/600x400?font=roboto&text=Your+Image" alt="PlaceHolder Img"
                        class="img-fluid">
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
.img-preview {
    width: 100%;
    height: 100px;
    object-fit: contain;
    object-position: center;

}
</style>