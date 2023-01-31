<script setup="">
import SignUp from './views/SignUp.vue'
import Home from './views/Home.vue'
// core
import { ref, computed } from 'vue'

// user store
import { useUserStore } from './stores/user'

const uStore = useUserStore()
const { getLogFromLocalStore, isLogged } = uStore

const u = computed( async () => {
	return getLogFromLocalStore
} )


</script>


<template>
	<v-app full-height>
		<router-view/>
	</v-app>
</template>


<style lang="scss">
 * {
	 text-decoration: none;
 }
</style>

