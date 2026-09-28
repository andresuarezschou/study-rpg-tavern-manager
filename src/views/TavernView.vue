
<script setup>
import { useGameStore } from '../stores/useGameStore'

const game = useGameStore()
</script>

<template>
  <div class="tavern-floor">
    <h2>Tavern Floor</h2>
    <p>Keep the patrons happy and manage your stock!</p>

    <div class="action-buttons">
      <button @click="game.serveCustomer" :disabled="game.supplies <= 0">
        Serve Customer (+5 Gold)
      </button>
      <button @click="game.buySupplies" :disabled="game.gold < 15">
        Buy Supplies (-15 Gold)
      </button>
    </div>

    <p v-if="game.supplies <= 0" class="warning">⚠️ Out of supplies! Buy more to keep serving.</p>
  </div>
</template>

<style scoped>
.tavern-floor {
  background: #fff8ee;
  border: 2px solid #d4c3a3;
  padding: 20px;
  border-radius: 8px;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
button {
  background: #8b4513;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}
button:hover:not(:disabled) {
  background: #a0522d;
}
button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.warning {
  color: #b22222;
  font-weight: bold;
  margin-top: 10px;
}

</style>
