<script setup>
import { useGameStore } from '../stores/useGameStore'

const game = useGameStore()
</script>

<template>
  <div class="adventurer-list">
    <h2>Hero Roster</h2>
    <p>Your hired adventurers waiting for work.</p>

    <ul>
      <li v-for="hero in game.adventurers" :key="hero.id" class="hero-card">
        <div class="hero-info-group">
          <!-- Hero Emoji Icon Avatar -->
          <div class="hero-avatar">{{ hero.icon }}</div>
          <div>
            <strong>{{ hero.name }}</strong> 
            <span class="class-tag">({{ hero.class }})</span>
          </div>
        </div>

        <div class="hero-status">
          Status: <span class="badge">{{ hero.status }}</span>
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
</style>
