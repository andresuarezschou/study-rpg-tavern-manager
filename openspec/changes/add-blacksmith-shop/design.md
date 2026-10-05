# Design: Blacksmith Shop and Quest Level 2

## Context
See `proposal.md` and `specs/requirements.md`.
The application is a Vue 3 + Pinia app. Navigation is handled by Vue Router. State is in `useGameStore.js`.

## Goals / Non-Goals
**Goals:**
- Add a new "Blacksmith" tab for weapon upgrades.
- Implement weapon level state and upgrade logic.
- Unlock Quest Level 2 based on weapon level.

**Non-Goals:**
- Detailed weapon durability or complex material systems.
- Animations for the blacksmith shop (UI only for now).

## Decisions
1. **State Management**: Add `weaponLevel` to `useGameStore`.
   - *Rationale*: Simple and centralized.
   - *Alternatives*: A separate store for blacksmithing, but the current state is small enough to fit in the main store.
2. **Upgrade Cost**: 50 Gold * Weapon Level.
   - *Rationale*: Scaling cost to maintain challenge.
3. **Quest Unlocking**: Filter `quests` in `useGameStore` using a computed property `availableQuests`.
   - *Rationale*: Clean separation of data and view logic.
4. **UI**: Create `BlacksmithView.vue` and add a route in `router/index.js`. Add a `router-link` in `App.vue`.

## Risks / Trade-offs
- [Risk] Gold depletion might block progress → [Mitigation] Ensure Quests Level 1 remain available and profitable.
- [Risk] Weapon level 2 might be too easy/hard → [Mitigation] Adjust reward/difficulty of Level 2 quests.
