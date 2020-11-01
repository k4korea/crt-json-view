var someThing = {
  
    // define the callback  
    doSomethingAsync: function(cb){
      
      //simulate some async work
      setTimeout(function(){
        
        // use the generic callback method
        cb(undefined, "some result");
        
      },10);
    }
  };
  
  // use the API
