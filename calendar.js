// Planner
let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // Store before JSON

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal= document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date)
{
    clicked = date;

    const eventForDay = events.find(e => e.date === clicked);

    if (eventForDay)
    {
        document.getElementById('eventText').innerText = eventForDay.title;
        deleteEventModal.style.display = 'block';
    }
    else 
    {
        newEventModal.style.display = 'block'; 
    }
    backDrop.style.display = 'block'; 
}

function load() 
{
    const dt = new Date();

    if (nav !== 0)
    {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth(); // in index value, add 1 to month
    const year = dt.getFullYear();

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
    `${dt.toLocaleDateString('en-us', { month: 'long'})} ${year}`;
    
    calendar.innerHTML = '';

    for (let i = 1; i <= paddingDays + daysInMonth; i++)
    {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day'); // day class

        const dayString = `${month + 1}/${i - paddingDays}/${year}`;

        if (i > paddingDays) // iterate day square depending on padding day(s)
        {
            daySquare.innerText = i - paddingDays; // number of current square
            const eventForDay = events.find(e => e.date === dayString);

            if (i - paddingDays === day && nav === 0)
            {
                daySquare.id = 'currentDay';
            }
            
            if (eventForDay)
            {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                eventDiv.innerText = eventForDay.title;
                daySquare.appendChild(eventDiv);
            }
            daySquare.addEventListener('click', () => openModal(dayString));
        }
        else 
        {
            daySquare.classList.add('padding'); // invisible
        }
        calendar.appendChild(daySquare);
    }
}

function closeModal()
{
    eventTitleInput.classList.remove('error');
    newEventModal.style.display = 'none';
    deleteEventModal.style.display = 'none';
    backDrop.style.display = 'none';
    eventTitleInput.value = '';
    clicked = null;
    load();
}

function saveEvent()
{
    if (eventTitleInput.value)
    {
        eventTitleInput.classList.remove('error');

        events.push({
            date: clicked,
            title: eventTitleInput.value,
        });

        localStorage.setItem('events', JSON.stringify(events));
        closeModal();
    }
    else 
    {
        eventTitleInput.classList.add('error');
    }
}

function deleteEvent()
{
    events = events.filter(e => e.date !== clicked);
    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
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
    document.getElementById('saveButton').addEventListener('click', saveEvent);
    document.getElementById('cancelButton').addEventListener('click', closeModal);
    document.getElementById('deleteButton').addEventListener('click', deleteEvent);
    document.getElementById('closeButton').addEventListener('click', closeModal);
}

initButtons();
load(); 