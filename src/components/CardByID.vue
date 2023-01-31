<script setup="">
// core
import { computed } from 'vue'
// store
import { useCarStore } from '../stores/cars'

const { findByID } = useCarStore()

const car = computed( () => {
	return findByID( Number( route.params.id ) )
} )

// router
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()


const back = () => {
	router.push( { name: 'Cars' } )
}

</script>


<template>
	<v-container>
		<v-row>
			<v-col class="d-flex justify-center align-center">
				<v-card class="pa-5" flat width="800">
					<v-card-title>{{ car.brand }}</v-card-title>
					<v-card-subtitle>{{ car.model }}</v-card-subtitle>
					<v-img
								class="mt-4"
								:src="car.image"
								cover
					/>
					<v-table class="mt-15">
						<thead>
						<tr>
							<td>Brand</td>
							<td>Model</td>
							<td>Year</td>
							<td>Price</td>
							<td>New</td>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>{{ car.brand }}</td>
							<td>{{ car.model }}</td>
							<td>{{ car.year }}</td>
							<td>{{ car.price }}$</td>
							<td>{{ car.new === true ? 'new car' :'used car'}}</td>
						</tr>
						</tbody>
					</v-table>
					<v-btn
								@click="back"
								class="mt-15"
					>Back</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>


<style lang="scss" scoped>

</style>
