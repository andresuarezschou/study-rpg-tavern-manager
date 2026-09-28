// src/stores/useGameStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // Resources
  const gold = ref(50)
  const supplies = ref(20)
  const reputation = ref(10)

  // Roster of Adventurers
  const adventurers = ref([
    { id: 1, name: 'Sir Valen', class: 'Villager', icon: '🧑‍🌾', stamina: 100, status: 'Resting' },
    { id: 2, name: 'Lyra', class: 'Crossbowman', icon: '🏹', stamina: 100, status: 'Resting' },
    { id: 3, name:'Hadrada', class: 'Berserker', icon: '🪓', stamina: 100, status: 'Resting' },
    { id: 4, name:'Charles', class: 'Cavalry', icon: '🐎', stamina: 100, status: 'Resting' }
  ])

  //Available Quests
  const quests = ref([
    { id: 1, title: 'mysql', image: '/sql.png', reward: 20, duration: 3, difficulty: 'Easy' },
    { id: 2, title: 'express and sequelize', image: 'sequelizejs.png', reward: 50, duration: 6, difficulty: 'Medium' },
    { id: 3, title: 'read Houde and Hill', reward: 180, duration: 20, difficulty: 'Medium' },
    { id: 4, title: 'vue computed, routes', reward: 150, duration: 15, difficulty: 'Medium' }


  ])
  // Tavern Actions
  function serveCustomer() {
    if (supplies.value > 0) {
      supplies.value -= 1
      gold.value += 5
    }
  }

  function buySupplies() {
    if (gold.value >= 15) {
      gold.value -= 15
      supplies.value += 10
    }
  }

// Quest Action
  function startQuest(heroId, questId) {
    const hero = adventurers.value.find(h => h.id === heroId)
    const quest = quests.value.find(q => q.id === questId)

    if (!hero || hero.status !== 'Resting') return

    // Set hero to busy
    hero.status = `On Quest: ${quest.title}`

    // Simulate quest completion after a few seconds (using duration * 1000ms)
    setTimeout(() => {
      gold.value += quest.reward
      reputation.value += 5
      hero.status = 'Resting'
    }, quest.duration * 1000)
  }

  return { gold, supplies, reputation, adventurers, quests, serveCustomer, buySupplies, startQuest }
})
