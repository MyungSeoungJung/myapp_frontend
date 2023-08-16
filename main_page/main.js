const recommend_program = document.querySelector("#recommend_program");
const recommend_program_container =
  document.querySelectorAll(".program_container");

const recommend_program_content = document.querySelector(
  "#recommend_program_content"
);
const program_wrapper = document.querySelector(".program_wrapper");

function creatProgram(
  id,
  img,
  programGoal,
  programIntro,
  programTitle,
  programLevel
) {
  const program_content = document.createElement("div");
  program_content.dataset.id = id;
  program_content.innerHTML = ` <div class="program_wrapper">
    <div class="program_container" data-program="${programGoal} data-level="${programLevel}"> 
     <div class="img"><img src="${img}"></div>
        <div class = "text">
          <div class="title">${programTitle}</div>
            <div class="content">${programIntro}</div>
             </div>
               </div>
                 </div>
    `;
  return program_content;
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

  username.textContent = result.name + "님";

  // -------------추천 프로그램 띄우는 코드--------------------
  recommend_program.style.display = "none";

  if (result.programName == null) {
    // alert("프로그램이 선택되지 않았습니다 추천 프로그램을 띄워드릴게요");
    recommend_program.style.display = "block";
  }
  // 추천 프로그램 가져오기

  (async () => {
    const response = await fetch("http://localhost:8080/user/recommendProgram");

    const result = await response.json();

    // for (let item of result) {
    //     recommend_program_content.append(
    //         creatProgram(
    //        item.img,
    //        item.programGoal,
    //        item.programIntro,
    //        item.programTitle,
    //       )
    //     );
    //   }
    let count = 0;
    for (let item of result) {
      if (count >= 3) {
        break;
      }
      recommend_program_content.append(
        creatProgram(
          item.id,
          item.img,
          item.programGoal,
          item.programIntro,
          item.programTitle,
          item.programLevel
        )
      );
      count++;
    }
  })();

  // 선택 프로그램 서버 요청
  recommend_program_content.addEventListener("click", (e) => {
    e.preventDefault();
    const programContainer = e.target.closest(".program_container");
    if (programContainer) {
      //   const img = programContainer.querySelector(".img img");
      const title = programContainer.querySelector(".title").textContent;
      //   const content = programContainer.querySelector(".content");
      //   const program_goal = programContainer.getAttribute("data-program");
      //   const program_level = programContainer.getAttribute("data-level");

      (async () => {
        const response = await fetch(
          "http://localhost:8080/user/selectProgram",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getCookie(
                "token" //토큰을 get해서
              )}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              // img: img,
              programTitle: title,
              // programIntro: content,
              // programGoal: program_goal,
              // programLevel: program_level,
            }),
          }
        ); //fetch
      })(); //즉시 실행
      recommend_program_content.style.display = "none";

      const complete_alert = document.createElement("div");
      recommend_program.append(complete_alert);
      complete_alert.classList = "complete_alert";
      complete_alert.innerHTML = `
      <p>축하합니다! </p>
      <p>선택하신 운동 프로그램은 <strong>${title}</strong>입니다.</p>
      <p>사용자 정보 갱신을 위해 다시 로그인해주세요</p>
     <div> <button id ='complete_alert_button'> 로그인 페이지로 이동 </button> </div>`;
      complete_alert_button.addEventListener("click", (e) => {
        e.preventDefault();
        recommend_program.style.display = "none";
        window.location.href = "/index.html";
      });
    } //if문
  }); // 이벤트 리스너
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
  alert("로그아웃됐습니다.");
  location.reload();
});
