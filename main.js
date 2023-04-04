window.addEventListener("load", () => {
  const form = document.querySelector("#new_task_form");
  const input = document.querySelector("#new_task_input");
  const dateInput = document.querySelector("#new_task_date");
  const timeInput = document.querySelector("#new_task_time");
  const list_el = document.querySelector("#tasks");
  let tasks = [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      tasks = JSON.parse(savedTasks);
      tasks.forEach(({ text, date, time }, i) => {
        const task_el = createTaskElement({ task: text, date, time }, i);
        list_el.appendChild(task_el);
      });
    }
  };

  const createTaskElement = ({ task, date, time }, index) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");
    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    task_el.appendChild(task_content_el);

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = task;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);

    const task_date_el = document.createElement("p");
    task_date_el.classList.add("date");
    task_date_el.innerText = date;

    task_content_el.appendChild(task_date_el);

    const task_time_el = document.createElement("p");
    task_time_el.classList.add("time");
    task_time_el.innerText = time;

    task_content_el.appendChild(task_time_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";
    // my Code:
    task_delete_el.onclick = function () {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.splice(index, 1);
        saveTasks();
    };
    const task_done_el = document.createElement("button");
    task_done_el.classList.add("done");
    task_done_el.innerText = "Done";
    if (tasks[index].isDone) {
      task_done_el.innerText = "Not Yet";
      task_done_el.style.color = "#bd6200";
      task_el.style.background = "#59ab9d";
      task_input_el.style.textDecoration = "line-through";
    }
    task_done_el.onclick = function () {
      tasks = JSON.parse(localStorage.getItem("tasks"));
      console.log(tasks[index]);
      tasks[index].isDone = !tasks[index].isDone;
      console.log(tasks[index]);
      saveTasks();
    };
    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_actions_el.appendChild(task_done_el);

    task_el.appendChild(task_actions_el);

    task_edit_el.addEventListener("click", (e) => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_date_el.style.display = "none";
        task_time_el.style.display = "none";
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
        task_date_el.style.display = "block";
        task_time_el.style.display = "block";
        task = task_input_el.value;
        saveTasks();
      }
    });

    task_delete_el.addEventListener("click", (e) => {
      tasks = tasks.filter((t) => t !== task);
      list_el.removeChild(task_el);
      saveTasks();
    });

    task_done_el.addEventListener("click", (e) => {
      if (task_done_el.innerText == "DONE") {
        task_done_el.innerText = "Not Yet";
        task_done_el.style.color = "#bd6200";
        task_el.style.background = "#59ab9d";
        task_input_el.style.textDecoration = "line-through";
        // my code:
        console.log(JSON.parse(localStorage.getItem("tasks")));
        task_done_el.focus();
      } else {
        task_done_el.innerText = "Done";
        task_done_el.style.color = "#00fb47";
        task_el.style.background = " #111827";
        task_input_el.style.textDecoration = "none";
        task_done_el.focus();
      }
    });

    return task_el;
  };

  loadTasks();

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = input.value;
    const date = dateInput.value;
    const time = timeInput.value;

    tasks.push({ text, date, time });
    saveTasks();
    const task_el = createTaskElement({ text, date, time });
    list_el.appendChild(task_el);

    

    input.value = "";
    dateInput.value = "";
    timeInput.value = "";
  });
});
