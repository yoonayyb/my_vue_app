<template>
  <div class="upload-file">
    <el-upload
      v-if="!disabled"
      ref="fileUpload"
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :show-file-list="false"
      :headers="headers"
      :http-request="customUpload"
      class="upload-file-uploader"
      drag
    >
      <!-- 上传按钮 -->
      <el-button
        v-if="!isUploadBtn"
        type="primary"
      >
        选取文件
      </el-button>
      <slot
        v-else
        name="btn"
      />
    </el-upload>

    <!-- 上传提示 -->
    <div
      v-if="showTip && !disabled"
      class="el-upload__tip"
    >
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      的文件
    </div>

    <!-- 文件列表 -->
    <transition-group
      v-if="showTip"
      ref="uploadFileList"
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        v-for="(file, index) in fileList"
        :key="file.uid"
        class="el-upload-list__item ele-upload-list__item-content"
      >
        <el-link
          :href="file.url"
          :underline="false"
          target="_blank"
        >
          <span class="el-icon-document"> {{ getFileName(file.name) }} </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link
            v-if="!disabled"
            :underline="false"
            type="danger"
            @click="handleDelete(index)"
          >
            &nbsp;删除
          </el-link>
        </div>
        <div
          v-if="file.status === 'uploading'"
          class="upload-progress"
        >
          <el-progress :percentage="file.progress || 0" />
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
// import { getToken } from '@/utils/auth';
import { uploadFileChunk, checkFileChunk } from '@/api/file/uploadFile';
import { ElMessage } from 'element-plus';
import Sortable from 'sortablejs';
import SparkMD5 from 'spark-md5';

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  modelValue: [String, Object, Array],
  // 分片上传地址
  action: {
    type: String,
    default: '/file/uploadBig',
  },
  // 检查文件地址
  checkAction: {
    type: String,
    default: '/file/checkFile',
  },
  // 分片大小 (默认 5MB)
  chunkSize: {
    type: Number,
    default: 5 * 1024 * 1024,
  },
  // 上传携带的参数
  // eslint-disable-next-line vue/require-default-prop
  data: {
    type: Object,
  },
  // 数量限制
  limit: {
    type: Number,
    default: 5,
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 50000,
  },
  // 文件类型
  fileType: {
    type: Array,
    default: () => ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'pdf','jpg'],
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true,
  },
  // 禁用组件
  disabled: {
    type: Boolean,
    default: false,
  },
  // 拖动排序
  drag: {
    type: Boolean,
    default: true,
  },
  // 上传按钮使用插槽
  isUploadBtn: {
    type: Boolean,
    default: false,
  },
  // 自定义返回参数
  customParams: {
    type: Boolean,
    default: false,
  },
  // 是否支持重复上传
  isRepeat: {
    type: Boolean,
    default: false,
  },
});

const { proxy } = getCurrentInstance();
console.log("🚀 ~ proxy:", proxy)
// proxy.$modal(
//         `文件格式不正确，请上传${props.fileType.join('/')}格式文件!`
//       );
const emit = defineEmits([]);
const number = ref(0);
const uploadList = ref([]);
const uploadFileUrl = ref(import.meta.env.VITE_APP_BASE_API + props.action);
const baseCdnUrl = import.meta.env.VITE_APP_BASE_CDN;
const headers = ref({ Authorization: 'Bearer ' + localStorage.getItem('token') });
const fileList = ref([]);
const showTip = computed(
  () => props.isShowTip && (props.fileType || props.fileSize)
);

watch(
  () => props.modelValue,
  (val) => {
    if (val && !props.isRepeat) {
      let temp = 1;
      const list = Array.isArray(val) ? val : props.modelValue.split(',');
      fileList.value = list.map((item) => {
        if (typeof item === 'string') {
          item = { name: baseCdnUrl + item, url: baseCdnUrl + item };
        }
        item.uid = item.uid || new Date().getTime() + temp++;
        return item;
      });
    } else {
      fileList.value = [];
      number.value = 0;
      return [];
    }
  },
  { deep: true, immediate: true }
);

