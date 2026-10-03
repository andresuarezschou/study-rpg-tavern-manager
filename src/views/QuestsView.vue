<script setup>
import { ref } from 'vue'
import { useGameStore } from '../stores/useGameStore'

const game = useGameStore()

// Keep track of which hero is selected for which quest
const selectedHeroMap = ref({})

function dispatchHero(questId) {
  const heroId = selectedHeroMap.value[questId]
  if (!heroId) {
    alert("Please select a hero first!")
    return
  }
  game.startQuest(Number(heroId), questId)
}
</script>

<template>
  <div class="quest-board">
    <h2>Quest Board 📜</h2>
    <p>Send your heroes to complete tasks and earn gold and experience</p>

    <!-- Quiz Result Notification Banner -->
    <div v-if="game.quizMessage" class="quiz-notification">
      {{ game.quizMessage }}
    </div>

    <ul>
      <li v-for="quest in game.quests" :key="quest.id" class="quest-card">
        <div class="quest-info">
          <div class="quest-icons-container">
            <img 
              v-for="(img, index) in quest.images" 
              :key="index" 
              :src="img" 
              alt="Quest Icon" 
              class="quest-icon-img" 
            />
          </div>
          <strong>{{ quest.title }}</strong>
          <span>Reward: 🪙 {{ quest.reward }}</span>
        </div>

        <div class="dispatch-area">
          <!-- Dropdown to select an available hero -->
          <select v-model="selectedHeroMap[quest.id]">
            <option disabled value="">Select Hero...</option>
            <option 
              v-for="hero in game.adventurers.filter(h => h.status === 'Resting'&& h.stamina > 0)" 
              :key="hero.id" 
              :value="hero.id"
            >
              {{ hero.name }} ({{ hero.class }})
            </option>
          </select>

          <button @click="dispatchHero(quest.id)">Send</button>
        </div>
      </li>
    </ul>
  </div>

  <!-- Quiz Modal Overlay -->
  <div v-if="game.activeQuiz" class="quiz-modal-overlay">
    <div class="quiz-card">
      <h3>📖 Study Check: {{ game.activeQuiz.quest.title }}</h3>
      <p class="question-text">{{ game.activeQuiz.quiz.question }}</p>

      <div class="options-container">
        <button 
          v-for="(option, index) in game.activeQuiz.quiz.options" 
          :key="index"
          @click="game.submitQuizAnswer(index)"
          class="option-btn"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.quest-board {
  background: #fff8ee;
  border: 2px solid #d4c3a3;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}
.quest-card {
  background: #f4ebd0;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column; /* Stack by default for mobile */
  align-items: stretch;
  gap: 12px;
}
.quest-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.quest-info span {
  font-size: 13px;
  color: #666;
}
.dispatch-area {
  display: flex;
  gap: 8px;
  width: 100%;
}
select {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #c2b280;
  flex: 1; /* Make dropdown fill available width on mobile */
}
button {
  background: #2e8b57;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background: #256d44;
}
.quest-info-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.quest-icons-container {
  display: flex;
  gap: 4px;
  align-items: center;
}
.quest-icon-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 4px;
}

/* Desktop screen layout (switches back to your original side-by-side design) */
@media (min-width: 768px) {
  .quest-card {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .dispatch-area {
    width: auto;
  }
  select {
    flex: unset;
  }
}
.quiz-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.quiz-card {
  background: #fff8ee;
  border: 3px solid #c2b280;
  padding: 24px;
  border-radius: 12px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  text-align: center;
}

.quiz-card h3 {
  margin-bottom: 12px;
  color: #4a3b2c;
}

.question-text {
  font-size: 15px;
  margin-bottom: 20px;
  color: #333;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-btn {
  background: #f4ebd0;
  color: #333;
  border: 1px solid #c2b280;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  text-align: left;
  transition: background 0.2s;
}

.option-btn:hover {
  background: #e6dcbc;
}
.quiz-notification {
  background: #fcf8e3;
  color: #8a6d3b;
  border: 2px solid #faebcc;
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  animation: fadeIn 0.3s ease;
}
</style>
