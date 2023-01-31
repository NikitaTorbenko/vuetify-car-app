import { defineStore } from 'pinia'
import _ from 'lodash'

import cars from './cars.json'

export const useCarStore = defineStore( {
	id: 'carStore',
	state: () => ( {
		cars: cars,
		carsForGet: cars,
	} ),

	actions: {
		async resetCarsStore() {
			await this.GetFromlocalStore()
		},
		async filterBrand( { brand } ) {
			console.log( "FILTER: ", brand );
			console.log( "carsForGet: ", this.carsForGet );

			this.carsForGet = this.carsForGet = _.filter( this.carsForGet, {
				'brand': brand,
			} )
		},
		findByID( id ) {
			return _.find( this.carsForGet, { 'id': id } )
		},
		async filterCars( { brand, model, year, price, usedORNew } ) {

			this.carsForGet = _.filter( this.cars, {
				'brand': brand,
				'model': model,
				'year': year,
				'price': price,
				'new': usedORNew
			} )

		},

		async loadCar( car ) {
			// console.log("car store: ", c);
			this.carsForGet.push( car )
			await this.SetTolocalStore( this.carsForGet )
		},
		async SetTolocalStore( carsArray ) {
			await localStorage.setItem( "cars", JSON.stringify( carsArray ) )
		},
		async GetFromlocalStore() {
			this.carsForGet = await JSON.parse( localStorage.getItem( "cars" ) )
			// if (Array.isArray(cars)) {
			//
			// }
		},
		filterPrice( data ) {
			console.log("get ", data);
			if ( data === 'Price Down' ) {
				this.carsForGet =  this.carsForGet.sort((a,b)=> a.price - b.price)
			}
			else if ( data === 'Price Up') {
				this.carsForGet =  this.carsForGet.sort((a,b)=> b.price - a.price)
			}

		},
	},
	getters: {
		getCars: state => state.carsForGet
	},
} )
