// font awesome
import '@fortawesome/fontawesome-free/css/all.css'
import { aliases, fa } from 'vuetify/iconsets/fa'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


// custom themes
const myDarkTheme = {
	dark: false,
	colors: {
		background: '#FFFFFF',
		surface: '#FFFFFF',
		primary: '#6200EE',
		'primary-darken-1': '#3700B3',
		secondary: '#03DAC6',
		'secondary-darken-1': '#018786',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
	}
}
const theme = {
	defaultTheme: 'myDarkTheme',
	themes: {
		myDarkTheme,
	}
}
const icons = {
	defaultSet: 'fa',
	aliases,
	sets: {
		fa,
	},
}
export const vuetify = createVuetify( {
	components,
	directives,
	theme,
	icons
} )


