function Queue(){
  this.dataStore = [];//存放队列的数组，初始化为空
  this.enqueue = enqueue;//向队列尾部添加一个元素
  this.dequeue = dequeue;//删除队首的元素
  this.theFront = theFront;//读取队首的元素
  this.back = back;//对取队尾的元素
  this.toStrings = toStrings;//显示队列内的所有元素
  this.empty = empty;//判断队列是否为空
}

function enqueue(element){
  this.dataStore.push(element);
}

function dequeue(){
  this.dataStore.shift();
}

function theFront(){
  return this.dataStore[0];
}

function back(){
  return this.dataStore[this.dataStore.length-1];
}

function toStrings(){
  return this.dataStore;
}

function empty(){
  if(this.dataStore.length == 0){
    return true;
  }else{
    return false;
  }
}
