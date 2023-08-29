const complete = document.querySelector("#complete"); // 회원가입 완료 버튼
const Goal = document.querySelectorAll(".Goal div"); //다이어트 목적
const sex = document.querySelectorAll(".sex div"); //성별
const userInfo = document.querySelectorAll(".name input");
const activity = document.querySelectorAll(".activity select");
const level = document.querySelectorAll(".level select");
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
// 프로그램 element create
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
            <div class="title"> <div class ="program_title">${programTitle}</div>
            <div class ="tag"><button id ="goal_tag">${programGoal} 
            </button> <button id ="level_tag">${programLevel} </button>
            </div>
            </div>
              <div class="content">${programIntro}
              </div>
               </div>
                 </div>
                   </div>
      `;
  return program_content;
}

// ------------------------------------------------회원 이름 키 나이 몸무게
const username = userInfo[0];
const password = userInfo[1];
const age = userInfo[2];
const phone = userInfo[3];
const height = userInfo[4];
const weight = userInfo[5];

// ------------------------------------------------회원 성별
let usersex = ""; //회원 성별 저장
let clickedgoal = null; // 현재 선택된 div
sex.forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target === sex[0]) {
      usersex = "남성";
    } else {
      usersex = "여성";
    }

    //    null 체크       && 사용자가 clicked한 성별이 item과 다르면 clicked클래스 지우기
    if (clickedgoal !== null && clickedgoal !== item) {
      clickedgoal.classList.remove("clicked");
    }
    item.classList.toggle("clicked"); //clicked있으면 지우고 없으면 추가
    //item 사용자가 선택한 성별 값 clicked에 할당
    clickedgoal = item;

    console.log(usersex);
  }); //이벤트
}); //foreach문

let userActivity = "";
// 드롭 다운 선택 활동량 / 난이도 수준
activity.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    userActivity = parseFloat(e.target.value);
    console.log(userActivity);
  });
});

let userLevel = "";
level.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    userLevel = e.target.value;
    console.log(userLevel);
  });
});

// ------------------------------------------------회원 운동목적
let usergoal = ""; //회원 목적 저장 변수
let GoalCal = "";
clickedsex = null;
const dietDropBox = document.querySelector("#diet");
const bulkDropBox = document.querySelector("#bulk");
dietDropBox.style.display = "none";
bulkDropBox.style.display = "none";
Goal.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target == Goal[0]) {
      usergoal = "다이어트";
      dietDropBox.style.display = "block";
      dietDropBox.addEventListener("change", () => {
        GoalCal = dietDropBox.value;
      });

      dietDropBox.addEventListener("mouseleave", () => {
        dietDropBox.style.display = "none";
      });
    } else if (e.target == Goal[1]) {
      usergoal = "근력증가";
      bulkDropBox.style.display = "block";
      bulkDropBox.addEventListener("change", () => {
        GoalCal = bulkDropBox.value;
      });
      bulkDropBox.addEventListener("mouseleave", () => {
        bulkDropBox.style.display = "none";
        // GoalCal = bulkDropBox.value;
      });
    }

    if (clickedsex != null && clickedsex !== item) {
      clickedsex.classList.remove("clicked");
    }
    item.classList.toggle("clicked");
    clickedsex = item;
    console.log(usergoal);
    console.log(GoalCal);
  }); //다이어트 item foreach문
}); // 다이어트 목적 클릭이벤트

// 초기에는 회원가입 제출 버튼을 숨김
complete.style.display = "none";

// -------------운동 추천 받기 클릭시 추천 프로그램 띄움----------------------------
recommend_program.style.display = "none";
warnning_box.style.display = "none";

recommend_program_btn.addEventListener("click", async () => {
  // 입력폼 경고창 띄우기
  const all_input = document.querySelectorAll("input"); //회원가입 모든 인풋
  const warnning_box = document.querySelector("#warnning_box");
  const warnning_Check_btn = document.querySelector("#warnning_Check_btn");

  let foundEmptyField = false; // 빈 필드를 찾았는지 여부를 추적하는 변수

  // 모든 입력사항이 작성이 안되어있으면 경고창 띄우기
  for (const item of all_input) {
    if (
      !item.value ||
      item.value.trim() === "" ||
      usergoal == "" ||
      userActivity == "" ||
      usersex == "" ||
      userLevel == "" ||
      GoalCal == ""
    ) {
      warnning_box.style.display = "block";
      // alert(`${item.placeholder}`)
      foundEmptyField = true;
      break; // 빈 필드를 찾았으므로 루프 종료
    }
  }
  if (!foundEmptyField) {
    // 빈 필드가 없으면
    recommend_program.style.display = "block"; // 추천프로그램창 표시
    complete.style.display = "block"; // 회원가입 제출 버튼 표시
    recommend_program_btn.style.display = "none"; // 추천프로그램 받기 버튼 숨김
  }

  const warnnig_text = document.querySelector("#warnning > p");
  warnnig_text.textContent = "모든 인적사항을 입력해주세요";
  warnning_Check_btn.addEventListener("click", (e) => {
    e.preventDefault();
    warnning_box.style.display = "none";
  });
  // ----------------------------------------------------------------------------------------------------
  const response = await fetch(
    `http://localhost:8080/program/recommendProgram?goal=${usergoal}`
  );
  const result = await response.json();
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
});

