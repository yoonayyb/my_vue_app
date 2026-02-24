
import type { Ref }  from 'vue'
export interface IStore {
    save(key: string, value: any): Promise<void>;
    get(key: string): Promise<any>;
    remove(key: string): Promise<void>;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;

}


export const storeCount = reactive({
  count: 0
})
export const setCount: () => [Ref<number>, (value: number) => void] = () => {
    let count:Ref<number> = ref(1) 
    const increment = (arg:number) => {
        count.value++
        console.log("🚀 ~ increment ~ count:", count.value)
        
    }
    return [ count,increment ]
}