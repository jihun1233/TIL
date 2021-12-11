const $menuList = document.querySelector(".menuList");
const $menuToggleIcon = document.querySelector(".menuToggleIcon");
const $snsIcon = document.querySelector('.snsIcon')
$menuToggleIcon.addEventListener('click',()=>{
  $menuList.classList.toggle('activate');
  $snsIcon.classList.toggle('activate');
})