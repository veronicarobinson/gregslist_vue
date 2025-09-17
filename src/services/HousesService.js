import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { House } from "@/models/House.js"
import { AppState } from "@/AppState.js"

class HousesService {

    async getHouses() {
        // logger.log('hello')
        const response = await api.get('api/houses')
        logger.log('GOT HOUSES 🏠', response.data)
        const houses = response.data.map(pojo => new House(pojo))
        AppState.houses = houses
    }

    async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        logger.log('CREATED HOUSE', response.data)
        const house = new House(response.data)
        AppState.houses.push(house)
    }
    async deleteHouse(houseId) {
        const response = await api.delete(`api/houses/${houseId}`)
        logger.log('DELETED CAR ❌', response.data)
        const index = AppState.houses.findIndex(house => house.id == houseId)
        AppState.houses.splice(index, 1)

    }
}
export const housesService = new HousesService()