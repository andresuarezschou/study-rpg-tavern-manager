<script setup>
import { useGameStore } from '../stores/useGameStore'
import{ computed } from 'vue'

const game = useGameStore()

const tavernTitle = computed(() => {
  if (game.reputation < 20) return '🏚️ Dank Dive Bar'
  if (game.reputation < 50) return '🍺 Cozy Corner Pub'
  if (game.reputation < 100) return '🔥 Renowned Adventurer Hotspot'
  return '🏰 Legendary Grand Tavern'
})
</script>

<template>
<div class="dashboard-wrapper">
<div class="title-banner">
      <h2>{{ tavernTitle }}</h2>
    </div>
  <div class="dashboard">
    <div class="stat-card">
      <span class="label">🪙 Gold</span>
      <span class="value">{{ game.gold }}</span>
    </div>
    <div class="stat-card">
      <span class="label">🍺 Supplies</span>
      <span class="value">{{ game.supplies }}</span>
    </div>
    <div class="stat-card">
      <span class="label">⭐ Reputation</span>
      <span class="value">{{ game.reputation }}</span>
    </div>
  </div>
</div> 
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  margin-bottom: 20px;
}
.stat-card {
  background: #f4ebd0;
  border: 2px solid #c2b280;
  padding: 12px 20px;
  border-radius: 8px;
  text-align: center;
  flex: 1;
  font-family: sans-serif;
}
.label {
  display: block;
  font-size: 14px;
  color: #5c4033;
  margin-bottom: 5px;
}
.value {
  font-size: 20px;
  font-weight: bold;
  color: #2c1d11;
}
</style>
