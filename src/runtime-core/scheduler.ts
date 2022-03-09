const queue:any[] = []
let isFlushPending = false
const resolvedPromise: Promise<any> = Promise.resolve()
let currentFlushPromise: Promise<void> | null = null
export function queueJob(job){
  if(!queue.length || !queue.includes(job)){
    queue.push(job)
    // 执行所有的 job
    queueFlush()
  }
}
function queueFlush(){
  // 如果同时触发了两个组件的更新的话
  // 这里就会触发两次 then （微任务逻辑）
  // 但是着是没有必要的
  // 我们只需要触发一次即可处理完所有的 job 调用
  // 所以需要判断一下 如果已经触发过 nextTick 了,那么后面就不需要再次触发一次 nextTick 逻辑了
  if(!isFlushPending){
    isFlushPending = true
    currentFlushPromise = resolvedPromise.then(flushJobs)
  }
}

function flushJobs(){
  try{
    for (let i = 0; i < queue.length; i++) {
        let job = queue[i]
        job && job()
    }
  } finally{
    isFlushPending = false
    queue.length = 0
  }
}
export function nextTick(fn){
  const p = currentFlushPromise || resolvedPromise
  return fn ? p.then(fn) : p
}