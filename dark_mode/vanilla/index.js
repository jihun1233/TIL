const $themToggle = document.querySelector('.theme-toggle');

$themToggle.addEventListener('click', (e)=>{
  if(document.documentElement.getAttribute('color-theme') === 'dark'){
    document.documentElement.setAttribute('color-theme', 'light');
  }else{
    document.documentElement.setAttribute('color-theme', 'dark');
  }
   // documentElement는 루트요소를 반환한다.
})