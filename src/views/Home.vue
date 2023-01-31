<script setup="">
//core
import  {ref} from 'vue'

// router
import { useRouter } from "vue-router"
const router = useRouter()

// user store
import { useUserStore } from "../stores/user"
const uStore = useUserStore()
const { clearLocalStore, setLogUser, setIsLogged } = uStore

// logout
const logout = async () => {
	await clearLocalStore()
	await setLogUser( null )
	await setIsLogged( false )
	await router.push( { name: 'signup' } )
}

// drawer
const hideDrawer = ref(false)

// components


import SearchCar from "../components/SearchCar.vue"
import LoadCar from "../components/LoadCar.vue"

const tabs = ref( null )


</script>


<template>
	<v-app-bar>
		<v-app-bar-title>
			<v-app-bar-nav-icon @click="hideDrawer = !hideDrawer"/>
			AUTO.RU
		</v-app-bar-title>
		<v-btn @click="logout">LOGOUT</v-btn>
	</v-app-bar>
	<v-navigation-drawer
			width="500"
			elevation="5"
			:temporary="hideDrawer"
	>
	<v-card>
		<v-tabs color="primary" grow density="compact" v-model="tabs" height="70">
			<v-tab value="search" title="Search Cars"></v-tab>
			<v-tab value="load" title="Load Cars"></v-tab>
		</v-tabs>
		<v-window v-model="tabs">
			<v-window-item value="search">
				<v-card>
					<SearchCar/>
				</v-card>
			</v-window-item>
			<v-window-item value="load">
				<v-card>
					<LoadCar/>
				</v-card>
			</v-window-item>
		</v-window>
	</v-card>

	</v-navigation-drawer>
	<v-main>
		<RouterView/>
	</v-main>
</template>


<style lang="scss" scoped>
.myClass{
	position: relative;
	top: 300px;
}

</style>
<!--<RouterView/>-->

<!--<v-card  flat class="d-flex justify-space-evenly align-center myClass">-->
<!--<RouterLink :to="{name: 'searchCars'}"> <v-btn>Search</v-btn> </RouterLink>-->
<!--<RouterLink :to="{name: 'loadCars'}" > <v-btn>Load </v-btn></RouterLink>-->
<!--</v-card>-->
