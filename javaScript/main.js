let events = [];
let information = [];

const eventName = document.getElementById("eventName");
const eventDate = document.querySelector("#eventDate");
const butonAdd = document.querySelector("#button");
const eventContainer = document.querySelector("#eventsContainer");

const json = load();

try{
    information = JSON.parse(json);
}catch(error){
    information = [];
};
events = information? [...information]: [];

renderEvents();

document.querySelector("form").addEventListener("submit",(e)=>{
    e.preventDefault();
    addEvent();
});

function addEvent(){
    if(eventName.value === "" || eventDate === ""){
        return;
    }

    if(dateDiff(eventDate.value)<0){
        return;
    }

    const newEvent = {
        id: (Math.random()*100).toString(36).slice(3),
        name: eventName.value,
        date: eventDate.value,
    };

    events.unshift(newEvent);

    save(JSON.stringify(events));

    eventName.value = "";

    renderEvents();
};

function dateDiff(d){
    const targetDate = new Date(d);
    const todayDate = new Date();
    const difference = targetDate.getTime() - todayDate.getTime();
    const days = Math.ceil(difference/(1000 * 3600 * 24));
    return days;
};

function renderEvents(){
    const eventsHTML = events.map(event =>{
        return `
            <div class="event">
                <div class="days">
                    <span class="days-number">${dateDiff(event.date)}</span>
                    <span class="days-text">days</span>
                </div>

                <div class="eventName">
                    ${event.name}
                </div>

                <div class="eventDate">
                    ${event.date}
                </div>

                <div class="actions">
                    <button class="deleteDate" data-id="${event.id}">Delete</button>
                </div>
            </div>
        `;
    });
    eventContainer.innerHTML = eventsHTML.join("");

    document.querySelectorAll(".deleteDate").forEach(button =>{
        button.addEventListener("click", e=>{
            const id = button.getAttribute("data-id");
            events = events.filter(event => event.id !== id);

            renderEvents();
        });
    });
};


function save(data){
    localStorage.setItem("items", data);
};

function load(){
    return localStorage.getItem("items");
};