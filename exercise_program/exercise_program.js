function creatLi(
  no,
  img,
  programTitle,
  programIntro,
  programLevel,
  programGoal
) {
  const li = document.createElement("li");
  li.dataset.goal = programGoal;
  li.innerHTML = `
  <div>
  <div id="top" data-no="${no}">
  <div><img width="auto" height="30" src="${img}"></div>
  </div>
  <div id = "bottom">
  <p>${programTitle}</p>
  <p>${programIntro}</p>
  <div id = "program_overview">
  <p>${programLevel}</p>
  <p>${programGoal}</p>
  </div>
  </div>
  </div>
  `;
  return li;
}

// 프로그램 불러오는 곳

let currentPage = 0; // 현재 페이지 번호
let isLastPage = false; // 마지막 페이지 인지 여부
const PAGE_SIZE = 8; // 고정된 페이지 사이즈
let currentQuery = ""; // 현재 검색 키워드

async function getPagedList(page, query) {
  let url = "";
  // 검색 조건이 있다.
  if (query) {
    // query로 url특정해도 어떻게 되는지
    url = `http://localhost:8080/program/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
  } else {
    url = `http://localhost:8080/program/paging?page=${page}&size=${PAGE_SIZE}`;
  }

  const response = await fetch(url);
  const result = await response.json();

  const ul = document.querySelector("ul");

  // 목록 초기화
  ul.innerHTML = "";
  for (let item of result.content) {
    ul.append(
      creatLi(
        item.no,
        item.img,
        item.programTitle,
        item.programIntro,
        item.programLevel,
        item.programGoal
      )
    );
  }
  currentPage = result.number; // 현재 페이지 설정
  isLastPage = result.last; // 마지막 페이지 여부

  // 이전/다음 버튼 활성화 처리
  setBtnActive();
}

// 이전/다음 버튼 활성화 여부 처리
function setBtnActive() {
  const buttons = document.querySelectorAll("#page div button");

  const btnPrev = buttons[0];
  const btnNext = buttons[1];
  // 첫번째 페이지이면 이전 버튼 비활성화
  if (currentPage === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }
  // 마지막 페이지이면 다음 버튼 비활성화
  if (isLastPage) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

(() => {
  window.addEventListener("DOMContentLoaded", () => {
    // 첫번째 페이지 조회
    getPagedList(0);
  });
})();

// 이전/다음 페이징
(() => {
  // 이전/다음 버튼 선택
  const buttons = document.querySelectorAll("#page div button");

  const btnPrev = buttons[0];
  const btnNext = buttons[1];

  // 이전 버튼
  btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage > 0 && getPagedList(currentPage - 1, currentQuery);
  });
  // 다음 버튼
  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    !isLastPage && getPagedList(currentPage + 1, currentQuery);
  });
})();

// 검색 기능
(() => {
  const txtQuery = document.querySelector("#search_input");
  const btnSearch = document.querySelector("#search_button");
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    currentQuery = txtQuery.value;
    getPagedList(0, currentQuery);
  });

  txtQuery.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key.toLocaleLowerCase() === "enter") {
      currentQuery = txtQuery.value;
      getPagedList(0, currentQuery);
    }
  });
})();
