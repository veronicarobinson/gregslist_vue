import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { House } from "@/models/House.js"
import { AppState } from "@/AppState.js"

class HousesService {
    async createHouse(houseData) {
        const response = await api.post('api/houses', houseData)
        logger.log('CREATED HOUSE', response.data)
        const house = new House(response.data)
        AppState.houses.push(house)
    }

    async getHouses() {
        // logger.log('hello')
        const response = await api.get('api/houses')
        logger.log('GOT HOUSES 🏠', response.data)
        const houses = response.data.map(pojo => new House(pojo))
        AppState.houses = houses
    }

}
export const housesService = new HousesService()