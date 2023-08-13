const username = document.querySelector("#username")
console.log(username);

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
    // if (result.programName == null) {
    //     alert("프로그램을 선택하지않으셨습니다")
        
    // }
})(); // 즉시실행 