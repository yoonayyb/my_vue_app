<template>
  <div class="page-container">
    <div class="action-sheet">
      <div class="header-content">
        <h1>A Short Title Is Best</h1>
        <p>A description should be a short, complete sentence.</p>
      </div>
      <div class="actions-list">
        <button
          v-for="(action, index) in actions"
          :key="index"
          :class="['action-button', { 'destructive': action.destructive }]"
          @click="performAction(action.label)"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const actions = ref([
  { label: 'Action 1', destructive: true },
  { label: 'Action 2' },
  { label: 'Action 3' },
  { label: 'Action 4' },
  { label: 'Action 5' },
  { label: 'Action 6' },
  { label: 'Action 7' },
]);

const performAction = (label) => {
  console.log(`${label} clicked`);
  alert(`Action: ${label}`);
};
</script>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #1c1c1e; /* 深色背景，模拟设备屏幕 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.action-sheet {
  width: 100%;
  max-width: 375px; /* 模拟手机屏幕宽度 */
  background-color: #3a3a3c; /* 弹窗背景色 */
  border-radius: 14px;
  padding: 16px;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
}

.header-content {
  padding-bottom: 12px;
}

h1 {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.actions-list {
  display: flex;
  flex-direction: column;
  gap: 8px; /* 按钮之间的间距 */
}

.action-button {
  width: 100%;
  padding: 16px;
  font-size: 17px;
  font-weight: 400;
  color: #000; /* 按钮文字颜色 */
  background-color: #a9a9a9; /* 按钮背景色 */
  border: none;
  border-radius: 25px; /* 胶囊形状 */
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #bdbdbd;
}

.action-button.destructive {
  color: #ff3b30; /* 红色文字 */
}
</style>
