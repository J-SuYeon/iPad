// ipads js파일 불러오기.
import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'

// 장바구니 토글 //
const basketStarterEl=document.querySelector('header .basket-starter');
const basketEl=basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click', function (event) {
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
    hideBasket()
} else {
  showBasket()
}
  // basketEl의 클래스 중 show가 있는지 없는지를 판단.(없으면 false)
  // hide /show (클릭했을 때 show라는 클래스가 있으면 드롭다운을 보여주고, show라는 클래스가 있는 상태라면 숨겨주기.)  
});
basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
});
  // starter가 basket의 상위에 있기 때문에, basket에서 상위로 전파되어 클릭하면 꺼지는 함수 작용
  // basket(장바구니 토글 메뉴)을 클릭했을 때도 상위로 전파되지 않게 stopPropagation사용
window.addEventListener('click', function (){
  hideBasket()
});

function showBasket() {
  basketEl.classList.add('show')
};
function hideBasket() {
  basketEl.classList.remove('show') 
};
  // 중복되는 메소드 함수로 만들어 사용(추상화)

// 검색 토글 //
const headerEl = document.querySelector('header');
const headerMenuEls=[...headerEl.querySelectorAll('ul.menu>li')];
  // 전개 연산자(...)로 배열 만듦(모든 값들을 해체한 후 배열 안에 넣음)
  // 얕은 복사라고 함.
const searchWrapEl=headerEl.querySelector('.search-wrap');
const searchStarterEl=headerEl.querySelector('.search-starter');
const searchCloserEl=searchWrapEl.querySelector('.search-closer');
const searchShadowEl=searchWrapEl.querySelector('.shadow');
const searchInputEl=searchWrapEl.querySelector('input');
const searchDlayEls=[...searchWrapEl.querySelectorAll('li')];

  // 이름 없는 함수 -> 콜백함수
  // 클릭했을 때 이 이름을 가진 함수를 실행.
searchStarterEl.addEventListener('click',showSearch);
searchCloserEl.addEventListener('click', function (event) {
  event.stopPropagation()
  // 상위 요소로 전파하는 이벤트 버블링 정지
  hideSearch()
});
searchShadowEl.addEventListener('click', hideSearch);

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  // documentElement: 이 문서의 최상위 요소(html태그)
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index *.4 / headerMenuEls.length + 's'
    // .length: 배열 요소의 개수
  })
  searchDlayEls.forEach(function(el, index) {
    el.style.transitionDelay = index *.4 / searchDlayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index *.4 / headerMenuEls.length + 's'
  })
  searchDlayEls.reverse().forEach(function(el, index) {
    el.style.transitionDelay = index *.4 / searchDlayEls.length + 's'
  })
  searchDlayEls.reverse()
  searchInputEl.value=''
  // 검색바 사라질 때 입력했던 값 초기화
}


// 헤더 메뉴 토글(모바일)
// 재활용 가능하도록 위의 함수에서 꺼내와 따로 함수로 작성함.
function playScroll() {
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}

const menuStarterEl = document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value=''
    // 헤더 메뉴 종료되면 검색 내용 초기화
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})

// 헤더 검색(모바일)
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click', function() {
  // textfield를 클릭하면 검색모드가 되도록 설정되어 있어서, 모바일로 변경하는 즉시 검색창이 뜨는 문제 있음
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus()
})
searchCancelEl.addEventListener('click',function () {
  headerEl.classList.remove('searching--mobile')
})

// 검색창을 연 상태로 모바일 모드로 변경했을 때 검색창만 화면에 뜨는 오류 수정
window.addEventListener('resize', function () {
  // window(화면 전체) 객체에서 창 사이즈가 바뀔 때마다 함수를 실행
  if (window.innerWidth <= 740) {
    // 화면 너비가 740 이하일 때(모바일 모드일 때)
    headerEl.classList.remove('searching')
  } else {
    headerEl.classList.remove('searching--mobile')
  }
})

// Navigation 토글 열고닫기(모바일)
const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function () {
  if (navEl.classList.contains('menuing')) {
    hideNavMenu()
  } else {
    showNavMenu()
  }
})

navEl.addEventListener('click', function (event) {
  event.stopPropagation()
  // navigation 영역을 클릭했을 때는 상위 영역으로 이벤트가 전파되지 않음
  // -> nav영역 클릭하면 navmenu가 닫히지 않게 됨. (모바일)
})
// shadow 영역 클릭하면 닫히게 하기(모바일)
navMenuShadowEl.addEventListener('click', hideNavMenu)
// navigation 연 상태에서 배경을 클릭하면 닫히게 하기(모바일)
window.addEventListener('click', hideNavMenu)

function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}

// InterSection Observer(가시성 관찰)로 화면에 요소 들어올 때 변화 주기.
// =요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function(entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls=document.querySelectorAll('.info')
infoEls.forEach(function(el) {
  io.observe(el)
  // 관찰 정보가 배열 데이터로써 entries로 넘어감.
})

// 비디오 재생 버튼
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})
pauseBtn.addEventListener('click', function () {
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})

// Compare Section

const itemsEl = document.querySelector('section.compare .items')
ipads.forEach(function (ipad) {
  // createElement() : 요소 만들기(만들고자 하는 태그의 이름)
  // js로 만들었기 때문에 메모리 상에만 존재하는 요소.
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')
  // 여기서 문자 데이터로 태그와 내용을 작성할 경우 -> textContent: 문자 데이터로 그대로 출력
  // textContent 대신 innerHTML로 작성하면 코드와 같이 태그에 작성한 내용을 해석하여 출력.
  // ' " ` 중 그레이브(백틱, `)사용하고, ${}사용해 데이터 보간
  // 코드 하이라이팅을 위해서 vs코드의 확장 프로그램 comment taged templetes 설치함.
  // 여러 줄 사용할 때 백틱 사용 -> templete literal이라고 함.
  
  // 기본적으로 빈 문자 데이터로 시작해서 colorList에 0번째 데이터에서는 총 2개의 문자 데이터를 채우게 됨.
  let colorList = ''
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`
  })

  itemEl.innerHTML = /* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}"/>
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `

  // 실제 html에 만든 요소를 추가.
  itemsEl.append(itemEl)
})

// Navigator section 요소 추가

const navigationsEl=document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function(map) {
    mapList += /* html */`
    <li>
      <a href="${map.url}">${map.name}</a> 
    </li>`
  })

  mapEl.innerHTML = /* html */`
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `

  navigationsEl.append(mapEl)
})

// footer - copyright : 연도 자동 작성

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()
// new: 생성자 함수 호출하는 것(js의 class에 해당)


// footer - 아코디언 메뉴 (모바일)
const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function () {
    el.classList.toggle('active')
    // toggle 메소드 : 제목 부분을 클릭하면 active가 있을 때 없애주고, 없으면 추가해줌
    // -> add와 remove 역할 동시에.
  })
})