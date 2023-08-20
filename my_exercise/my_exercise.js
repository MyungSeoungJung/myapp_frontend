function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            name.replace(
                /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
                "\\$1"
            ) +
            "=([^;]*)"
        )
    );
    return matches
        ? decodeURIComponent(matches[1])
        : undefined;
}
const img = document.querySelector("#img");
const title = document.querySelector("#program_title");
const intro = document.querySelector("#program_intro");
const level = document.querySelector("#ProgramLevel");
const goal = document.querySelector("#programGoal");

(async () => {
    const response = await fetch("http://localhost:8080/program/myExercise", {
        headers: {
            Authorization: `Bearer ${getCookie(
                "token" //토큰을 get해서
            )}`,
        },
    }); //함수 구현
    const result = await response.json(); //
    console.log(result);
    img.innerHTML = `<img width="auto" height="30" src="${result.programImg}">`;
    title.textContent = result.programTitle;
    intro.textContent = result.programIntro;
    level.textContent = result.programLevel;
    goal.textContent = result.programGoal;
})();