class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}
function buildTreeFromArray(arr) {
    if (!arr || arr.length === 0 || arr[0] === null) {
        return null;
    }

    const root = new TreeNode(arr[0]);
    const queue = [root]; // 使用队列来辅助构建
    let i = 1; // 从数组的第二个元素开始

    while (queue.length > 0 && i < arr.length) {
        const currentNode = queue.shift(); // 取出队列中的父节点

        // 处理左子节点
        if (i < arr.length && arr[i] !== null) {
            const leftNode = new TreeNode(arr[i]);
            currentNode.left = leftNode;
            queue.push(leftNode);
        }
        i++;

        // 处理右子节点
        if (i < arr.length && arr[i] !== null) {
            const rightNode = new TreeNode(arr[i]);
            currentNode.right = rightNode;
            queue.push(rightNode);
        }
        i++;
    }

    return root; // 返回根节点
}

// 测试
// const root = buildTreeFromArray([1, null, 2, 3]);
// console.log(JSON.stringify(root, null, 2));

// var inorderTraversal = function(root) {
//     const result = [];
    
//     function inorder(node) {
//         if (!node) return;
        
//         // 左子树
//         inorder(node.left);
//         // 根节点
//         result.push(node.val);
//         // 右子树
//         inorder(node.right);
//     }
    
//     inorder(root);
//     return result;
// };
// console.log(inorderTraversal(root)); // 输出: [1, 3, 2]
// var minWindow = function(s, t) {
//     if(s.length<t.length) return ''
//     let minResult = s
//     //创建两个map 
//     let smap = new Map()
//     let tmap = new Map()
//     //保存t的map用来对比
//     for( let chat of t){
//         tmap.set(chat,(tmap.get(chat)|| 0) + 1)
//     }
//     let l = 0, r = 0
//     while(r<s.length){
//     //如果有t的子串 就存在smap
//         if(tmap.has(s[r])){
//             smap.set(s[r],(smap.get(s[r])|| 0) + 1)
//             //判断tmap跟smap是否相等
//             while(compareMap(tmap,smap)){
//                 //更新
//                 if(minResult.length > r-l + 1){
//                     minResult = s.slice(l,r+1)
//                 }
//                 //删除左边元素避免死循环
//                 if(smap.has(s[l])){
//                     smap.set(s[l],smap.get(s[l]) - 1)
//                 }
           
//                 //缩小左边界
//                 l++
//             }
//         }else{
        
//         }
//         r++
//     }
//     function compareMap(map1,map2){
//         for(let [char,num] of map1){
//             //map2可以包含map1
//             if( !map2.get(char) || map2.get(char) < num){
//                 return false
//             }
//         }
//         return true
//     }
//     return minResult
// };
// console.log(minWindow("a","b"))
// var findMin = function(nums) {
//     let left = 0,right = nums.length - 1
//     while(left < right){
//         let mid = Math.floor((left+right)/2)
//         // 如果中点大于右端，最小值在右侧（mid+1 .. right）
//         if (nums[mid] > nums[right]) {
//             left = mid + 1;
//         } else {
//             // 否则最小值在左侧（left .. mid）
//             right = mid;
//         }
//     }
//     return nums[left]
// };
// console.log(findMin([3,4,5,1,2]))
// var decodeString = function(s) {
//     if(!s.length) return s
//     let result = ''
//     let pre = ''
//     let count = 0
//     for(let i = 0;i<s.length;i++){
//        if(s[i] > 0 && s[i] <= 9){
//         count = count * 10 + Number(s[i])
//        }
//     }
//     return result
// };

// console.log("🚀 ~ decodeString:", decodeString("2[abc]3[cd]ef"))
// console.log("🚀 ~ decodeString:", decodeString("3[a2[c]]"))
// var partitionLabels = function(s) {
//     //贪心：最好的是每个字符都单独分开
//     let result = []
//     let length = s.length
//     for(let i = 0; i < length;i++){
//         let pushIndex
//         result.some((v,index)=>{
//             if(v.includes(s[i])){
//                 //找出index后面的一起合并
//                 pushIndex = index
//                 let arr = result.slice(index)
//                 result.splice(index,result.length,[...arr.flat(),s[i]])
               
//                 return true
//             }
//         })
//         if(!pushIndex && pushIndex !== 0){
//              result.push([s[i]])
//         }
//     }
//     let result1 = result.map(v=>v.length)
//     console.log("🚀 ~ partitionLabels ~ result:", result)
  
