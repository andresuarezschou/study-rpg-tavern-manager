<script setup>
import Dashboard from './components/Dashboard.vue'
import { useGameStore } from './stores/useGameStore' // <--- 1. Import store

const game = useGameStore() // <--- 2. Initialize store instance
</script>

<template>
  <main class="game-layout">
    <h1>Age of Studies</h1>
    
    <!-- Dashboard stays visible on every page! -->
    <Dashboard />

    <!-- Navigation Tabs -->
    <nav class="nav-bar">
      <router-link to="/">Market</router-link>
      <router-link to="/quests">Quests</router-link>
      <router-link to="/roster">Heroes</router-link>
      
      <!-- Library tab is only active/clickable when a hero is on a quest -->
      <router-link 
        to="/library" 
        :class="{ 'disabled-link': !game.hasActiveQuest }"
        @click.prevent="!game.hasActiveQuest && $event.preventDefault()"
      >
        Library 📚 {{ game.hasActiveQuest ? '' : '🔒' }}
      </router-link>
    </nav>

    <!-- The active view/page will load right here -->
    <router-view class="view-container" />
  </main>
</template>

<style scoped>
.game-layout {
  max-width: 800px;
  margin: 20px auto;
  font-family: sans-serif;
  padding: 15px;
  box-sizing: border-box;
}

/* Mobile-first Nav Bar Layout */
.nav-bar {
  display: flex;
  flex-wrap: wrap; /* Allows tabs to drop to a new line cleanly on small screens */
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;
}

.nav-bar a {
  flex: 1 1 auto; /* Allows tabs to grow/shrink evenly or stack nicely */
  text-align: center;
  background: #e6dfd5;
  padding: 12px 10px;
  border-radius: 6px;
  text-decoration: none;
  color: #5c4033;
  font-weight: bold;
  font-size: 14px;
  border: 1px solid #c2b280;
  box-sizing: border-box;
  transition: background 0.2s;
}

/* Vue Router automatically adds this class to the active link tab */
.nav-bar a.router-link-active {
  background: #8b4513;
  color: white;
}

/* Style for the locked/disabled library tab */
.disabled-link {
  opacity: 0.4;
  pointer-events: none;
  cursor: not-allowed;
  background: #dcd6cd !important;
}

.view-container {
  background: #fff8ee;
  border: 2px solid #d4c3a3;
  padding: 15px;
  border-radius: 8px;
  box-sizing: border-box;
}

/* Optional Media Query for wider screens to make nav tabs sit side-by-side naturally */
@media (min-width: 600px) {
  .nav-bar a {
    flex: 1; /* Distributes tabs evenly across desktop viewports */
    padding: 12px 20px;
  }
}
</style>
