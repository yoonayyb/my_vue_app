
interface MyPromise<T> {
    then(onFulfilled: (value: T) => any, onRejected?: (reason: any) => any): MyPromise<any>;
    catch(onRejected: (reason: any) => any): MyPromise<any>;
    finally(onFinally: () => any): MyPromise<any>;
}

interface MyPromiseExecutor<T> {
    (resolve: (value: T) => void, reject: (reason?: any) => void): void;

}
function myPromise<T>(this: any, executor: MyPromiseExecutor<T>): MyPromise<T> {
    // TODO: implement the MyPromise function
    //状态：pending、fulfilled、rejected
    this.state = 'pending';
    //成功结果、失败原因
    this.value = undefined;
    this.reason = undefined;
    const resolve = (value: T) => {
        if (this.state === 'pending') {
            this.state = 'fulfilled';
            this.value = value;
        }
    }
    const reject = (reason: any) => {
        if (this.state === 'pending') {
            this.state = 'rejected';
            this.reason = reason;
        }
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
    return this;
}

myPromise.prototype.then = function<T>(this: MyPromise<T>, onFulfilled: (value: T) => any, onRejected?: (reason: any) => any) {
    // TODO: implement the then function
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    const c = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason };
}
//判断对象是否存在循环引用
function isCycle(obj: any) {
    const stack: any[] = [];
    const visited = new WeakSet();
    while (obj) {
        if (stack.includes(obj)) {
            return true;
        }
        if (visited.has(obj)) {
            break;
        }
        stack.push(obj);
        visited.add(obj);
        obj = obj.__proto__;
    }
    return false;
}
function hasCircularReference(obj: any) {
    const seenObjects = new WeakSet();
    function detect(obj: any): boolean {
        if (obj && typeof obj === 'object') {
            if (seenObjects.has(obj)) {
                return true;
            }
            seenObjects.add(obj);
            for (const key in obj) {
                if (obj.hasOwnProperty(key) && detect(obj[key])) {
                    return true;
                }
            }
        }
        return false;
    }
    return detect(obj);
}
type DateType = Date 
function isDate(value: DateType): boolean {
    return Object.prototype.toString.call(value) === '[object Date]';
    
}