// 추천 운동프로그램 선택
let title = "";
recommend_program_content.addEventListener("click", (e) => {
  e.preventDefault();

  // 추천 운동프로그램 띄우기
  const programContainer = e.target.closest(".program_container");
  if (programContainer) {
    title = programContainer.querySelector(".program_title").textContent; //클릭시 클릭한 운동 프로그램 value 선택
    recommend_program_content.style.display = "none";

    const complete_alert = document.createElement("div"); // div만들어서 알림창 띄우기
    recommend_program.append(complete_alert);
    complete_alert.classList = "complete_alert";
    complete_alert.innerHTML = `
        <p>축하합니다! </p>
        <p>선택하신 운동 프로그램은</p> <p>${title}</p> <p>입니다.</p>
       <div> <button id ='complete_alert_button'> 확인 </button> </div>`;
    const complete_alert_button = document.querySelector(
      "#complete_alert_button"
    );
    complete_alert_button.addEventListener("click", (e) => {
      //클릭하면 창 닫기
      e.preventDefault();
      recommend_program.style.display = "none";
    });
  } //if문
}); // 이벤트 리스너

// 회원 인적사항 제출
complete.addEventListener("click", async () => {
  const response = await fetch("http://localhost:8080/user/signup", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: username.value,
      password: password.value,
      age: age.value,
      sex: usersex,
      phone: phone.value,
      height: height.value,
      weight: weight.value,
      activity: userActivity,
      goalCal: GoalCal,
      userChoiceGoal: usergoal,
      userChoiceLevel: userLevel,
      programTitle: title,
    }),
  });
  if (response.status === 201) {
    window.location.href = "http://localhost:5500/index.html";
  } else {
    // 실패한 경우 처리
    alert("중복된 휴대폰 번호입니다.");
  }
}); //회원가입 클릭 버튼시 제출

const message = document.querySelectorAll(".message");
message.forEach((item) => {
  item.style.display = "none";
});

height.addEventListener("input", height_input);
weight.addEventListener("input", height_input);
age.addEventListener("input", ageInput);

// 최대 3자리수 입력 & 키 앞자리수 1or2만 받기
function height_input(e) {
  const letter = e.target.value;
  const message1 = e.target.nextElementSibling;
  if (letter.length > 3) {
    e.target.value = letter.slice(0, 3);
    // e.target.style.borderColor = "red";
    message1.style.display = "block"; // p 태그 보이기
  } else {
    // e.target.style.borderColor = "gray";
    message1.style.display = "none"; // p 태그 숨기기
  }
}

// 나이 최대 2자리수 입력
function ageInput(e) {
  const letter = e.target.value;
  const message = e.target.nextElementSibling;
  if (letter.length > 2) {
    e.target.value = letter.slice(0, 2);
    // e.target.style.borderColor = "red";
    message.style.display = "block"; // p 태그 보이기
  } else {
    // e.target.style.borderColor = "gray";
    message.style.display = "none"; // p 태그 숨기기
  }
}

// const all_input = document.querySelectorAll("input");
// const warnnig_text = document.querySelector("#warnning > p");
// const warnning_box = document.querySelector("#warnning_box");
// const warnning_Check_btn = document.querySelector("#warnning_Check_btn");
// warnning_box.style.display = "none";
// warnnig_text.textContent = "모든 인적사항을 입력해주세요";
// warnning_Check_btn.addEventListener("click", () => {
//   warnning_box.style.display = "none";
// });
