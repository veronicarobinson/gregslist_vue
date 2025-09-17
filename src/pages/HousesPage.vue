<script setup>
import { AppState } from '@/AppState.js';
import HouseForm from '@/components/HouseForm.vue';
import HouseListing from '@/components/HouseListing.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const houses = computed(()=> AppState.houses)
const account = computed(()=>AppState.account)

onMounted(() => {
    getHouses()
})

async function getHouses() {
    try {
        await housesService.getHouses()
    }
    catch (error){
        Pop.error(error);
        logger.error('COULD NOT GET HOUSES', error)
    }
}

</script>


<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1 class="display-3">Houses</h1>
            </div>
        </div>
        <!-- TODO -->
        <!-- SECTION ONLY LOG IN IF I AM LOGGED IN -->
        <div v-if="account" class="row">
            <div class="col-12 my-2">
                <button class="btn btn-gregslist-green" data-bs-toggle="modal" data-bs-target="#house-form-modal" type="button">
                    List Your House
                </button>

                <!-- NOTE copy and paste into HouseForm and move down to modal BELOW TODO COMMENT -->
                    <!-- <form class="container-fluid my-3">
                        <div class="row">
                            <div class="col">
                                <label>House Image URL</label>
                                <input id="house">
                            </div>
                            <div class="col"></div>
                        </div>
        
                    </form> -->
            </div>
        </div>
        
        <!-- SECTION House Listings -->
        <div class="row">
            <div v-for="house in houses" :key="house.id" class="col-md-6 mb-3">
                <HouseListing :houseProp="house"/> 
            </div>
        </div>
        
    </div>
    <!-- TODO -->
    <!-- SECTION House Form TO DO move to modal when completed -->

    <ModalWrapper modalId="house-form-modal" modalTitle="Create House">
        <HouseForm/>
    </ModalWrapper>
Houses Page
</template>


<style lang="scss" scoped>

</style>