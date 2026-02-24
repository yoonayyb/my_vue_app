// function generateParenthesis(n) {
//   const result = [] // 用于存储所有有效的括号组合

import { ta } from 'element-plus/es/locales.mjs'



//   function backtrack(open, close, path) {
//     // 如果路径长度等于 n * 2，说明生成了一个完整的括号组合

//     if (path.length === n * 2) {
//       result.push(path.join('')) // 将当前路径加入结果
//       return
//     }

//     // 如果可以添加左括号（`(`），继续递归
//     if (open < n) {
//       path.push('(') // 添加左括号
//       backtrack(open + 1, close, path) // 递归调用
//       path.pop() // 回溯，撤销选择
//     }

//     // 如果可以添加右括号（`)`），继续递归
//     if (close < open) {
//       path.push(')') // 添加右括号
//       backtrack(open, close + 1, path) // 递归调用
//       path.pop() // 回溯，撤销选择
//     }
//   }

//   backtrack(0, 0, []) // 从 0 个左括号和 0 个右括号开始
//   return result
// }

// // 测试
// console.log(generateParenthesis(3))

// var exist = function (board, word) {

//   let result = false
//   // 上下左右
//   const directions = [
//     [0, 1],  // 右
//     [1, 0],  // 下
//     [0, -1], // 左
//     [-1, 0]  // 上
//   ]

//   //1.查找单个元素在二维数组的位置
//   function _findElement(n) {
//     for (let i = 0; i < board.length; i++) {
//       for (let j = 0; j < board[i].length; j++) {
//         if (board[i][j] === n) {
//           firstElementPositions.push([i, j])
//         }
//       }
//     }  
//   }
//   //找word的第一个字母的所有索引就可以了
//   let firstElementPositions =[]

//   _findElement(word[0])
//   console.log('🚀 ~ exist ~ firstElementPositions:', firstElementPositions)


//   if(firstElementPositions.length===0){  
//     return false
//   } 

//   for ( let item of firstElementPositions){


//     //2.查找下一个元素是否存在
//     function _nextElement(indexArr,point){
//       const [x, y] = indexArr;
//       if(point + 1 === word.length){
//         //找到了
//         result = true
//         return
//       }
//       // 标记当前路径为已访问
//       const temp = board[x][y];
//       board[x][y] = '#';
//       for (const [dx, dy] of directions) {
//         const newX = x + dx
//         const newY = y + dy
//         const w = word[point + 1]
//         if (
//           newX >= 0 && newX < board.length &&
//           newY >= 0 && newY < board[0].length &&
//            w &&
//           board[newX][newY] === w
//         ) {
//           if(result) return //已经找到就不继续找了




//           _nextElement( [newX, newY],point+1)

//         }
//       }
//       //递归结束，还原现场
//       board[x][y] = temp;
//     }
//     _nextElement(item,0)
//     if(result) break
//   }




//   // console.log('🚀 ~ exist ~ result:', result)

//   return result

// }
// console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCCED')); // true
// console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'SEE')); // true
// console.log(exist([['A', 'B', 'C', 'E'], ['S', 'F', 'C', 'S'], ['A', 'D', 'E', 'E']], 'ABCB')); // false
// console.log(exist([["a"]], 'a'))
// /**
//  * @param {string} s
//  * @return {string[][]}
//  */
// var partition = function (s) {
//   //判断是否是回文字符串（双指针）
//   function _palindrome(str) {
//     let l = 0, r = str.length - 1
//     while (l < r) {
//       if (str[l] === str[r]) {
//         l++
//         r--
//       } else {
//         return false
//       }
//     }
//     return true // 是回文
//   }
//   // 回溯函数
//   function backtrack(start, path) {
//     // 如果起始位置等于字符串长度，说明已经分割完成
//     if (start === s.length) {
//       result.push([...path]) // 将当前路径加入结果
//       return
//     }

//     // 遍历所有可能的分割点
//     for (let end = start + 1; end <= s.length; end++) {
//       const substring = s.slice(start, end) // 提取子串
//       if (_palindrome(substring)) { // 如果是回文
//         path.push(substring) // 做选择
//         backtrack(end, path) // 递归调用，继续分割
//         path.pop() // 撤销选择
//       }
//     }
//   }

//   backtrack(0, []) // 从索引 0 开始，路径初始化为空
//   return result

// }
// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number}
//  */
// var searchInsert = function(nums, target) {
//   let left = 0 // 左边界
//   let right = nums.length - 1 // 右边界

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2) // 计算中间索引

//     if (nums[mid] === target) {
//       return mid // 找到目标值，返回索引
//     } else if (nums[mid] < target) {
//       left = mid + 1 // 目标值在右半部分
//     } else {
//       right = mid - 1 // 目标值在左半部分
//     }
//   }

