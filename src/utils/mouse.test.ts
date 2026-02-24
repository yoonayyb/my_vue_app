
/**
 * @vitest-environment jsdom
 */
import { ref } from 'vue';
import { useMouse } from './mouse';
import { describe, afterEach, vi, it, expect, beforeEach } from 'vitest';

describe('useMouse', () => {
  let mockElement: HTMLElement;
  let parentEl = ref<HTMLElement | null>(null);

  beforeEach(() => {
    // Create a mock element to simulate the parent element
    mockElement = document.createElement('div');
    mockElement.style.position = 'absolute';
    mockElement.style.left = '100px';
    mockElement.style.top = '100px';
    mockElement.style.width = '200px';
    mockElement.style.height = '200px';
    document.body.appendChild(mockElement);

    // Set up the parent element ref
    parentEl.value = mockElement;
  });

  afterEach(() => {
    // Clean up the mock element
    document.body.removeChild(mockElement);
    parentEl.value = null;
  });

  it('should update mouse coordinates relative to the parent element', () => {
    const { mouse } = useMouse(parentEl);

    // Simulate a mousemove event
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
    });
    window.dispatchEvent(mouseEvent);

    expect(mouse.x).toBe(50); // 150 - 100 (left offset)
    expect(mouse.y).toBe(50); // 150 - 100 (top offset)
  });

  it('should not update mouse coordinates if parent element is null', () => {
    parentEl.value = null;
    const { mouse } = useMouse(parentEl);

    // Simulate a mousemove event
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: 150,
      clientY: 150,
    });
    window.dispatchEvent(mouseEvent);

    expect(mouse.x).toBe(0);
    expect(mouse.y).toBe(0);
  });

  it('should clean up event listeners on unmount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { mouse } = useMouse(parentEl);

    // Ensure addEventListener was called
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

    // Simulate component unmount
    parentEl.value = null;

    // Ensure removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});