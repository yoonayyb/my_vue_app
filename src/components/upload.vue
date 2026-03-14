<template>
  <div>
    <!-- 使用 el-upload 组件，禁用默认上传，改为自定义处理 -->
    <el-upload
      ref="uploadRef"
      :action="uploadUrl"
      :auto-upload="false"
      :multiple="false"
      :show-file-list="false"
      :on-change="handleFileChange"
      drag
    >
      <div class="upload-area">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div class="el-upload__tip">
          支持上传任意类型文件，且不超过100MB
        </div>
      </div>
    </el-upload>
    
    <!-- 文件列表（支持拖拽排序） -->
    <div v-if="fileList.length > 0" class="file-list">
      <draggable
        v-model="fileList"
        item-key="uid"
        @change="handleDragChange"
      >
        <template #item="{ element }">
          <div class="file-item">
            <div class="file-info">
              <el-icon class="file-icon"><document /></el-icon>
              <div class="file-details">
                <div class="file-name">{{ element.name }}</div>
                <div class="file-size">{{ formatFileSize(element.size) }}</div>
              </div>
            </div>
            <div class="file-actions">
              <el-progress 
                v-if="element.status === 'uploading'" 
                :percentage="element.percentage || 0" 
                :stroke-width="6"
              />
              <el-button 
                v-if="element.status === 'ready'" 
                type="primary" 
                size="small" 
                @click="startUpload(element)"
              >
                上传
              </el-button>
              <el-button 
                v-if="element.status === 'uploading'" 
                type="danger" 
                size="small" 
                @click="pauseUpload(element)"
              >
                暂停
              </el-button>
              <el-button 
                v-if="element.status === 'paused'" 
                type="primary" 
                size="small" 
                @click="resumeUpload(element)"
              >
                继续
              </el-button>
              <el-button 
                type="danger" 
                size="small" 
                @click="removeFile(element)"
              >
                删除
              </el-button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { UploadFilled, Document } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import type { UploadFile, UploadUserFile } from 'element-plus';
type CustomUploadStatus = 'ready' | 'uploading' | 'success' | 'paused';
// 扩展 UploadUserFile 类型
interface CustomUploadFile extends Omit<UploadUserFile, 'status'> {
  status?: CustomUploadStatus;
  percentage?: number;
}

const uploadRef = ref();
const progress = ref(0);
const chunkSize = 1024 * 1024; // 分片大小 1MB
const uploadUrl = '/api/upload'; // 后端上传接口
const fileList = ref<CustomUploadFile[]>([]);
const uploadingFiles = ref<Map<string, AbortController>>(new Map());

// 处理文件选择
const handleFileChange = (file: UploadFile) => {
  // 文件验证：例如大小限制 100MB
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size && file.size > maxSize) {
    ElMessage.error('文件大小超过 100MB');
    return false; // 阻止添加
  }
  
  // 添加到文件列表
  fileList.value.push({
    ...file,
    status: 'ready',
    percentage: 0
  });
  
  return false; // 阻止自动上传
};

// 开始上传
const startUpload = async (file: CustomUploadFile) => {
  if (!file.raw || !file.uid) return;
  
  file.status = 'uploading';
  
  try {
    const md5 = await calculateMD5(file.raw);
    const exists = await checkFileExists(md5, file.name);
    
    if (exists) {
      ElMessage.success('文件已存在，秒传成功');
      file.status = 'success';
      file.percentage = 100;
      return;
    }
    
    // 创建上传控制器
    const controller = new AbortController();
    uploadingFiles.value.set(file.uid.toString(), controller);
    
    // 分片上传
    await uploadChunks(file.raw, md5, file, controller.signal);
    
    // 合并分片
    await mergeChunks(md5, file.name);
    
    ElMessage.success('上传完成');
    file.status = 'success';
    file.percentage = 100;
  } catch (error) {
    if (error instanceof Error && error.name !== 'AbortError') {
      ElMessage.error('上传失败，稍后重试');
      file.status = 'ready';
    }
  } finally {
    uploadingFiles.value.delete(file.uid.toString());
  }
};

