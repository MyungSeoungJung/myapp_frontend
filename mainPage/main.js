const username = document.querySelector("#username")
console.log(username);

(async() => {
    const response = await fetch ("http://localhost:8080/user/main",{
        headers : {
         Authorization: `Bearer ${getCookie(
            "token"
         )}`,   
        }
    });  //get으로 요청보내서 유저이름 받아오기

})();