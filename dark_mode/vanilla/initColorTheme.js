(function(){
  const storageColorTheme = localStorage.getItem('color-theme');
  const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light';
  // localStorage에 저장된 값이 있다면 사용. 없다면 os에서 지정된 값 prefers-color-scheme의 값을 사용.
  const colorTheme = storageColorTheme ? storageColorTheme : osColorTheme;

  if(colorTheme === 'dark'){
    document.documentElement.setAttribute('color-theme','dark');
  }else{
    document.documentElement.setAttribute('color-theme','light');
  }
})()
// 초기화하는 부분은 즉시실행함수(IIFE)가 좋다고 한다!
// window 객체에 계속 메모리를 사용해야 할 오버헤드를 줄이고, 전역변수 충돌을 방지할 수 있다.