const recommend_program = document.querySelector("#recommend_program");
const recommend_program_container =
  document.querySelectorAll(".program_container");
const recommend_program_content = document.querySelector(
  "#recommend_program_content"
);
const program_wrapper = document.querySelector(".program_wrapper");
const recommend_program_btn = document.querySelector(
  "#recommend_program_button"
);

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
    const title = programContainer.querySelector(".program_title").textContent; //클릭시 클릭한 운동 프로그램 value 선택

    recommend_program_content.style.display = "none";
    const complete_alert = document.createElement("div"); // div만들어서 알림창 띄우기
    recommend_program.append(complete_alert);
    complete_alert.classList = "complete_alert";
    complete_alert.innerHTML = `
      <p>축하합니다! </p>
      <p>선택하신 운동 프로그램은<strong>${title}입니다</strong>입니다.</p>
      <p>사용자 정보 갱신을 위해 다시 로그인해주세요</p>
     <div> <button id ='complete_alert_button'> 로그인 페이지로 이동 </button> </div>`;

    complete_alert_button.addEventListener("click", (e) => {
      //클릭하면 창 닫기
      e.preventDefault();
      recommend_program.style.display = "none";
    });
  } //if문
}); // 이벤트 리스너

// -------------버튼 클릭하면 추천 프로그램 띄움-------------------
recommend_program.style.display = "none";
recommend_program_btn.addEventListener("click", () => {
  recommend_program.style.display = "block";
});
