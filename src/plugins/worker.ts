/*
已替换为更健壮的 Worker 实现：
- 使用 Blob.arrayBuffer() 逐块读取（基于 Promise，更简洁）
- 上报进度（type: 'progress'），完成(type: 'done')，错误(type: 'error'）
- 完成后 self.close()
- TypeScript: 顶部添加 webworker 引用
*/
/// <reference lib="webworker" />
import SparkMD5 from 'spark-md5';

self.addEventListener('message', async (e: MessageEvent) => {
  try {
    const { file, chunkSize = 2 * 1024 * 1024 } = e.data as { file: File; chunkSize?: number };
    if (!file || typeof file.size !== 'number') throw new Error('Invalid file');

    const sparkAll = new SparkMD5.ArrayBuffer(); // 用于整体哈希
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let idx = 0; idx < totalChunks; idx++) {
      const start = idx * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const blob = file.slice(start, end);
      // @ts-ignore
      const buffer = await blob.arrayBuffer();

      // 分片哈希（用于断点续传校验）
      const chunkMd5 = SparkMD5.ArrayBuffer.hash(buffer);
      // 累计用于全文件哈希
      sparkAll.append(buffer);

      // 发回分片哈希与进度
      self.postMessage({
        type: 'chunk',
        index: idx,
        chunkMd5,
        current: idx + 1,
        total: totalChunks,
      });
    }

    const fileMd5 = sparkAll.end();
    // 可同时返回用于缓存的 fingerprint（建议用 size-lastModified）
    const fingerprint = `${file.size}-${(file as any).lastModified ?? 0}`;
    self.postMessage({ type: 'done', md5: fileMd5, fingerprint });
  } catch (err: any) {
    self.postMessage({ type: 'error', message: err?.message ?? String(err) });
  } finally {
    try { self.close(); } catch (_) {}
  }
});
