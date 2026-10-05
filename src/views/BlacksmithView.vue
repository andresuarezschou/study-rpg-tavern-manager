<script setup>
import { useGameStore } from '../stores/useGameStore'
import { computed } from 'vue'

const game = useGameStore()

const upgradeCost = computed(() => game.weaponLevel * 50)

function handleUpgrade() {
  const success = game.upgradeWeapon()
  if (!success) {
    alert("Not enough gold!")
  }
}
</script>

<template>
  <div class="blacksmith-shop">
    <h2>Blacksmith Shop ⚒️</h2>
    <p>Upgrade your weapons to take on more dangerous quests.</p>

    <div class="weapon-info">
      <div class="stat-row">
        <span>Current Weapon Level:</span>
        <span class="level-badge">LVL {{ game.weaponLevel }}</span>
      </div>
      
      <div class="upgrade-card" v-if="game.weaponLevel < 4">
        <h3>Upgrade to Level {{ game.weaponLevel + 1 }}</h3>
        <p>Unlocks higher level quests</p>
        <div class="cost-row">
          <span>Cost:</span>
          <span class="gold-cost">🪙 {{ upgradeCost }}</span>
        </div>
        <button 
          @click="handleUpgrade" 
          :disabled="game.gold < upgradeCost"
          class="upgrade-btn"
        >
          Upgrade Weapon
        </button>
      </div>
      <div v-else class="max-level">
        <p>Your weapon is at maximum level! ⚔️</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blacksmith-shop {
  padding: 20px;
}

.weapon-info {
  margin-top: 20px;
  background: #f4ebd0;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #c2b280;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.level-badge {
  background: #8b4513;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
}

.upgrade-card {
  background: #fff8ee;
  border: 2px dashed #c2b280;
  padding: 15px;
  border-radius: 6px;
  text-align: center;
}

.cost-row {
  margin: 15px 0;
  font-size: 1.2rem;
}

.gold-cost {
  font-weight: bold;
  color: #b8860b;
}

.upgrade-btn {
  background: #2e8b57;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
}

.upgrade-btn:hover:not(:disabled) {
  background: #256d44;
}

.upgrade-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.max-level {
  text-align: center;
  font-weight: bold;
  color: #8b4513;
  font-size: 1.2rem;
  padding: 20px;
}
</style>
