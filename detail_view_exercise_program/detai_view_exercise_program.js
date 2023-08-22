// 로컬 스토리지에 저장된 ul 객체 가져오기
document.addEventListener("DOMContentLoaded", async () => {
  const id = window.location.search;
  const response = await fetch(
    `http://localhost:8080/program/detailProgram${id}`
  );
  if (response) {
    const result = await response.json();

    // 여기서 result를 활용하여 화면에 표시하거나 필요한 작업을 수행할 수 있습니다.
    console.log(result);
    const img = document.querySelector("#img");
    const title = document.querySelector("#program_title");
    const intro = document.querySelector("#program_intro");
    const level = document.querySelector("#ProgramLevel");
    const goal = document.querySelector("#programGoal");
    const coach_name = document.querySelector("#coach_name");

    img.innerHTML = `<img width="auto" height="30" src="${result.programImg}">`;
    title.innerHTML = result.programTitle;
    intro.innerHTML = result.programIntro;
    level.innerHTML = result.programLevel;
    goal.innerHTML = result.programGoal;
    coach_name.innerHTML = result.coachName;
  }
});