// 上传前校检
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType.length) {
    const fileName = file.name.split('.');
    const fileExt = fileName[fileName.length - 1];
    const isTypeOk = props.fileType.indexOf(fileExt) >= 0;
    
    if (!isTypeOk) {
    //   proxy.$modal.msgError(
    //     `文件格式不正确，请上传${props.fileType.join('/')}格式文件!`
    //   );
    ElMessage.error(`文件格式不正确，请上传${props.fileType.join('/')}格式文件!`);
      return false;
    }
  }
  // 校检文件名
  if (file.name.includes(',')) {
    // proxy.$modal.msgError('文件名不正确，不能包含英文逗号!');
    ElMessage.error('文件名不正确，不能包含英文逗号!');
    
    return false;
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize;
    if (!isLt) {
    //   proxy.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`);
    ElMessage.error(`上传文件大小不能超过 ${props.fileSize} MB!`);
      return false;
    }
  }
//   proxy.$modal.loading('正在处理上传文件，请稍候...');
    // ElMessage.loading('正在处理上传文件，请稍候...');
    console.log('正在处理上传文件，请稍候...');
  number.value++;
  return true;
}

// 计算MD5
function computeMD5(file) {
  return new Promise((resolve, reject) => {
    const blobSlice =
      File.prototype.slice ||
      File.prototype.mozSlice ||
      File.prototype.webkitSlice;
    const chunkSize = 2097152; // 2MB
    const chunks = Math.ceil(file.size / chunkSize);

    let currentChunk = 0;
    const spark = new SparkMD5.ArrayBuffer();
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      spark.append(e.target.result);
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        resolve(md5);
      }
    };

    fileReader.onerror = function () {
      reject('MD5 computation failed');
    };

    function loadNext() {
      const start = currentChunk * chunkSize;
      const end =
        start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
}

// 自定义上传
async function customUpload(options) {
  const { file } = options;

  // 初始化进度
  const fileIndex = fileList.value.findIndex((f) => f.uid === file.uid);
  if (fileIndex === -1) {
    fileList.value.push({
      name: file.name,
      uid: file.uid,
      status: 'uploading',
      progress: 0,
    });
  }

  try {
    // 1. 计算文件MD5
    const md5 = await computeMD5(file);

    // 2. 检查文件状态（秒传/断点续传）
    const checkRes = await checkFileChunk({ md5 });

    if (checkRes.code === 200 && checkRes.data && checkRes.data.relativePath) {
      // 秒传成功
      const successRes = {
        code: 200,
        msg: '操作成功',
        data: {
          relativePath: checkRes.data.relativePath,
          url: checkRes.data.relativePath,
        },
      };
      updateFileProgress(file.uid, 100);
      handleUploadSuccess(successRes, file);
      return;
    }

    // 获取已上传的分片状态
    const uploadedStatus = checkRes.data?.chucks || '';
    const chunks = createChunks(file, props.chunkSize);
    const totalChunks = chunks.length;

    // 3. 逐个上传分片
    for (let i = 0; i < totalChunks; i++) {
      // 检查当前分片是否已上传
      if (uploadedStatus.length > i && uploadedStatus[i] === '1') {
        const progress = Math.ceil(((i + 1) / totalChunks) * 100);
        updateFileProgress(file.uid, progress);
        // proxy.$modal.loadingText('正在上传文件，已完成 ' + progress + '%');
        ElMessage.success('正在上传文件，已完成 ' + progress + '%');
        continue;
      }

      let fileName = file.name;
      const formData = new FormData();
      formData.append('file', new File([chunks[i]], fileName));
      formData.append('chunkNumber', i);
      formData.append('chunkSize', props.chunkSize);
      formData.append('totalNumber', totalChunks);
      formData.append('md5', md5);

      // 添加额外参数
      if (props.data) {
        Object.keys(props.data).forEach((key) => {
          formData.append(key, props.data[key]);
        });
      }

      const res = await uploadFileChunk(formData);

      if (res.code === 200) {
        if (i === totalChunks - 1) {
          updateFileProgress(file.uid, 100);
          handleUploadSuccess(res, file);
        //   proxy.$modal.msgSuccess('文件上传成功');
        ElMessage.success('文件上传成功');
          return;
        }
      } else {
        throw new Error(res.msg || '上传失败');
      }

      // 更新进度
      const progress = Math.ceil(((i + 1) / totalChunks) * 100);
      updateFileProgress(file.uid, progress);
    //   proxy.$modal.loadingText('正在上传文件，已完成 ' + progress + '%');
    ElMessage.success('正在上传文件，已完成 ' + progress + '%');
    }
  } catch (err) {
    handleUploadError(err);
  }
}

// 创建分片
function createChunks(file, chunkSize) {
  const chunks = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push(file.slice(cur, cur + chunkSize));
    cur += chunkSize;
  }
  return chunks;
}

