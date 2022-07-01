// Planner
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // Store before JSON

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() 
{
    const date = new Date();

    const day = date.getDate();
    const month = date.getMonth(); // in index value, add 1 to month
    const year = date.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1); // thus the 1
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // year, month + 1, day -> 0 = last day of previous month 

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); // additional days before first day of month begins in calendar 
    
    document.getElementById('monthDisplay').innerText = 
    `${date.toLocaleDateString('en-us', { month: 'long'})} ${year}`;
    
    for (let i = 1; i <= paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day'); // day class

        if (i > paddingDays) // iterate day square depending on padding day(s)
        {
            daySquare.innerText = i - paddingDays; // number of current square

            daySquare.addEventListener('click', () => console.log('clicl'));
        }
        else 
        {
            daySquare.classList.add('padding'); // invisible
        }
        calendar.appendChild(daySquare);
    }
}

function initButtons()
{
    // next and back button button functions
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    });
}
initButtons();


load(); 

// Agenda
const tasks = document.getElementsByClassName("tasks")[0];
const input = document.getElementById("input");

input.addEventListener("keydown", function(event) 
{
    if (event.key === "Enter") 
    {
        addItem();
    }
});

function addItem() 
{
    var divParent = document.createElement("div");
    var divChild = document.createElement("div");
    var deleteButton = document.createElement("button");

    deleteButton.style.width = '50px';
    deleteButton.style.height = '25px';
    deleteButton.style.fontSize = '12px';
    deleteButton.innerText = 'Delete';
    

    divParent.className = "task";
    divParent.innerHTML = '<div>'+input.value+'</div>';

    deleteButton.addEventListener("click", function() {
        divParent.remove();
    });

    divChild.appendChild(deleteButton);

    divParent.appendChild(divChild);

    tasks.appendChild(divParent);

    input.value = '';
}
