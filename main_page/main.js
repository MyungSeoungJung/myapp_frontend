const recommend_program = document.querySelector("#recommend_program");
const recommend_program_select = document.querySelectorAll(".program_container");
const recommend_program_content = document.querySelector("#recommend_program_content");
const program_wrapper = document.querySelector("#program_wrapper");

function creatProgram(img,programGoal,programIntro,programTitle){
    const program_content = document.createElement("div");
    program_content.dataset.programGoal = programGoal; 
    program_content.innerHTML =

    ` <div class="program_wrapper">
          <div class="program_container">
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

(async() => {
    const response = await fetch ("http://localhost:8080/user/main",{
        headers : {
         Authorization: `Bearer ${getCookie(
            "token"   //토큰을 get해서 
         )}`,   
        }
    });  //함수 구현
    const result = await response.json(); //
    console.log(result);

    username.textContent =  result.name + "님";

    // -------------추천 프로그램 띄우는 코드--------------------
    recommend_program.style.display ="none";

    if (result.programName == null) {
        alert("프로그램이 선택되지 않았습니다 추천 프로그램을 띄워드릴게요")
        recommend_program.style.display ="block";
    }
    // 추천 프로그램 가져오기

    (async () =>  {
    const response = await fetch ("http://localhost:8080/user/recommendProgram")
     
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
            item.img,
            item.programGoal, 
            item.programIntro, 
            item.programTitle
        )
    );
    count++;
}
    })();

    // 선택 프로그램 서버 요청
    recommend_program_select.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            
        })
        
    });

})(); // 즉시실행 

