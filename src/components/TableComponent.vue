<template>
  <div style="perspective: 1000px;">
    <div class="stroke-text">
      描边动画
    </div>
    <div class="multi-stroke">
      描边动画
    </div>
    <div class="neon-text">
      描边动画
    </div>
    <div class=" gradient-stroke">
      描边动画
    </div>
    <div class=" d3-stroke">
      描边动画
    </div>
    <div class=" breathing-stroke">
      描边动画
    </div>

    <video
      ref="videoRef"
      controls
      width="600"
      @timeupdate="handleTimeUpdate"
    >
      <source
        src="https://mirror.aarnet.edu.au/pub/TED-talks/911Mothers_2010W-light.mp4"
        type="video/mp4"
      >
    </video>

    <div class="controls">
      <!-- 速率控制 -->
      <button
        v-for="speed in speedOptions"
        :key="speed"
        :class="{ active: currentSpeed === speed }"
        @click="changeSpeed(speed)"
      >
        {{ speed }}x
      </button>

      <!-- 时间跳转 -->
      <input
        v-model.number="seekTime"
        type="number"
        placeholder="秒数"
        min="0"
        :max="duration"
      >
      <button @click="seekTo">
        跳转
      </button>

      <!-- 快捷跳转 -->
      <button @click="seekBy(-10)">
        -10s
      </button>
      <button @click="seekBy(10)">
        +10s
      </button>

      <div>当前时间: {{ currentTime }} / {{ duration }}秒</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const videoRef = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const currentSpeed = ref(1)
const seekTime = ref(0)

const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

// 改变播放速率
const changeSpeed = (speed) => {
  if (videoRef.value) {
    videoRef.value.playbackRate = speed
    currentSpeed.value = speed
  }
}

// 跳转到指定时间
const seekTo = () => {
  if (videoRef.value) {
    videoRef.value.currentTime = Math.max(0, Math.min(seekTime.value, duration.value))
  }
}

// 相对跳转
const seekBy = (seconds) => {
  if (videoRef.value) {
    videoRef.value.currentTime += seconds
  }
}

// 监听时间更新
const handleTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = Math.floor(videoRef.value.currentTime)
  }
}

// 视频加载完成
onMounted(() => {
  const video = videoRef.value
  if (video) {
    video.addEventListener('loadedmetadata', () => {
      duration.value = Math.floor(video.duration)
    })
  }
})
</script>

<style scoped>
.controls {
  margin-top: 10px;
}

.active {
  background-color: #007bff;
  color: white;
}

.stroke-text {
  font-size: 80px;
  font-weight: bold;
  color: transparent;
  animation: stroke-animation 3s infinite alternate;
}

@keyframes stroke-animation {
  0% {
    -webkit-text-stroke: 3px #ff6b6b;
    text-shadow: 0 0 20px #ff6b6b;
  }

  25% {
    -webkit-text-stroke: 3px #4ecdc4;
    text-shadow: 0 0 20px #4ecdc4;
  }

  50% {
    -webkit-text-stroke: 3px #45b7d1;
    text-shadow: 0 0 20px #45b7d1;
  }

  75% {
    -webkit-text-stroke: 3px #96ceb4;
    text-shadow: 0 0 20px #96ceb4;
  }

  100% {
    -webkit-text-stroke: 3px #feca57;
    text-shadow: 0 0 20px #feca57;
  }
}

.multi-stroke {
  font-size: 100px;
  color: #fff;
  text-align: center;
  animation: multi-stroke-anim 4s ease-in-out infinite;
}

@keyframes multi-stroke-anim {

  0%,
  100% {
    text-shadow:
      3px 3px 0 #ff6b6b,
      -3px -3px 0 #4ecdc4,
      3px -3px 0 #45b7d1,
      -3px 3px 0 #96ceb4;
  }

  50% {
    text-shadow:
      6px 6px 0 #ff6b6b,
      -6px -6px 0 #4ecdc4,
      6px -6px 0 #45b7d1,
      -6px 6px 0 #96ceb4,
      0 0 30px rgba(255, 255, 255, 0.8);
  }
}

.neon-text {
  font-size: 90px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  animation: neon-flicker 3.5s infinite alternate;
}

@keyframes neon-flicker {

  0%,
  18%,
  22%,
  25%,
  53%,
  57%,
  100% {
    text-shadow:
      0 0 4px #fff,
      0 0 11px #fff,
      0 0 19px #fff,
      0 0 40px #0fa,
      0 0 80px #0fa,
      0 0 90px #0fa,
      0 0 100px #0fa,
      0 0 150px #0fa;
  }

  20%,
  24%,
  55% {
    text-shadow: none;
  }
}

.gradient-stroke {
  font-size: 85px;
  color: transparent;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-stroke: 2px transparent;
  animation: gradient-stroke-anim 3s ease infinite, stroke-move 2s ease-in-out infinite alternate;
}

@keyframes gradient-stroke-anim {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

@keyframes stroke-move {
  0% {
    text-shadow: 3px 3px 0 rgba(255, 255, 255, 0.3);
  }

  100% {
    text-shadow: -3px -3px 0 rgba(255, 255, 255, 0.3);
  }
}

.d3-stroke {
  font-size: 100px;
  color: #ecf0f1;
  transform-style: preserve-3d;
  animation: d3-stroke-anim 4s infinite alternate;
}

@keyframes d3-stroke-anim {
  0% {
    text-shadow:
      1px 1px 0 #e74c3c,
      2px 2px 0 #e74c3c,
      3px 3px 0 #e74c3c,
      4px 4px 0 #e74c3c,
      5px 5px 0 #e74c3c,
      6px 6px 0 #e74c3c,
      7px 7px 20px rgba(0, 0, 0, 0.5);
    transform: rotateY(0deg);
  }

  100% {
    text-shadow:
      1px 1px 0 #3498db,
      2px 2px 0 #3498db,
      3px 3px 0 #3498db,
      4px 4px 0 #3498db,
      5px 5px 0 #3498db,
      6px 6px 0 #3498db,
      7px 7px 30px rgba(0, 0, 0, 0.8);
    transform: rotateY(20deg);
  }
}
.breathing-stroke {
            font-size: 70px;
            font-weight: bold;
            color: transparent;
            animation: breathing 3s ease-in-out infinite;
        }
        
        @keyframes breathing {
            0% {
                -webkit-text-stroke: 1px #ff6b6b;
                text-shadow: 0 0 5px #ff6b6b;
                transform: scale(1);
            }
            50% {
                -webkit-text-stroke: 4px #ff6b6b;
                text-shadow: 0 0 20px #ff6b6b, 0 0 30px #ff6b6b;
                transform: scale(1.1);
            }
            100% {
                -webkit-text-stroke: 1px #ff6b6b;
                text-shadow: 0 0 5px #ff6b6b;
                transform: scale(1);
            }
        }
</style>