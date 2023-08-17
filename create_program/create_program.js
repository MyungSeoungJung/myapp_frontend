function creatLi(programLevel, programGoal, img, programIntro, programTitle) {
  const li = document.createElement("li");
  li.dataset.goal = programGoal;
  li.innerHTML = `
  <div>
  <p>수준: ${programLevel}</p>
  <hr/>
  <p>목적: ${programGoal}</p>
  <hr/>
  <p>제목: ${programTitle}</p>
  <hr>
  <div>이미지 : <img width="auto" height="30" src="${img}"></div>
  <hr />
  <p>소개글: ${programIntro}</p>
  </div>
  `;
  return li;
}
// private String rate;    //별점
// private String programLevel;   //프로그램이 초급자용인지 고급자용인지
// private String programGoal;  //다이어트 프로그램인지
// private String img;
// private String programIntro; //프로그램 소개글
// private String programTitle; // 프로그램 제목
const levels = document.querySelectorAll(".level select");
const goals = document.querySelectorAll(".goal select");
const title = document.querySelector("#input  > input");
const content = document.querySelector("#input > textarea");
const file = document.querySelector("#file");
const btn = document.querySelector("button");

let level = "";
levels.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    level = e.target.value;
    console.log(level);
  });
});

let goal = "";
goals.forEach((item) => {
  item.addEventListener("change", (e) => {
    e.preventDefault();
    goal = e.target.value;
    console.log(goal);
  });
});

// 프로그램 추가하는 곳
btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const reader = new FileReader();
  reader.addEventListener("load", async (e) => {
    const image = e.target.result;

    const response = await fetch("http://localhost:8080/program/addProgram", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        programLevel: level,
        programGoal: goal,
        programTitle: title.value,
        programIntro: content.value,
        img: image,
      }),
    });
    // 여기까진 잘 들어감

    const result = await response.json();
    const ul = document.querySelector("ul");

    const { data } = result;
    ul.prepend(
      creatLi(
        data.programLevel,
        data.programGoal,
        data.img,
        data.programIntro,
        data.programTitle
      )
    );
  }); // 파일리드 리스너

  reader.readAsDataURL(file.files[0]);
}); //제출버튼 리스너

// 프로그램 불러오는 곳

(async () => {
  const response = await fetch("http://localhost:8080/program");

  result = await response.json();

  const ul = document.querySelector("ul");
  for (let item of result) {
    ul.append(
      creatLi(
        item.programLevel,
        item.programGoal,
        item.img,
        item.programIntro,
        item.programTitle
      )
    );
  }
})();
