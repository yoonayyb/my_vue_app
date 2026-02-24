import { reactive, onMounted, onUnmounted, Ref } from 'vue';

export function useMouse(elRef?: Ref<HTMLElement | null> | null) {
  const mouse = reactive({ x: 0, y: 0 });

  let target: HTMLElement | Window = window;
  function handler(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  onMounted(() => {
    if (elRef && 'value' in elRef && elRef.value) {
      target = elRef.value;
    }
    (target as any).addEventListener('mousemove', handler);
  });

  onUnmounted(() => {
    (target as any).removeEventListener('mousemove', handler);
  });

  return { mouse };
}