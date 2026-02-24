// worker.js (Worker 线程)
self.onmessage = function(event) {
    console.log('Worker 收到消息:', event.data);
    
    // 模拟耗时计算
    const result = heavyCalculation();
    
    // 发送结果回主线程 → 触发主线程的 onmessage
    self.postMessage({ result, type: 'calculation_complete' });
};

function heavyCalculation() {
    // 模拟 2 秒计算
    const start = Date.now();
    while (Date.now() - start < 2000) {}
    return 42;
}