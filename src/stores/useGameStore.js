// src/stores/useGameStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  // Resources
  const gold = ref(0)
  const supplies = ref(0)
  const experience = ref(0)

  // Roster of Adventurers
  const adventurers = ref([
    { id: 1, name: 'William Wallace', class: 'Militia', icon: '🧑‍🌾', stamina: 50, status: 'Resting' },
    { id: 2, name: 'Prithviraj Chauhan', class: 'Archer', icon: '🏹', stamina: 100, status: 'Resting' },
    { id: 3, name:'Harald Hadrada', class: 'Berserker', icon: '🪓', stamina: 100, status: 'Resting' },
    { id: 4, name:'Charlemagne', class: 'Cavalry', icon: '🐎', stamina: 100, status: 'Resting' }
  ])

  //Available Quests
  const quests = ref([
    { id: 1, title: 'mysql', images: ['/sql.png'], reward: 20, duration: 1, difficulty: 'Easy' },
    { id: 2, title: 'express and sequelize', images: ['/express.png','/sequelizejs.png'], reward: 50, duration: 6, difficulty: 'Medium' },
    { id: 3, title: 'read Houde and Hill', images: ['/houde-hill.png', '/houde-hill2.png'], reward: 180, duration: 20, difficulty: 'Medium' },
    { id: 4, title: 'vue computed, routes', images: ['/vue.png'], reward: 150, duration: 15, difficulty: 'Medium' }


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


  // Feeding heroes and message if not enough food
  
  const feedMessage = ref('')

  function feedHero(heroId) {
    const hero = adventurers.value.find(h => h.id === heroId)
    if (!hero) return

    if (hero.stamina >= 100) {
        feedMessage.value = `${hero.name} is already at full stamina!`
        return
      }

    if (supplies.value > 0) {
        supplies.value -= 1
        hero.stamina = Math.min(100, hero.stamina + 25)
        feedMessage.value = `🍖 Fed ${hero.name}! Restored 25 stamina.`
      } else {
        feedMessage.value = '⚠️ Not enough food/supplies! Visit the Market to buy more.'
      }

      // Clear the message automatically after 3.5 seconds
      setTimeout(() => {
        feedMessage.value = ''
      }, 3500)
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
      experience.value += 25
      hero.status = 'Resting'
    }, quest.duration * 1000)
  }

  return { gold, supplies, experience, adventurers, quests, serveCustomer, buySupplies, startQuest, feedHero, feedMessage }
})
