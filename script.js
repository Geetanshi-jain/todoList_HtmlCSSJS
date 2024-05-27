document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    let inputBox = document.getElementById("input-box");
    let listContainer = document.getElementById("list-container");

    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);
        inputBox.value = "";

        let span = document.createElement("SPAN");
        let txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);

        span.onclick = function() {
            let div = this.parentElement;
            div.remove();
            saveTasks();
        };

        li.onclick = function() {
            this.classList.toggle('checked');
            saveTasks();
        };

        saveTasks();
    }
}

function saveTasks() {
    let tasks = [];
    let listItems = document.querySelectorAll('#list-container li');
    listItems.forEach(item => {
        tasks.push({
            text: item.textContent.replace("\u00D7", ""),
            checked: item.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            let li = document.createElement("li");
            li.textContent = task.text;
            if (task.checked) {
                li.classList.add('checked');
            }

            let span = document.createElement("SPAN");
            let txt = document.createTextNode("\u00D7");
            span.className = "close";
            span.appendChild(txt);
            li.appendChild(span);

            span.onclick = function() {
                let div = this.parentElement;
                div.remove();
                saveTasks();
            };

            li.onclick = function() {
                this.classList.toggle('checked');
                saveTasks();
            };

            document.getElementById("list-container").appendChild(li);
        });
    }
}
