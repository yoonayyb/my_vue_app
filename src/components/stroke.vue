



<script>
import { ref, onMounted } from 'vue';

export default {
  props: {
    animationDuration: {
      type: Number,
      default: 2000, // 默认动画持续时间
    },
    strokeColor: {
      type: String,
      default: 'black', // 默认路径颜色
    },
  },
  setup(props) {
    const pathLength = ref(0);
    const strokeDashOffset = ref(0);
    const pathRef = ref(null);

    onMounted(() => {
      const path = pathRef.value;
      pathLength.value = path.getTotalLength();
      strokeDashOffset.value = pathLength.value;

      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / props.animationDuration, 1);
        strokeDashOffset.value = pathLength.value * (1 - progress);

        if (progress < 1) {
          // 自动传递 currentTime
          requestAnimationFrame(animate);
        }
      };
      // 初始调用
      requestAnimationFrame(animate);
    });

    return {
      pathRef,
      pathLength,
      strokeDashOffset,
    };
  },
};
</script>
<template>
  <!-- <path
      ref="pathRef"
      d="M10 80 C40 10, 65 10, 95 80"
      :stroke="strokeColor"
      stroke-width="2"
      fill="none"
      :stroke-dasharray="pathLength"
      :stroke-dashoffset="strokeDashOffset"
    /> -->
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <!-- 第一撇 -->
    <path
      class="stroke stroke1"
      d="M30,20 Q45,50 40,80"
    />
    <!-- 第二捺 -->
    <path
      class="stroke stroke2"
      d="M40,30 Q60,50 70,80"
    />
  </svg>
</template>
<style scoped>
 h1 {
            color: white;
            margin-bottom: 30px;
            font-size: 2.5rem;
            text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }
        
        .paper {
            width: 300px;
            height: 300px;
            background: #fefefe;
            border-radius: 5px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
        }
        
        .stroke {
            fill: none;
            stroke: #333;
            stroke-width: 8;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 222;
            stroke-dashoffset: 222;
        }
        
        .stroke1 {
            animation: drawStroke 2s ease-in-out forwards;
        }
        
        .stroke2 {
            animation: drawStroke 2s ease-in-out forwards;
            animation-delay: 2s;
        }
        
        @keyframes drawStroke {
            to {
                stroke-dashoffset: 0;
            }
        }
        
        .description {
            color: white;
            margin-top: 20px;
            line-height: 1.5;
        }
</style>