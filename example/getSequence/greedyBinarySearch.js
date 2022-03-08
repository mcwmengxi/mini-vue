/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
  // [10,9,2,5,3,7,101,18]
  var arr = [nums[0]]
  var position = [0]
  for(let i = 1; i < nums.length; i++){
    if(nums[i] > arr[arr.length-1]){
      arr.push(nums[i])
      position.push(arr.length-1)
    }else{
      // for(let j = 0; j < arr.length; j++){
      //   if(arr[j] >= nums[i]){
      //     arr[j] = nums[i]
      //     break
      //   }
      // }
      // 二分查找
      let l = 0,r = arr.length-1
      while(l<=r){
        let mid = ~~((l + r) / 2)
        if(nums[i] > arr[mid]){
          l = mid + 1
        }
        else if(nums[i] < arr[mid]){
          r = mid -1
        }
        else{
          l = mid
          break
        }
      }
      arr[l] = nums[i]
      position.push(l)
    }
  }
  let cur = arr.length - 1
  for(let i = position.length-1;i >= 0 && cur>=0 ;i--) {
    if(cur === position[i]){
      arr[cur--] = i
    }
  }
  return arr
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));
console.log(lengthOfLIS([5,5,5,5,5,5]));
console.log(lengthOfLIS([0,1,0,3,2,3]));