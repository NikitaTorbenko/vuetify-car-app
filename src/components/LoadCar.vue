<script setup="">
// core
import { computed, ref } from "vue"

// store
import { useCarStore } from '../stores/cars'
const { loadCar } = useCarStore()

// bindings v-model
const brand = ref( '' )
const model = ref( '' )
const year = ref( '' )
const price = ref( '' )
const carImage = ref( '' )
// const loadBtn = ref( true )
const loadCarForm = ref( null )

// selects
const brands = ref( [ 'BMW', 'MERCEDES-BENZ', 'Audi', 'Mazda' ] )
const models = ref( [ 'series-3', 'series-5', 'series-7', 'class-c', 'class-e', 'class-s' ] )
const years = ref( [ '2018', '2019', '2020', '2021', '2022', '2023' ] )
const usedORNew = ref( 0 )

// image load
const upLoadFile = ( { target } ) => {
	const image = target.files[ 0 ]
	const reader = new FileReader()
	reader.readAsDataURL( image )
	reader.onload = e => {
		carImage.value = e.target.result
		// console.log( e.target.result )
	}
}

// submit form
const submitLoadForm = async () => {
	const car = {
		id: Math.floor( Math.random() * 8467586475645 ),
		brand: brand.value,
		model: model.value,
		year: year.value,
		price: Number( price.value ),
		new: usedORNew.value == "1" ? true : false,
		image: carImage.value
	}
	await loadCar( car )

	loadCarForm.value.reset();
	clearForm()
}

// disable button load car
const loadBtnComp = computed( () => {
	return brand.value === '' || model.value === '' ||
				year.value === '' || price.value === 0 || carImage.value === '';
} )
// reset values
function clearForm() {
	brand.value = ''
	model.value = ''
	year.value = ''
	price.value = 0
}

</script>


<template>
	<v-row justify="center" align="center">
		<v-col>
			<v-form @submit.prevent="submitLoadForm" ref="loadCarForm">
				<v-card class="pa-6 mt-12 d-flex flex-wrap justify-start align-center">
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
						<v-text-field
									v-model.number="price"
									label="Price"
									clearable
						/>
					</div>

					<v-radio-group inline v-model="usedORNew">
						<v-radio label="new" value="1" color="light-blue darken-3"></v-radio>
						<v-radio label="used" value="2" color="light-blue darken-3"></v-radio>
					</v-radio-group>
					<v-divider/>
					<div style="width: 50%; margin-top: 20px">
						<v-file-input
									@change="upLoadFile"
									variant="underlined"
									prepend-icon="fa fa-file"
									density="compact"
									clearable
									label="select file"

						/>
					</div>
					<v-divider/>
					<v-btn
								class="mt-5"
								type="submit"
								:disabled="loadBtnComp"
					>
						Load car
						<v-icon end icon="fa fa-cloud-arrow-up"/>
					</v-btn>

				</v-card>


			</v-form>
		</v-col>
	</v-row>
</template>


<style lang="scss" scoped>

</style>