// 暂停上传
const pauseUpload = (file: CustomUploadFile) => {
  if (!file.uid) return;
  const controller = uploadingFiles.value.get(file.uid.toString());
  if (controller) {
    controller.abort();
    file.status = 'paused';
  }
};

// 继续上传
const resumeUpload = async (file: CustomUploadFile) => {
  await startUpload(file);
};

// 删除文件
const removeFile = (file: CustomUploadFile) => {
  if (!file.uid) return;
  const index = fileList.value.findIndex(item => item.uid === file.uid);
  if (index !== -1) {
    // 如果正在上传，先取消上传
    if (file.status === 'uploading') {
      const controller = uploadingFiles.value.get(file.uid.toString());
      if (controller) {
        controller.abort();
        uploadingFiles.value.delete(file.uid.toString());
      }
    }
    
    fileList.value.splice(index, 1);
  }
};

// 分片上传
const uploadChunks = async (
  file: File, 
  md5: string, 
  fileItem: CustomUploadFile, 
  signal: AbortSignal
) => {
  const chunks = createChunks(file);
  const uploadedChunks = getUploadedChunks(md5);
  
  for (let i = 0; i < chunks.length; i++) {
    if (uploadedChunks.includes(i)) continue; // 跳过已上传分片
    
    const formData = new FormData();
    formData.append('file', chunks[i]);
    formData.append('chunkNumber', i.toString());
    formData.append('chunkSize', chunkSize.toString());
    formData.append('totalNumber', chunks.length.toString());
    formData.append('md5', md5);
    
    try {
      await fetch(uploadUrl, { 
        method: 'POST', 
        body: formData,
        signal
      });
      
      uploadedChunks.push(i);
      saveUploadedChunks(md5, uploadedChunks);
      fileItem.percentage = Math.round(((i + 1) / chunks.length) * 100);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error; // 重新抛出中止错误
      }
      throw error; // 重新抛出其他错误
    }
  }
};

// 创建分片
const createChunks = (file: File) => {
  const chunks = [];
  for (let i = 0; i < file.size; i += chunkSize) {
    chunks.push(file.slice(i, i + chunkSize));
  }
  return chunks;
};

// 计算 MD5（使用 Worker）
const calculateMD5 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('@/plugins/worker.ts', import.meta.url), { type: 'module' });
    worker.postMessage({ file });
    worker.onmessage = (e) => {
      console.log("🚀 ~ calculateMD5 ~ e:", e)
      resolve(e.data.md5);
      worker.terminate();
    };
  });
};

// 检查文件是否存在（秒传）
const checkFileExists = async (md5: string, fileName: string) => {
  const response = await fetch(`/api/check?md5=${md5}&name=${fileName}`);
  const data = await response.json();
  return data.exists;
};

// 合并分片
const mergeChunks = async (md5: string, fileName: string) => {
  await fetch('/api/merge', {
    method: 'POST',
    body: JSON.stringify({ md5, name: fileName }),
    headers: { 'Content-Type': 'application/json' },
  });
};

// 本地存储已上传分片（断点续传）
const saveUploadedChunks = (md5: string, chunks: number[]) => {
  localStorage.setItem(`uploaded_${md5}`, JSON.stringify(chunks));
};

const getUploadedChunks = (md5: string): number[] => {
  const data = localStorage.getItem(`uploaded_${md5}`);
  return data ? JSON.parse(data) : [];
};

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

// 处理拖拽排序变化
const handleDragChange = () => {
  // 可以在这里添加拖拽排序后的逻辑
  console.log('文件列表顺序已更新');
};
</script>

<style scoped>
.upload-area {
  text-align: center;
  padding: 20px 0;
}

.file-list {
  margin-top: 20px;
}

.file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f5f7fa;
  border-radius: 4px;
  transition: all 0.3s;
}

.file-item:hover {
  background-color: #ecf5ff;
}

.file-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.file-icon {
  margin-right: 10px;
  font-size: 20px;
  color: #409eff;
}

.file-details {
  flex: 1;
}

.file-name {
  font-size: 14px;
  color: #303133;
  margin-bottom: 4px;
}

.file-size {
  font-size: 12px;
  color: #909399;
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-progress {
  width: 150px;
}
</style>
