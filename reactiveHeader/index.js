(function(window){
  const $headerNav = document.querySelector(".headerNav");
  const $menuToggle = document.querySelector(".menuToggle");
  $menuToggle.addEventListener('click',()=>{
    if(!$headerNav.classList.contains("headerNav_visible")){
      $headerNav.classList.add("headerNav_visible");
    }else{
      $headerNav.classList.remove("headerNav_visible");
    }
    
  
  
    
  })
})(window)