<script setup>
// Note:
// For flicker free switching on page load, requires something like this in the <head>
// document.documentElement.setAttribute('data-theme', window.localStorage.getItem('site-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches && 'dark') || 'light')

import { ref, onMounted, onBeforeUnmount } from 'vue'

function getSetting() {
  return window.localStorage.getItem('site-theme')
}

function setSetting(newTheme) {
  return window.localStorage.setItem('site-theme', newTheme)
}

function getPref() {
  return preferenceDark.matches ? 'dark' : 'light'
}

function applyTheme(newTheme) {
  theme.value = newTheme
  document.documentElement.setAttribute('data-theme', newTheme)
}

function toggleTheme() {
  const newTheme = theme.value === 'dark' ? 'light' : 'dark'
  applyTheme(newTheme)
  setSetting(newTheme === getPref() ? '' : newTheme)
}

function prefChange() {
  const setting = getSetting()
  const pref = getPref()
  if (!setting) {
    applyTheme(pref)
    return
  }
  if (setting === pref) {
    setSetting('')
  }
}

let preferenceDark = null
const theme = ref('')

onMounted(() => {
  preferenceDark = window.matchMedia('(prefers-color-scheme: dark)')
  preferenceDark.addEventListener('change', prefChange)
  applyTheme(getSetting() || getPref())
})

onBeforeUnmount(() => {
  preferenceDark.removeEventListener('change', prefChange)
})
</script>

<template>
  <div class="switch">
    <button
      class="switch-button"
      role="switch"
      :aria-checked="theme === 'dark'"
      title="Toggle dark mode"
      @click="toggleTheme"
    >
      <svg
        class="switch-icon switch-icon--dark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        width="22"
        height="22"
      >
        <path
          d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
        />
      </svg>
      <svg
        class="switch-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        width="22"
        height="22"
      >
        <path
          d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Zm297-297Z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.switch {
  margin-right: 12px;
  border-right: 1px solid var(--site-separator);
  padding-right: 12px;
}
.switch-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 0;
  border-radius: 100px;
  padding: 0;
  width: 22px;
  height: 22px;
  background: var(--site-bg);
  cursor: pointer;
}
.switch-button:hover {
  opacity: 0.8;
}
.switch-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: var(--site-text-muted);
  transition: all 0.25s;
}
.switch-icon--dark {
  transform: scale(0);
  opacity: 0;
}
[data-theme='dark'] .switch-icon {
  transform: scale(0);
  opacity: 0;
}
[data-theme='dark'] .switch-icon--dark {
  transform: none;
  opacity: 1;
}
</style>
