function creatBox(id, img, programGoal, programTitle, coachName) {
  const box = document.createElement("div");
  box.classList.add("programBox");
  box.dataset.no = id;
  box.innerHTML = `

    <div id ="top"><img width="auto" height="30" src="${img}"></div>
    <div id ="bottom"><p>${programTitle}</p> <div><p>${coachName}</p><p>${programGoal}</p></div></div>

`;
  return box;
}

(async () => {
  const response = await fetch("http://localhost:8080/user/main", {
    headers: {
      Authorization: `Bearer ${getCookie(
        "token" //토큰을 get해서
      )}`,
    },
  }); //함수 구현
  const result = await response.json(); //
  console.log(result);
  username.innerHTML = `<a href="/user_page/user_page.html">${result.name}님 <i class="fa-solid fa-user"></i></a>`;
  const content = document.querySelector(".main_content");

  // 운동 프로그램 가져오기
  const getPost = await fetch("http://localhost:8080/program/bestProgram");

  const postesult = await getPost.json();

  let count = 0;
  for (let item of postesult) {
    if (count >= 4) {
      break;
    }
    content.prepend(
      creatBox(
        item.id,
        item.img,
        item.programGoal,
        item.programTitle,
        item.coachName
      )
    );
    count++;
  }
})(); // 즉시실행

// 로그아웃-------------------------------------------------------------------------------------------------
const cookieName = "token";
const cookieDomain = "localhost";

// 쿠키 만료일을 현재 시간 이전으로 설정하여 쿠키 삭제
function expireCookie(cookieName, cookieDomain) {
  const pastDate = new Date(1970, 1, 1); // 과거 날짜로 설정
  const formattedDate = pastDate.toUTCString();

  // 만료일을 과거 날짜로 설정한 후, 쿠키를 설정
  document.cookie = `${cookieName}=; expires=${formattedDate}; path=/; domain=${cookieDomain}`;
}
// 로그아웃 버튼 클릭 시 쿠키 만료시키기
const logout = document.querySelector("#logout");
console.log(logout);
logout.addEventListener("click", function () {
  expireCookie(cookieName, cookieDomain);
  alert("로그아웃 완료");
  location.reload();
});
