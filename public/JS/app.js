console.log("connected");


const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");


weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading weather data...";
    messageTwo.textContent = " "
    fetch("http://localhost:3000/weather?address="+location)
    .then((response) => {
        response.json()
        .then((data) => {
            if(data.e) {
                console.log(data.e);
                messageOne.textContent = "Uh Oh!"
                messageTwo.textContent = data.e;
            } else {
                messageOne.textContent = "Here is your weather report for " + data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})

