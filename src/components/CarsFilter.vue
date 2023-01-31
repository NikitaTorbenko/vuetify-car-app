<script setup="">
//core
import {ref} from 'vue'

// store
import {useCarStore} from '../stores/cars'
const {filterPrice} = useCarStore()
//
const filterCars = ref(['Price Up', 'Price Down'])
const choiceFilter = ref('')
const filerChange = ()=> {
	filterPrice(choiceFilter.value)
}
</script>


<template>
	<v-card class="pa-6 d-flex justify-start align-center">
		<v-card width="200" flat>
			<v-select
						label="Price"
						:items="filterCars"
						v-model="choiceFilter"
						@update:modelValue="filerChange"
			/>
		</v-card>
	</v-card>
</template>


<style lang="scss" scoped>

</style>

