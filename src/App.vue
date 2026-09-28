<script setup>
import Dashboard from './components/Dashboard.vue'
</script>

<template>
  <main class="game-layout">
    <h1>Study RPG: Tavern Manager</h1>
    
    <!-- Dashboard stays visible on every page! -->
    <Dashboard />

    <!-- Navigation Tabs -->
    <nav class="nav-bar">
      <router-link to="/">Tavern Floor</router-link>
      <router-link to="/quests">Quest Board</router-link>
      <router-link to="/roster">Hero Roster</router-link>
    </nav>

    <!-- The active view/page will load right here -->
    <router-view class="view-container" />
  </main>
</template>

<style scoped>
.game-layout {
  max-width: 800px;
  margin: 30px auto;
  font-family: sans-serif;
  padding: 20px;
}
.nav-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.nav-bar a {
  background: #e6dfd5;
  padding: 10px 20px;
  border-radius: 6px;
  text-decoration: none;
  color: #5c4033;
  font-weight: bold;
  border: 1px solid #c2b280;
}
/* Vue Router automatically adds this class to the active link tab */
.nav-bar a.router-link-active {
  background: #8b4513;
  color: white;
}
.view-container {
  background: #fff8ee;
  border: 2px solid #d4c3a3;
  padding: 20px;
  border-radius: 8px;
}
</style>
