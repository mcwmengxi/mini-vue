/**
 * @param {number[]} nums
 * @return {number}
 */
 var lengthOfLIS = function(nums) {
  // [10,9,2,5,3,7,101,18]
  var arr = [nums[0]]
  for(let i = 1; i < nums.length; i++){
    if(nums[i] > arr[arr.length-1]){
      arr.push(nums[i])
    }else{
      for(let j = 0; j < arr.length; j++){
        if(arr[j] >= nums[i]){
          arr[j] = nums[i]
          break
        }
      }
    }
  }
  return arr.length
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));
console.log(lengthOfLIS([5,5,5,5,5,5]));
console.log(lengthOfLIS([0,1,0,3,2,3]));