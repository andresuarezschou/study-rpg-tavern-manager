// src/stores/useGameStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'  

export const useGameStore = defineStore('game', () => {
  // Resources
  const gold = ref(0)
  const supplies = ref(0)
  const experience = ref(0)

  // Roster of Adventurers
  const adventurers = ref([
    { id: 1, name: 'William Wallace', class: 'Militia', icon: '🧑‍🌾', stamina: 50, status: 'Resting' },
    { id: 2, name: 'Prithviraj Chauhan', class: 'Archer', icon: '🏹', stamina: 50, status: 'Resting' },
    { id: 3, name:'Harald Hadrada', class: 'Berserker', icon: '🪓', stamina: 50, status: 'Resting' },
    { id: 4, name:'Charlemagne', class: 'Cavalry', icon: '🐎', stamina: 50, status: 'Resting' }
  ])
  
  const router = useRouter() 
  const activeQuiz = ref(null)
  const quizMessage = ref('')
  
  // Track active quest session for manual completion
  const activeQuestSession = ref(null) // e.g. { heroId, quest }
   
  // Available Quests (durations removed or ignored since they are manual now!)
  const quests = ref([
    { 
      id: 1, 
      title: 'mysql', 
      images: ['/sql.png'],
      reward: 20,
      difficulty: 'Easy',
      quiz: {
        question: "What type of SQL command is SELECT?",
        options: ["Data Definition Language", "Data Control Language", "Data Manipulation Language", "Data Query Language"],
        correctIndex: 3 // DQL
      }
    },
    { 
      id: 2, 
      title: 'express and sequelize', 
      images: ['/express.png','/sequelizejs.png'], 
      reward: 50, 
      difficulty: 'Medium',
      quiz: {
        question: "What is an Object Relational Mapper?",
        options: [
          "A tool that automatically generates frontend UI components based on database schemas",
          "A library that allows developers to interact with a database using object-oriented code instead of raw SQL",
          "A compiler that translates relational database tables directly into static JSON files",
          "A routing middleware that maps URL endpoints directly to database tables"
        ],
        correctIndex: 1
      }
    },
    { id: 3, title: 'Library quest: read Houde and Hill',
      images: ['/houde-hill.png', '/houde-hill2.png'],
      reward: 20, difficulty: 'Medium' },
    { 
      id: 4, 
      title: 'vue',
      images: ['/vue.png'],
      reward: 50,
      difficulty: 'Medium',
      quiz: {
        question: "What is propdrilling?",
        options: [
          "an asynchronous API request",
          "it pushes state data backwards from a child component to its parent component",
          "a debugging method used to inspect network payloads in real-time",
          "passing data from a parent component down through multiple layers of intermediate components"
        ],
        correctIndex: 3 
      } 
    }
  ])

  // Actions
  
  function serveCustomer() {
    if (supplies.value > 0) {
      supplies.value -= 3 
      gold.value += 5
    }
  }

  function buySupplies() {
    if (gold.value >= 15) {
      gold.value -= 15
      supplies.value += 5 
    }
  }

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
      feedMessage.value = ` Fed ${hero.name}! Restored 25 stamina.`
    } else {
      feedMessage.value = '⚠️ Not enough food/supplies! Visit the Market to buy more.'
    }

    setTimeout(() => {
      feedMessage.value = ''
    }, 3500)
  }

  // 2. Fix regular quests getting stuck: Process them instantly or handle them separately
  function startQuest(heroId, questId) {
    const hero = adventurers.value.find(h => h.id === heroId)
    const quest = quests.value.find(q => q.id === questId)

    if (!hero || hero.status !== 'Resting') return

    // Check if it's the reading quest (Library Quest)
    if (quest.id === 3 || quest.title.toLowerCase().includes('read')) {
      hero.status = `On Quest: ${quest.title}`
      activeQuestSession.value = { heroId: hero.id, quest }
      router.push('/library')
    } else {
      // Regular coding/quiz quests: Don't put them on an indefinite "On Quest" state 
      // that gets stuck. Instead, trigger their quiz immediately!
      if (quest.quiz) {
        activeQuiz.value = { heroId: hero.id, quest, quiz: quest.quiz }
      } else {
        gold.value += quest.reward
        experience.value += 25
      }
    }
  }  

  // Manual completion action called when user finishes reading/studying
  function completeQuest() {
    if (!activeQuestSession.value) return

    const { heroId, quest } = activeQuestSession.value
    const hero = adventurers.value.find(h => h.id === heroId)

    // Clear active session first so the library locks back up
    activeQuestSession.value = null

    if (hero) {
      hero.status = 'Resting'
    }

    // Trigger quiz if available, otherwise grant rewards instantly
    if (quest.quiz) {
      activeQuiz.value = { heroId: hero.id, quest, quiz: quest.quiz }
    } else {
      gold.value += quest.reward
      experience.value += 25
    }
  }

  function submitQuizAnswer(selectedIndex) {
    if(!activeQuiz.value) return
    
    const { heroId, quest } = activeQuiz.value
    const hero = adventurers.value.find(h => h.id === heroId)

    if (selectedIndex === quest.quiz.correctIndex) {
      gold.value += quest.reward
      experience.value += 25
      quizMessage.value = `🎉 Correct! Earned ${quest.reward} Gold & 25 XP!`
    } else {
      if(hero) {
        hero.stamina = Math.max(0, hero.stamina - 50)
        quizMessage.value = `❌ Incorrect! Study harder next time. ${hero?.name || 'Hero'} lost 50 stamina!`
      }
    }

    activeQuiz.value = null 
    setTimeout(() => {
      quizMessage.value = ''
    }, 4000)
  }

 const hasActiveQuest = computed(() => {
    return adventurers.value.some(hero => 
      hero.status && hero.status.includes('read Houde and Hill')
    )
  })

  return { 
    gold, supplies, experience, adventurers, quests, 
    serveCustomer, buySupplies, startQuest, feedHero, 
    feedMessage, activeQuiz, submitQuizAnswer, quizMessage, 
    hasActiveQuest, activeQuestSession, completeQuest 
  }
})
