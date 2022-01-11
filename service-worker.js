self.addEventListener("install",(installing)=>{
    console.log("Service Worker: I am being installed, hello Simac!");
  });
  
  self.addEventListener("activate",(activating)=>{	
    console.log("Service Worker: All systems online, ready to go!");
  });
  
  self.addEventListener("fetch",(fetching)=>{   
    console.log("Service Worker: fetch!");
  });
  
  self.addEventListener("push",(pushing)=>{
      console.log("Service Worker: push data");
  })
  