<script setup="">
// core
import { computed } from "vue"
// router
import { useRouter } from 'vue-router'

const router = useRouter()

// pinia
import { storeToRefs } from 'pinia'
// store
import { useCarStore } from '../stores/cars'

const store = useCarStore()
const { carsForGet } = storeToRefs( store )

// start localStore
store.GetFromlocalStore()

// load cars from store
const carsComputed = computed( () => {

	// return carsForGet.value
	return carsForGet.value
} )

// cards
const viewDetails = (id) => {
	router.push({name: 'CarByID', params: {id: id}}) // /car/:id
}
// components
import CarsFilter from "./CarsFilter.vue"
</script>

<template>
	<v-container>
		<v-row>
			<v-col>
				<carsFilter/>
				<v-col class="d-flex justify-space-evenly align-content-start flex-wrap">
					<v-card width="450" v-for="car in carsComputed" elevation="10" class="pa-5 ma-2">
						<v-card-title>{{ car.brand }}</v-card-title>
						<v-card-subtitle>{{ car.model }}</v-card-subtitle>
						<v-img class="mt-2" :src="car.image" cover/>

						<v-card flat class="mt-4">
							<v-list>
								<v-list-item-title>Descriptions</v-list-item-title>
								<v-list-item>year {{ car.year }}</v-list-item>
								<v-list-item>price {{ car.price }}$</v-list-item>
								<v-list-item>type {{ car.new === true ? 'new' : 'used' }}</v-list-item>
								<v-divider/>
								<v-spacer/>
								<v-btn @click="viewDetails(car.id)">details</v-btn>
							</v-list>
						</v-card>
					</v-card>
				</v-col>
			</v-col>
		</v-row>
	</v-container>
</template>


<style lang="scss" scoped>

</style>


<!--<v-col class="d-flex justify-space-evenly align-content-start flex-wrap">-->
<!--<v-card width="450" v-for="car in carsComputed" elevation="10" class="pa-5 ma-2">-->
<!--	<v-card-title>{{ car.brand }}</v-card-title>-->
<!--	<v-card-subtitle>{{ car.model }}</v-card-subtitle>-->
<!--	<v-img class="mt-2" :src="car.image" cover/>-->

<!--	<v-card flat class="mt-4">-->
<!--		<v-list>-->
<!--			<v-list-item-title>Descriptions</v-list-item-title>-->
<!--			<v-list-item>year {{ car.year }}</v-list-item>-->
<!--			<v-list-item>price {{ car.price }}$</v-list-item>-->
<!--			<v-list-item>type {{ car.new === true ? 'new' : 'used' }}</v-list-item>-->
<!--			<v-divider/>-->
<!--			<v-spacer/>-->
<!--			<v-btn @click="viewDetails">details</v-btn>-->
<!--		</v-list>-->
<!--	</v-card>-->
<!--</v-card>-->
<!--</v-col>-->
