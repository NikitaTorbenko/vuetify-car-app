import { defineStore } from 'pinia'


export const useUserStore = defineStore( {
	id: 'userStore',
	state: () => ( {
		loggedUser: null,
		registerUser: null,
		isLogged: false
	} ),
	actions: {
		async setRegUser( u ) {
			try {
				this.registerUser = await u
				await this.setRegToLocalStore(this.registerUser)
			} catch ( e ) {
				console.log( e );
			}
		},
		async setLogUser( u ) {
			try {
				this.loggedUser = await u
				await this.setLogToLocalStore( this.loggedUser )
			} catch ( e ) {
				console.log( e );
			}
		},
		async setLogin( valTrue ) {
			this.isLogged = valTrue
		},
		async setLogout( valFalse ) {
			this.isLogged = valFalse
		},
		async setRegToLocalStore( user ) {
			localStorage.setItem( "reg_user", JSON.stringify( user ) )
		},
		async setLogToLocalStore( user ) {
			localStorage.setItem( "log_user", JSON.stringify( user ) )
		},
		async getRegFromLocalStore(key) {
			const u = JSON.parse( localStorage.getItem( key ) )
			if ( !u )
				this.registerUser = null

			this.registerUser = u
			return this.registerUser
		},
		async getLogFromLocalStore() {
			const u = JSON.parse( localStorage.getItem( 'log_user' ) )
			if ( !u )
				this.loggedUser = null
			this.loggedUser = u
		},
		async clearLocalStore() {
			await this.setLogToLocalStore(null)
		},
		async setIsLogged(key) {
			this.isLogged = key
		}
	},
	getters: {
		getRegUser: state => state.registerUser
	},
} )

