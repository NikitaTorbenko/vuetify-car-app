<script setup>
//

//core
import { ref, reactive, computed, } from "vue"
import { useRouter } from 'vue-router'

// router
const router = useRouter()

// vuelidate
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

// pinia
import { useUserStore } from "../stores/user"

const { setRegUser, setLogUser, setLogin, getRegFromLocalStore } = useUserStore()

// tabs
const tabs = ref( null )

// register state
const userInputSignUp = reactive( {
	firstName: '',
	email: '',
	password: '',
	confirmPassword: ''
} )
const rulesUp = computed( () => {
	return {
		firstName: { required, minLength: minLength( 3 ) },
		email: { required, email },
		password: { required, minLength: minLength( 5 ) },
		confirmPassword: { required, sameAs: sameAs( userInputSignUp.password ) }
	}
} )
const submitBtnComputedUp = computed( () => userInputSignUp.firstName === '' || userInputSignUp.email === '' ||
			userInputSignUp.password === '' || userInputSignUp.confirmPassword === '' )
const $vUp = useVuelidate( rulesUp, userInputSignUp )
const submitSignUpForm = async () => {
	const ok = await $vUp.value.$validate() //true/false
	if ( ok ) {
		const user = {
			firstName: userInputSignUp.firstName.trim().toLowerCase(),
			email: userInputSignUp.email.trim().toLowerCase(),
			password: userInputSignUp.password.trim(),
		}
		await setRegUser( user )


		userInputSignUp.firstName = ''
		userInputSignUp.email = ''
		userInputSignUp.password = ''
		userInputSignUp.confirmPassword = ''

		console.log( user );
	} else {
		console.log( 'invalid' );
	}
}
//- end


// login state
const userInputSignIn = reactive( {
	email: '', // email name@gmail.com
	password: '', //min 5 symbols
} )
const rulesIn = computed( () => {
	return {
		email: { required, email },
		password: { required, minLength: minLength( 5 ) },
	}
} )
const $vIn = useVuelidate( rulesIn, userInputSignIn )
const submitBtnComputedIn = computed( () => userInputSignIn.email === '' || userInputSignIn.password === '' )
const submitSignInForm = async () => {
	const ok = await $vIn.value.$validate() //true /false
	if ( ok ) {
		let regUser = await getRegFromLocalStore( 'reg_user' )
		console.log( "FROM LOCAL STORE ", regUser );
		const user = {
			email: userInputSignIn.email.trim().toLowerCase(),
			password: userInputSignIn.password
		}
		if ( user.email === regUser.email && user.password === regUser.password ) {
			await setLogUser( user )
			await setLogin( true )
			await router.push( { name: 'Cars' } )

		} else {
			console.log( "Пользователя с таким email нет" );
		}
		userInputSignIn.email = ''
		userInputSignIn.password = ''
	} else {
		console.log( 'invalid' );
	}
}


//- end


</script>

<template>
	<v-container fluid>
		<v-row justify="space-evenly" align="center">
			<v-col cols="12" class="v-col-sm-10 v-col-md-6 v-col-lg-4">
				<v-card min-height="500" elevation="10">
					<v-tabs color="primary" grow density="compact" v-model="tabs" height="70">
						<v-tab value="register" title="Sign Up"></v-tab>
						<v-tab value="login" title="Sign In"></v-tab>
					</v-tabs>
					<v-window v-model="tabs">
						<v-window-item value="register">
							<v-card>
								<v-form @submit.prevent="submitSignUpForm">
									<v-card class="pa-6" flat>
										<v-text-field label="name" clearable v-model="userInputSignUp.firstName"></v-text-field>
										<v-text-field label="email" clearable v-model="userInputSignUp.email"></v-text-field>
										<v-text-field type="password" label="password" clearable
																	v-model="userInputSignUp.password"></v-text-field>
										<v-text-field type="password" label="confirm password" clearable
																	v-model="userInputSignUp.confirmPassword"></v-text-field>
										<v-btn :disabled="submitBtnComputedUp" color="primary" type="submit">sign up</v-btn>
									</v-card>
								</v-form>
							</v-card>
						</v-window-item>
						<v-window-item value="login">
							<v-card>
								<v-form @submit.prevent="submitSignInForm">
									<v-card class="pa-6" flat>
										<v-text-field label="email" clearable v-model="userInputSignIn.email"></v-text-field>
										<v-text-field type="password" clearable label="password"
																	v-model="userInputSignIn.password"></v-text-field>
										<v-btn :disabled="submitBtnComputedIn" color="primary" type="submit">login</v-btn>
									</v-card>
								</v-form>
							</v-card>
						</v-window-item>
					</v-window>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>


<style lang="scss" scoped>

</style>