//     return result1
// };

// console.log("🚀 ~ partitionLabels:", partitionLabels('eccbbbbdec'))
// var climbStairs = function(n) {
    
//     let dp = [1,2]
//     //dp[i] = dp[i-1] + d[i-2]
//     for(let i = 2;i<n;i++){
//         dp[i] = dp[i-1] + dp[i-2]
        

//     }
   
    
//     return dp[n - 1]
// };
// console.log("🚀 ~ climbStairs:", climbStairs(3))
// var generate = function(numRows) {
//     let dp = [[1]]
//     for(let i = 1;i<numRows;i++){
//         const row = new Array(i + 1).fill(1); // 先创建长度为 i+1 的新行并用 1 填充（首尾都是 1）
//         for(let j = 1;j<i;j++){
//             row[j] = dp[i-1][j-1] + dp[i-1][j] 
            
//         } 
//         dp.push(row); // 将新行 push 到 dp，避免直接写入未初始化的 dp[i] 
//     }
//     return dp  
// };

// console.log("🚀 ~ generate:", generate(5))
// var coinChange = function(coins, amount) {
//     //定义状态dp[i]表示最少硬币个数
//     const dp = new Array(amount + 1).fill(Infinity);
//     // 初始状态
//     dp[0] = 0; //金额0需要0次
//     // 计算顺序: 从1到n
//     for (let i = 1; i <= amount; i++) {
//         // 状态转移方程 
//         for (let j = 0; j<coins.length; j++) {
//             if(i >= coins[j]){
//                 dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
//             } 
            
//         }
//     }
//     // 输出结果
//     return  isFinite(dp[amount])?dp[amount]:-1
// };
// coinChange([3,5], 11)
// var wordBreak = function(s, wordDict) {
//     // 1. 定义状态dp[i]：前i个字符能否被拆分
//     const dp = new Array(s.length + 1).fill(false);
    
//     // 2. 初始状态
//     dp[0] = true;  // 空字符串可以被拆分
    
//     // 3. 状态转移
//     for (let i = 1; i <= s.length; i++) {
//         for (let char of wordDict) {
//             if (i >= char.length) {
//                 // 检查从 i-char.length 到 i-1 的子串是否等于当前单词
//                 const start = i - char.length;
//                 console.log("🚀 ~ wordBreak ~ start:", start)
//                 const substring = s.substring(start, i);
                
//                 if (dp[start] && substring === char) {
//                     dp[i] = true;
//                     break;  // 找到一个匹配就可以退出内层循环
//                 }
//             }
//         }
//     }
    
//     return dp[s.length];
// };
// wordBreak("cacaca", ["ca"])
// var lengthOfLIS = function(nums) {
//     const tails = [];  // tails[i] 表示长度为 i+1 的递增子序列的最小结尾值
    
//     for (const num of nums) {
//         // 二分查找插入位置
//         let left = 0, right = tails.length;
        
//         while (left < right) {
//             const mid = Math.floor((left + right) / 2);
//             if (tails[mid] < num) {
//                 left = mid + 1;
//             } else {
//                 right = mid;
//             }
//         }
    
        
//         // 如果 num 大于所有 tails 中的值，扩展子序列
//         if (left === tails.length) {
//             tails.push(num);
//         } else {
//             // 否则替换当前位置的值
//             tails[left] = num;
//         }
//         console.log("🚀 ~ lengthOfLIS ~ tails:", tails)
//     }
    
//     return tails.length;
// };
// lengthOfLIS([4,10,4,3,8,9])
var maxProduct = function(nums) {
    if (!nums || nums.length === 0) return 0;

    // 以当前位置结尾的最大/最小乘积（包含当前位置自身）
    let maxEnding = nums[0], minEnding = nums[0];
    let ans = nums[0];

    for (let i = 1; i < nums.length; i++) {
        const x = nums[i];
        // 负数会把最大/最小对调
        if (x < 0) [maxEnding, minEnding] = [minEnding, maxEnding];

        // 要么以当前元素单独作为子数组，要么延续之前的乘积
        maxEnding = Math.max(x, maxEnding * x);
        minEnding = Math.min(x, minEnding * x);

        ans = Math.max(ans, maxEnding);
    }

    console.log("🚀 ~ maxProduct ~ ans:", ans)
    return ans;
};
maxProduct([2,3,-2,-4])
maxProduct([2,3,-2,4])
maxProduct([-2,0,-1])
maxProduct([0,-2, -3,0])