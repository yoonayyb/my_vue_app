

const privateData = new WeakMap();
class Person {
  private name: string = 'asd';

  constructor(name: string) {
    this.name = name;
  }

  public greet() {
    console.log(`Hello, my name is ${this.name}!`);
  }
  proxy = new Proxy(this, {
    get(target, prop, receiver) {
      if (prop === 'name') {
        throw new Error(`属性 '${String(prop)}' 是私有的，只能在类 '${target.constructor.name}' 中访问。`);
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}

const john = new Person("John");
john.greet(); // 输出: Hello, my name is John!
console.log(11111111,john["name"],john.proxy); // 错误: 属性 'name' 是私有的，只能在类 'Person' 中访问。
interface Lengthwise {
    length: number;
}
function identity<T extends Lengthwise>(arg: T): T {
  return  arg;
}

let myIdentity:<T extends Lengthwise>(arg:T)=>T
let a :string
interface fn {
    <T>(arg:T):T
}
let aa:fn = (arg)=>{
    return arg
}
function getObject<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

let xxx = {a:1,b:2,c:3}
let yyy = getObject<typeof xxx, keyof typeof xxx>(xxx, 'a')
console.log("🚀 ~ yyy:", yyy)
let ddd = getObject({c:2},'c')
console.log("🚀 ~ ddd:", ddd)
class beekeeper {
    hasMask: boolean;
}
class zooKeeper {
    name_tag: string = 'asd';
    
}
class Animal {
    numLegs: number;
    private _isAnimal: boolean;
}
class Bee extends Animal {
    keeper: beekeeper;
}
class Lion extends Animal {
    keeper: zooKeeper = new zooKeeper();
}
class ccc {
    numLegs: number;
}
function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}
createInstance(Lion).keeper.name_tag;
createInstance(Bee).keeper;
console.log("🚀 ~ createInstance(Bee).keeper;:", createInstance(Lion).keeper.name_tag)
// createInstance(ccc)
const enum Enum {
    A =1,
    B
}

console.log('enum',Enum.A,Enum['1'])
interface Animal2 {
    name: string;
    age: number;
    speak(name:string):string
 }
    
class Dog implements Animal2 {
    name: string ;
    age: number  ;
    constructor(name:string){
        this.name = name
    }
    speak() {
        return `woof ${this.name}`;
    }
}
    
const buddy = new Dog("Buddy");
console.log(buddy.speak()); 
function foo(x:number){
    if(x !== 1 && x !==2){

    }
}
const PASSWORD = Symbol()

class Login {
    #pawd='123'
    static count = 0
    username: string
  constructor(username, password) {
    this.username = username
    this[PASSWORD] = password
    this.#pawd = password
  }

  checkPassword(pwd) {
    this.#pawd = pwd
      return this[PASSWORD] === pwd
  }
}
// console.log('Login',Login)
export default Login
enum RoleEnum {
    // super admin
    SUPER = 'super',
  
    // tester
    TEST = 'test',
  }
  type User = {
    id?: number;
    name?: string;
  };
  interface RouteMeta {
    roles?: User;
  }
  let  router: RouteMeta = {
    roles: { id: 1, name: '111' },
  }
  console.log("🚀 ~ router:", router)
  console.log("🚀 ~ RoleEnum:", RoleEnum)
  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }
  interface Box<Type> {
    contents: Type;
  }
  interface Comparator<T> {
    compareTo(value: T): number;
  }
  
  class Rectangle implements Comparator<Rectangle> {
    compareTo(value: Rectangle): number {
      return 1
    }
  }
  let rec = new Rectangle()
  type Container<T = number> = { value: T };
  function getFirst<T extends number,U extends number>(arr: T[],...v:U[]): number {
    const a = v[0]
    return arr[0] + a;
  }
  let a1:Container<string> = {value:'2'}

  getFirst<number,number>([1])//类型推断为number
  type Tree<T> = {
    value: T;
    left: Tree<T> | null;
    right: Tree<T> | null;
  };
  const tree: Tree<number> = {
    value: 1,
    left: {
      value: 2,
      left: null,
      right: null,
    },
    right: {
      value: 3,
      left: null,
      right: null,
    },
  };
  function comp<Tp extends  {length:number}, U extends Tp>(a: Tp, b: U) {
    if (a.length >= b.length) {
      return a;
    }
    return b;
  }
  comp({length:1}, [1, 2, 3]); // 正确
type OrNull<Type> = Type | undefined | null;

type OneOrMany<Type> = Type | Type[] ;

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;
let aaa:OneOrManyOrNull<undefined> = [undefined,undefined]






type PipeFunction<T> = (arg: T) => T;

const pipe = <T>(...fns: PipeFunction<T>[]): PipeFunction<T> => {
  if (fns.length === 0) return (arg) => arg;
  return (arg: T) => fns.reduce((acc, fn) => fn(acc), arg);
};

// 使用示例
const add5: PipeFunction<number> = (x) => x + 5;
const double: PipeFunction<number> = (x) => x * 2;

const calc = pipe<number>(add5, double);
console.log(calc(10)); // 30

//判断对象是否存在循环引用
function hasCircularReference(obj, visitList = new WeakSet()) {
  // 基础类型直接返回
  if (obj === null || typeof obj !== 'object') {
      return false;
  }
  
  // 如果已经访问过，说明有循环引用
  if (visitList.has(obj)) {
      return true;
  }
  
  // 标记为已访问
  visitList.add(obj);
  
  try {
      // 递归检查所有属性
      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              const value = obj[key];
              console.log('value',value)
              if (typeof value === 'object' && value !== null) {
                  if (hasCircularReference(value, visitList)) {
                      return true;
                  }
              }
          }
      }
      console.log('执行到这里了',obj)
      return false;
  } finally {
      // 可选：手动清理（但通常不需要）
      // visitList.delete(obj);
  }
}
const yyb = {a:1,b:{a:2}}

