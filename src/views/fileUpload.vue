<template>
  <div>
    <ChunkUpload 
      v-model="fileList"
      :chunk-size="5 * 1024 * 1024"
      :file-size="500"
      :file-type="['pdf', 'doc', 'docx','jpg']"
    />
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import ChunkUpload from '../components/upload1.vue'
  
const fileList = ref('')
</script>
  