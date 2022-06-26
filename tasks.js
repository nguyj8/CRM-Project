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

    deleteButton.addEventListener("click", function() 
    {
        divParent.remove();
    });

    divChild.appendChild(deleteButton);

    divParent.appendChild(divChild);

    tasks.appendChild(divParent);

    input.value = '';
}
