const input = document.querySelectorAll("input");
const btn = document.querySelector("button");


btn.addEventListener("click", async (e)=>{
const phone = input[0].value;
const password = input[1].value;
    console.log(password);
    console.log(phone);
    e.preventDefault();

const response = await fetch(`http://localhost:8080/user/signin?phone=${phone}&password=${password}` ,{
    method : "POST",
    headers : {
        "content-type" : "application/json",
    },
    
});
});

