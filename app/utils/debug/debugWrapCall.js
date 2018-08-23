function debugWrapCall(callable) {
  console.log('Call wrapper: wrap [' + callable.name + ']');
  return function(){
    let args = [].slice.call(arguments);
    let groupName = 'Call wrapper: call [' + callable.name + '] with ' + args.length + ' args';
    console.group(groupName);
    console.log("arguments: ", args);
    callable.apply(this, args);
    console.groupEnd(groupName);
  };
}

export default debugWrapCall;