//   // 如果没有找到目标值，返回插入位置
//   return left
// }
// /**
//  * @param {number[][]} matrix
//  * @param {number} target
//  * @return {boolean}
//  */
// var searchMatrix = function(matrix, target) {
//   if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
//     return false; // 如果矩阵为空，直接返回 false
//   }

//   const rows = matrix.length; // 矩阵的行数
//   const cols = matrix[0].length; // 矩阵的列数

//   // 使用二分查找，将二维矩阵视为一维数组
//   let left = 0;
//   let right = rows * cols - 1;

//   while (left <= right) {
//     const mid = Math.floor((left + right) / 2); // 计算中间索引
//     const row = Math.floor(mid / cols); // 计算所在行
//     const col = mid % cols; // 计算所在列
//     const midValue = matrix[row][col]; // 获取中间值

//     if (midValue === target) {
//       return true; // 找到目标值，返回 true
//     } else if (midValue < target) {
//       left = mid + 1; // 目标值在右半部分
//     } else {
//       right = mid - 1; // 目标值在左半部分
//     }
//   }

//   return false; // 如果没有找到目标值，返回 false
// };
// /**
//  * @param {number[]} nums
//  * @param {number} target
//  * @return {number[]}
//  */
// var searchRange = function(nums, target) {
//   // 查找目标值的起始位置
//   function findStart(nums, target) {
//     let left = 0, right = nums.length - 1;
//     let start = -1; // 初始化起始位置为 -1
//     while (left <= right) {
//       const mid = Math.floor((left + right) / 2);
//       if (nums[mid] === target) {
//         start = mid; // 记录当前索引
//         right = mid - 1; // 继续向左查找
//       } else if (nums[mid] < target) {
//         left = mid + 1; // 目标值在右半部分
//       } else {
//         right = mid - 1; // 目标值在左半部分
//       }
//     }
//     return start;
//   }

//   // 查找目标值的结束位置
//   function findEnd(nums, target) {
//     let left = 0, right = nums.length - 1;
//     let end = -1; // 初始化结束位置为 -1
//     while (left <= right) {
//       const mid = Math.floor((left + right) / 2);
//       if (nums[mid] === target) {
//         end = mid; // 记录当前索引
//         left = mid + 1; // 继续向右查找
//       } else if (nums[mid] < target) {
//         left = mid + 1; // 目标值在右半部分
//       } else {
//         right = mid - 1; // 目标值在左半部分
//       }
//     }
//     return end;
//   }

//   const start = findStart(nums, target);
//   const end = findEnd(nums, target);

//   // 如果起始位置和结束位置都有效，返回结果
//   if (start !== -1 && end !== -1) {
//     return [start, end];
//   }
//   return [-1, -1]; // 如果目标值不存在，返回 [-1, -1]
// };
// console.log(searchRange([5,7,7,8,8,10],8))
// var setZeroes = function(matrix) {
  
//   let row = matrix.length,col = matrix[0].length
//   let rowArr = new Array(row).fill(false)  ,colArr = new Array(col).fill(false)
  
 

//   for(let i = 0;i<row;i++){
//     for(let j = 0;j<col;j++){
//       if(matrix[i][j]===0){
//         rowArr[i] = colArr[j] = true
//       }
//     }
//   }
//   console.log("🚀 ~ setZeroes ~ colArr:", colArr)
//   console.log("🚀 ~ setZeroes ~ rowArr:", rowArr)
//     for(let i = 0;i<row;i++){
//       for(let j = 0;j<col;j++){
       
//         if( rowArr[i] || colArr[j] ){
//           matrix[i][j]=0
//         }
//       }
//    }
// };
// // 测试
// const matrix2 = [
//   [0, 1, 2, 0],
//   [3, 2, 5, 2],
//   [1, 3, 1, 5]
// ];
// setZeroes(matrix2);
// console.log(matrix2)
// /**
//  * @param {number[][]} matrix
//  * @return {number[]}
//  */
// var spiralOrder = function(matrix) {
//   let result = []
//   //右-下-左-上
//   //定义4个基准方向
//   let top = 0,left = 0,right = matrix[0].length-1,bottom = matrix.length - 1
//   while(top<=bottom && left<=right){
//     //先向左
//     for(let i = left;i <= right;i++ ){
//       result.push(matrix[top][i])
//     }
//     top++
//     //向下
//     for(let i = top;i <= bottom;i++ ){
//       result.push(matrix[i][right])
//     }
//     right--
//     //这里判断一下边界
//     if(top > bottom || left >right) break
//     //向左
//     for(let i = right;i >= left;i-- ){
//       result.push(matrix[bottom][i])
//     }
//     bottom--
//     //向上
//     for(let i = bottom;i >= top;i-- ){
//       result.push(matrix[i][left])
//     }
//     left++
//   } 
//   return result
// }
// console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]))
// var rotate = function(matrix) {
//   //旋转90°相当于从左下角往上开始遍历取出数据
//   let result = new Array(matrix.length).fill([])
//     //旋转90°相当于从左下角往上开始遍历取出数据
//     let bottom = matrix.length - 1, top = 0
//     for(let i = 0;i <= bottom;i++){
//       let arr = []
//         for(let j = bottom;j >= 0;j--){
//             arr.push(matrix[j][i])
           
            
//             // result[i].push(matrix[j][i])
//         }
//         result[i] = arr
       
