function perform(anyMethod, wrappers) {
  return function() {

  }
}

let newFn = perform(function() {

},[
  {
    initialize() {
      console.log('wrapper1 beforeSay');
    },
    close() {
      console.log('wrapper1 close');
    }
  },{
    initialize() {
      console.log('wrapper2 beforeSay');
    },
    close() {
      console.log('wrapper2 close');
    }
  }
])