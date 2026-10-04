<script setup>
import { useGameStore } from '../stores/useGameStore'

const game = useGameStore()
</script>

<template>
  <div class="adventurer-list">
    <h2>Hero Roster</h2>
    <p>Your hired heroes waiting for work.</p>

    <!-- Notification Banner -->
    <div v-if="game.feedMessage" class="feed-notification">
      {{ game.feedMessage }}
    </div>

    <ul>
      <li v-for="hero in game.adventurers" :key="hero.id" class="hero-card">
        <div class="hero-info-group">
          <!-- Hero Emoji Icon Avatar -->
          <div class="hero-avatar">{{ hero.icon }}</div>
          <div>
            <strong>{{ hero.name }}</strong> 
            <span class="class-tag">({{ hero.class }})</span>
            
            <!-- Stamina text or mini bar -->
            <div class="stamina-container">
              <span>Stamina: {{ hero.stamina }}/100</span>
              <div class="stamina-bar-bg">
                <div class="stamina-bar-fill" :style="{ width: hero.stamina + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="hero-actions">
          <span :class="['status-badge', hero.status.toLowerCase().includes('resting') ? 'resting' : 'busy']">
            {{ hero.status }}
          </span>
          <!-- Feed button to recover stamina using food supplies -->
          <button @click="game.feedHero(hero.id)" class="feed-btn" :disabled="hero.stamina >= 100">
             🥞 Feed
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.adventurer-list {
  background: #fff8ee;
  border: 2px solid #d4c3a3;
  padding: 20px;
  border-radius: 8px;
}
ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}
.hero-card {
  background: #f4ebd0;
  padding: 10px 15px;
  border-radius: 6px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap; /* Allows wrapping on smaller mobile screens */
}
.hero-info-group {
  display: flex;
  align-items: center;
  gap: 12px;
}
.hero-avatar {
  font-size: 20px;
  background: #faebd7;
  border: 2px solid #c2b280;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.class-tag {
  font-style: italic;
  color: #666;
  font-size: 14px;
}
.badge {
  background: #2e8b57;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

/* --- New Stamina & Feed Button Styles --- */
.stamina-container {
  margin-top: 4px;
  font-size: 11px;
  color: #555;
}
.stamina-bar-bg {
  width: 100px;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 2px;
}
.stamina-bar-fill {
  height: 100%;
  background: #2e8b57;
  transition: width 0.3s ease;
}
.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}
.feed-btn {
  background: #2e8b57;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
}
.feed-btn:hover {
  background: #a93226;
}
.feed-btn:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}
.feed-notification {
  background: #fcf8e3;
  color: #8a6d3b;
  border: 1px solid #faebcc;
  padding: 10px;
  border-radius: 6px;
  margin: 10px 0;
  font-size: 13px;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}
</style>

