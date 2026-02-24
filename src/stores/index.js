import { defineStore } from 'pinia'

// 定义并导出主 Store
export const useMainStore = defineStore('main', {
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
    },
})
