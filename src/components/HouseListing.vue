<script setup>
import { House } from '@/models/House.js';

defineProps({
    houseProp: { type: House, required: true}
})
</script>


<template>
    <div class="shadow-lg position-relative border card">
        <img :src="houseProp.imgUrl" alt="Listings House Image" class="house-card-img">
        <div class="p-3">
            <div class="d-flex justify-content-between align-items-start">
                <span>bedrooms {{ houseProp.bedrooms }} / bathrooms {{ houseProp.bathrooms }}</span>
                <small>{{ houseProp.createdAt.toLocaleDateString() }}</small>
            </div>
        </div>
        <!-- <div class="p-3 description-area">

            <p>{{ houseProp.description }}</p>
        </div> -->
        <div class="p-3">
            <div class="d-flex justify-content-between align-items-end">
                <button class="btn btn-outline-danger">
                    delete
                </button>
            </div>
        </div>
    </div>

HouseListing
</template>


<style lang="scss" scoped>
.house-card-img{
    width: 100%;
    height: 200px;
    object-fit: contain;
    object-position: center;
}


</style>