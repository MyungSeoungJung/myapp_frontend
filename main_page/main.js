const recommend_program = document.querySelector("#recommend_program");
const recommend_program_select = document.querySelectorAll(".program_container");
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
        // alert("프로그램이 선택되지 않았습니다 추천 프로그램을 띄워드릴게요")
        recommend_program.style.display ="block";
    }
})(); // 즉시실행 

