import { createRouter, createWebHistory } from 'vue-router'
import TavernView from '../views/TavernView.vue'
import QuestsView from '../views/QuestsView.vue'
import RosterView from '../views/RosterView.vue'

const routes = [
  { path: '/', name: 'Tavern', component: TavernView },
  { path: '/quests', name: 'Quests', component: QuestsView },
  { path: '/roster', name: 'Roster', component: RosterView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
