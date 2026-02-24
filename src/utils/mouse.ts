import { Ref, reactive, onMounted, onUnmounted } from 'vue';

export const useMouse = (el: Ref<HTMLElement | null>) => {
  const mouse = reactive({ x: 0, y: 0 });

  const update = (event: MouseEvent) => {
    if (el.value) {
      const rect = el.value.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    }
  };

  onMounted(() => {
    window.addEventListener('mousemove', update);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });

  return { mouse };
};