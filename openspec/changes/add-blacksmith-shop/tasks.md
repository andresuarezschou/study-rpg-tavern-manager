# Tasks

## 1. Store Updates

- [x] 1.1 Add `weaponLevel` state to `useGameStore` and verify it defaults to 1
- [x] 1.2 Implement `upgradeWeapon` action in `useGameStore` with cost logic and verify it increases `weaponLevel`
- [x] 1.3 Add a new quest (Level 2) to the `quests` array in `useGameStore`
- [x] 1.4 Implement `availableQuests` computed property in `useGameStore` to filter quests by `weaponLevel`

## 2. UI Implementation

- [ ] 2.1 Create `src/views/BlacksmithView.vue` with upgrade UI and verify it displays current level and cost
- [ ] 2.2 Register `/blacksmith` route in `src/router/index.js` and verify it loads `BlacksmithView.vue`
- [ ] 2.3 Add Blacksmith tab link to `App.vue` and verify it is clickable
- [ ] 2.4 Update `QuestsView.vue` to use `game.availableQuests` and verify only Level 1 quests are visible at weapon level 1