//     }
//     for(let i = 0;i < matrix.length;i++){
//       for(let j = 0;j < matrix.length;j++){
//         matrix[i][j] = result[i][j]
//       }
//     }
  
// };
// let matrix = [[1,2,3],[4,5,6],[7,8,9]]
// rotate(matrix)
// console.log(matrix)
// 最优解：O(m+n)
// var searchMatrix = function(matrix, target) {
//   if (!matrix.length) return false;
  
//   let row = 0;
//   let col = matrix[0].length - 1;  // 从右上角开始
  
//   while (row < matrix.length && col >= 0) {
//     if (matrix[row][col] === target) {
//       return true;
//     } else if (matrix[row][col] > target) {
//       col--;  // 往左
//     } else {
//       row++;  // 往下
//     }
//   }
//   return false;
// };
// console.log("🚀 ~ searchMatrix ~ searchMatrix:", searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],22))
// let matrix = [[1,3,5]]
// console.log("🚀 ~ searchMatrix ~ searchMatrix:", searchMatrix([[1,3,5]],5))
// var addTwoNumbers = function(l1, l2) {
//   let result = l1
//   let sum = l1
//   let p1 = l1,p2 =l2
//   let pre = 0 
//   while(p1 || p2){
//       const val1 = p1 ? p1.val : 0;
//       const val2 = p2 ? p2.val : 0;
//       let val = val1 + val2 + pre
//       if(val >= 10){
//           result.val = val % 10
//           pre = 1
         
          
//       }else{
//           result.val = val
//           pre = 0
//       }
//       result = result.next?result.next:{val:pre,next:null}
//       if(p1) p1 = p1.next
//       if(p2) p2 = p2.next
      
//   } 
//   //处理最后一位是否进位
//   console.log("🚀 ~ addTwoNumbers ~ pre:", pre)
//   if(pre) result.next = {val:pre,next:null}
//   console.log("🚀 ~ addTwoNumbers ~ result:", result)
//   return sum
// };
// console.log(addTwoNumbers({val:9,next:{val:9,next:{val:9,next:null}}},{val:9,next:null}))

// var removeNthFromEnd = function(head, n) {
//   const dummy = { val: 0, next: head }
//   let count = 0
  
//   function traverse(node) {
//     if (node === null) {
//       return 0
//     }
      
//     const level = traverse(node.next) + 1
      
//     // 如果当前节点是要删除节点的前一个节点
//     if (level === n + 1) {
//       node.next = node.next.next
//     }
      
//     return level
//   }
  
//   traverse(dummy)
//   return dummy.next
// }
// var reverseKGroup = function(head, k) {
    
//   //记录反转区间
//   let start = head,end = head

//   //反转链表
//   const reverseListNode = (list,n)=>{
//     let p = null
//     let current = list
//     let count = 1
//     while(current && count <= n){
//       const next = current.next
//       current.next = p
//       p = current
//       count++
//       current = next 
     
//     }
//     return {p,current}
//   }
//   let count = 1
//   let pre = {val:0,next:null}
//   let result = pre
  
//   while(end){
//     if(count === k){
//       let {p,current} = reverseListNode(start,k)
//       pre.next = p
//       start = end = current
//       let n = 0
//       while(n < k ){
//         pre = pre.next
//         n++
//       } 
//       n = 0 
//       //拼接
//       pre.next = end
//       count = 1
//     }
//     end = end?.next
//     count++
//   }
  
//   return result.next
// }
// console.log(reverseKGroup({val:1,next:{val:2,next:null}},2))
var sortList = function(head) {
    let current = head
  
    while (current) {
        let min = current
        let runner = current.next
      
        while (runner) {
            if (runner.val < min.val) {
                min = runner
            }
            runner = runner.next
        }
      
        // 交换值
        [current.val, min.val] = [min.val, current.val]
        current = current.next
    }
  
    return head
}
console.log(sortList({val:4,next:{val:2,next:{val:1,next:{val:3,next:null}}}}))
const sum = (a,b)=>{
    const len = Math.max(a.length,b.length)
    let carry = 0
    a = a.padStart(len,'0')
    b = b.padStart(len,'0')
    let result = ''
    for(let i = len -1;i>=0;i--){
        
        const total = +a[i] + +b[i] + carry
        carry = Math.floor(total /10)
        let r = total % 10
        result = r + result
    }
    return carry ? '1' + result : result
}

console.log("🚀 ~ sum:", sum('12','987'))