console.log('hasCircularReference',hasCircularReference(yyb))

const eventNames = ['API:UN_AUTH', 'API:INVALID'] as const;
const tt = typeof eventNames
// 实际测试
type Test1 = typeof eventNames;        // string[]
type Test2 = (typeof eventNames)[number] ; // string
const y:Test1 = eventNames; // ✅ 确实是 string[] 类型！
const aaaaa: Test2 = "API:UN_AUTH"; // ✅
const b: Test2 = "API:UN_AUTH";   // ✅ 确实是 string 类型！
const c: Test2 = "API:INVALID";  // ✅ 任意字符串都可以
console.log('tt',tt)
console.log('Test1',y)
console.log('Test2',aaaaa,b,c)


const person = {
  name: "Alice",
  age: 25
  };
  
type PersonType = typeof person;
const o:PersonType = {
  name: "Bob",
  age: 30,
}
const value = "hello";
type ValueType = typeof value; 
let str:ValueType = "hello";

const ButtonVariant = {
  PRIMARY: "primary",
  SECONDARY: "secondary"
} as const

type Variant = typeof ButtonVariant[keyof typeof ButtonVariant];
let myVariant: Variant = "primary";

type OptionsFlags<T> = {
  [P in keyof T]: boolean;
  };
  
  type Features = {
  darkMode: () => void;
  autoSave: () => void;
  };
  
  type UpdatedFeatures = OptionsFlags<Features>;
  let ta:UpdatedFeatures = {
    darkMode: true,
    autoSave: false,
  }

  type Status = 'active' | 'inactive';
const statusMap: Record<Status, string> = {
  active: '运行中',
  inactive: '已停用',
};
const pro = [1,2,3,Promise.reject(1),Promise.reject(2)]
let i = 0
const result:number[] = []
for(const prom of pro){
  const index = i
  i++
  Promise.resolve(prom).then((data)=>{
    result[index] = data
  },(err)=>{
    console.log('errerr',err)
  })
}

const primaryColor = 'red';
const secondaryColor = 'blue';
const neutralColor = 'gray';
type p = typeof primaryColor
// 定义颜色变量可以是上述三种颜色之一
let favoriteColor: p

// 正确赋值
favoriteColor = 'red'; // 正确

const baseConfig = {
  env: 'production',
  port: 8080,
  debug: false
};

// 使用 typeof 获取 baseConfig 的类型，并通过索引签名定义新类型
type ConfigKeys =  keyof typeof baseConfig; // 'env' | 'port' | 'debug'
let configKey: ConfigKeys = 'env'; // 正确