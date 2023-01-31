<script setup="">
// core
import { ref } from "vue"

// pinia
import { useCarStore } from '../stores/cars'
// store
const { filterCars, resetCarsStore, filterBrand } = useCarStore()

// search Btn
const searchBtn = ref( false )

// bindings v-model
const brand = ref( '' )
const model = ref( '' )
const year = ref( '' )
const price = ref( '' )


// selects
const brands = ref( [ 'BMW', 'MERCEDES-BENZ' ] )
const models = ref( [ 'series-3', 'series-5', 'series-7', 'class-c', 'class-e', 'class-s' ] )
const years = ref( [ '2020', '2021', '2022', '2023' ] )
const prices = ref( [ '50000', '70000', '80000', '100000' ] )
const usedORNew = ref( 0 )
//


// submit form
const submitForm = () => {
	searchBtn.value = true

	const car = {
		brand: brand.value,
		model: model.value,
		year: Number(year.value),
		price: Number(price.value),
		usedORNew: usedORNew.value === '1'
	}
	if (brand.value !== '' && model.value !== '' && year.value !== '' && price.value !== '') {
		console.log( car );
		filterCars( car )
	}	else if (brand.value !== '') {
		filterBrand(car)
	}

	searchBtn.value = false
}

//
const resetCars = async ()=> {
	brand.value = ''
	model.value = ''
	year.value = ''
	price.value = ''
	usedORNew.value = 0
	await resetCarsStore()
}
//
</script>


<template>
	<v-row justify="center" align="center">
		<v-col>
			<v-form @submit.prevent="submitForm">
				<v-card class="pa-6 mt-12 d-flex flex-wrap justify-center align-center">
					<div style="width: 50%;">
						<v-select
									v-model="brand"
									color="red darken-1"
									clearable
									label="Brand"
									:items="brands"
						></v-select>
					</div>
					<div style="width: 50%;">
						<v-select
									v-model="model"
									color="blue darken-3"
									clearable
									label="Model"
									:items="models"
						></v-select>
					</div>
					<div style="width: 50%;">
						<v-select
									v-model="year"
									color="orange accent-4"
									clearable
									label="Year"
									:items="years"
						></v-select>
					</div>

					<div style="width: 50%;">
						<v-select
									v-model="price"
									color="green darken-1"
									clearable
									label="Price"
									:items="prices"
						></v-select>
					</div>

					<v-radio-group inline v-model="usedORNew">
						<v-radio label="new" value="1" color="light-blue darken-3"></v-radio>
						<v-radio label="used" value="2" color="light-blue darken-3"></v-radio>
					</v-radio-group>

					<v-divider/>
					<v-btn
								class="mt-5"
								type="submit"
								:loading="searchBtn"
					>
						<v-icon icon="fa fa-search"/>
						Search
					</v-btn>
					<v-btn
								class="mt-5"
								@click="resetCars"
					>
						<v-icon icon="fa fa-rotate-left"/>
						Reset
					</v-btn>
				</v-card>


			</v-form>
		</v-col>
	</v-row>

</template>


<style lang="scss" scoped>

</style>
