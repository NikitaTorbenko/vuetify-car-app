import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Home from '../views/Home.vue'
import CardByID from '../components/CardByID.vue'
import CarsContent from '../components/CarsContent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'cars', //->  /home/cars
          name: 'Cars',
          component: CarsContent,
        },
        {
          path: 'car/:id', //->  /home/car/1
          name: 'CarByID',
          component: CardByID
        }
      ]
    },


  ]
})

export default router
// {
//   path: '/home',
//     name: 'Home',
//   component: Home,
//   children: [
//   {
//     path: 'search', //->  /home/search
//     name: 'searchCars',
//     component: SearchCars,
//   },
//   {
//     path: 'load', //->  /home/load
//     name: 'loadCars',
//     component: LoadCars,
//   },
// ]
// },
