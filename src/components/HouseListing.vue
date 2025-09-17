<script setup>
import { AppState } from '@/AppState.js';
import { House } from '@/models/House.js';
import { housesService } from '@/services/HousesService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)

const props = defineProps({
    houseProp: { type: House, required: true}
})

async function deleteHouse(){
    const confirmed = await Pop.confirm(
        `Are you sure you want to delete your listing?`,
        'This can not be undone once deleted',
        'Delete',
        'Go Back'
    )

    if(!confirmed){
        return
    }


    try {
    await housesService.deleteHouse(props.houseProp.id)
    Pop.success('YOUR HOUSE WAS SUCCESSFULLY DELETED')
    }
    catch (error){
    Pop.error(error);
    logger.log('COULD NOT DELETE HOUSE', error)
    }

}

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
        <div class="p-3 description-area">

            <p>{{ houseProp.description }}</p>
        </div>
        <div class="p-3">
            <div class="d-flex justify-content-between align-items-end">
                <button v-if="account?.id == houseProp.creatorId" @click="deleteHouse()" class="btn btn-outline-danger" type="button">
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