// 更新文件进度
function updateFileProgress(uid, progress) {
  const item = fileList.value.find((f) => f.uid === uid);
  if (item) {
    item.progress = progress;
  }
}

// 文件个数超出
function handleExceed() {
//   proxy.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个!`);
  ElMessage.error(`上传文件数量不能超过 ${props.limit} 个!`);
}

// 上传失败
function handleUploadError(err) {
  console.error(err);
  ElMessage.error('上传文件失败');
  proxy.$modal.msgError('上传文件失败');
  
//   proxy.$modal.closeLoading();

  fileList.value = fileList.value.filter((f) => f.status !== 'uploading');
  number.value--;
}

// 上传成功回调
function handleUploadSuccess(res, file) {
  if (!res) return;
  if (res.code === 200) {
    if (props.customParams) {
      emit('update:files', { url: res.data?.relativePath });
    //   proxy.$modal.closeLoading();
      return;
    }
    const url = res.data.relativePath || res.data.url || res.data.path;
    uploadList.value.push({ name: url, url: url });
    uploadedSuccessfully();
  } else {
    number.value--;
    // proxy.$modal.closeLoading();
    // proxy.$modal.msgError(res.msg);
    ElMessage.error(res.msg);
    uploadedSuccessfully();
  }
}

// 删除文件
function handleDelete(index) {
  fileList.value.splice(index, 1);
  emit('update:modelValue', listToString(fileList.value));
}

// 上传结束处理
function uploadedSuccessfully() {
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value
      .filter((f) => f.status !== 'uploading')
      .concat(uploadList.value);
    uploadList.value = [];
    number.value = 0;
    emit('update:modelValue', listToString(fileList.value));
    // proxy.$modal.closeLoading();
  }
}

// 获取文件名称
function getFileName(name) {
  if (name.lastIndexOf('/') > -1) {
    return name.slice(name.lastIndexOf('/') + 1);
  } else {
    return name;
  }
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
  let strs = '';
  separator = separator || ',';
  for (let i in list) {
    if (list[i].url) {
      strs += list[i].url + separator;
    }
  }
  return strs != '' ? strs.substr(0, strs.length - 1) : '';
}

// 初始化拖拽排序
onMounted(() => {
  if (props.drag && !props.disabled) {
    nextTick(() => {
      const element =
        proxy.$refs.uploadFileList?.$el || proxy.$refs.uploadFileList;
      if (element) {
        Sortable.create(element, {
          ghostClass: 'file-upload-darg',
          onEnd: (evt) => {
            const movedItem = fileList.value.splice(evt.oldIndex, 1)[0];
            fileList.value.splice(evt.newIndex, 0, movedItem);
            emit('update:modelValue', listToString(fileList.value));
          },
        });
      }
    });
  }
});
</script>

<style scoped lang="scss">
.file-upload-darg {
  opacity: 0.5;
  background: #c8ebfb;
}

.upload-file-uploader {
  margin-bottom: 5px;
}

.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
  transition: none !important;
}

.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
  flex-wrap: wrap;
}

.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}

.upload-progress {
  width: 100%;
  padding: 0 10px;
  margin-top: 5px;
}
</style>
