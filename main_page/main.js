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
    alert("프로그램이 선택되지 않았습니다 추천 프로그램을 띄워드릴게요");
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
        const response = fetch("http://localhost:8080/user/selectProgram", {
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
        }); //fetch
      })(); //즉시 실행
    } //if문
  }); // 이벤트 리스너
})(); // 즉시실행
