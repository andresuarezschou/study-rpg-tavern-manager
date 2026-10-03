<script setup>
import { useGameStore } from '../stores/useGameStore'
import { ref } from 'vue'

const game = useGameStore()

const documents = ref([
  { id: 1, title: 'Houde and Hill - Study Guide', file: '/houde-hill.pdf' },
  { id: 2, title: 'Vue 3 Composition & Routing Notes', file: '/vue-notes.pdf' }
])

const selectedDoc = ref(documents.value[0].file)

function finishCurrentQuest() {
  game.completeQuest()
  router.push('/quests') // Send them back to tasks where the quiz modal or reward lands
}
</script>

<template>
  <div class="library-content">
    <!-- If no quest is active, show locked warning -->
    <div v-if="!game.hasActiveQuest" class="locked-state">
      <h2>🔒 Library Locked</h2>
      <p>Your heroes are resting in the tavern. Dispatch a hero on a study quest from the Tasks tab to gain access to the library archives!</p>
    </div>

    <!-- Otherwise, show the full library -->
    <template v-else>
      <h2>Library & Study Hall 📚</h2>
      <p>Review your course materials while your hero is out on a quest!</p>

      <div class="doc-tabs">
        <button 
          v-for="doc in documents" 
          :key="doc.id"
          @click="selectedDoc = doc.file"
          :class="{ 'active-tab': selectedDoc === doc.file }"
          class="tab-btn"
        >
          📖 {{ doc.title }}
        </button>
      </div>     
    <button @click="finishCurrentQuest" class="finish-quest-btn">
       Finish Reading & Claim Reward
    </button>
      <div class="viewer-box">
        <iframe :src="selectedDoc" width="100%" height="550px" class="pdf-frame"></iframe>
      </div>

      <p class="fallback-text">
        Having trouble viewing? <a :href="selectedDoc" target="_blank">Download the PDF directly</a>.
      </p>

    </template>
  </div>
</template>

<style scoped>
.finish-quest-btn {
  background: #2e8b57;
  color: #ffffff;
  border: 2px solid #c2b280;
  padding: 10px ;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.finish-quest-btn:hover {
  background: #8b4513;
  color: white;
  border-color: #5c4033;
}
.library-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.library-content h2 {
  color: #4a3b2c;
  margin-top: 0;
  margin-bottom: 8px;
  font-family: serif;
}

.library-content p {
  color: #6c584c;
  font-size: 14px;
  margin-bottom: 20px;
}

.locked-state {
  text-align: center;
  padding: 40px 20px;
}

.locked-state h2 {
  color: #8b4513;
  margin-bottom: 15px;
}

.doc-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.tab-btn {
  background: #fdf6e2;
  color: #5c4033;
  border: 2px solid #c2b280;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: #f1e2c8;
}

.tab-btn.active-tab {
  background: #3b5323; 
  color: white;
  border-color: #263616;
}

.viewer-box {
  width: 100%;
  background: #ffffff;
  border: 3px solid #c2b280;
  border-radius: 10px;
  padding: 4px;
  box-sizing: border-box;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.08);
}

.pdf-frame {
  width: 100%;
  height: 550px;
  border: none;
  border-radius: 6px;
  display: block;
}

.fallback-text {
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
  color: #7a6555;
}

.fallback-text a {
  color: #2e8b57;
  font-weight: bold;
  text-decoration: none;
}
</style>
