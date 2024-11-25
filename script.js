import { reload } from "./libs/utils.js";
import { createTaskElement } from "./components/todos.js";

const list_today = document.querySelector('.list_today');
const taskInfo = document.querySelector('#taskInfo');
const onlyTodayLink = document.querySelector('#onlyToday');
const homepageLink = document.querySelector('#homepage');
const allTodosSection = document.querySelector('.today');
const tomorrowSection = document.querySelector('.tomarrow');
const laterSection = document.querySelector('.later');

fetch('http://localhost:3001/todos')
    .then(response => response.json())
    .then(todos => {
        const undoneTasks = todos.filter(todo => !todo.completed); 
        const todayTasks = todos.filter(todo => todo.left === 0);
        const tomorrowTasks = todos.filter(todo => todo.left === 1);
        const laterTasks = todos.filter(todo => todo.left > 1);

        const todayContainer = document.querySelector('.list_today');
        const tomorrowContainer = document.querySelector('.alltodos2');
        const laterContainer = document.querySelector('.alltodos3');

        reload(todayTasks, todayContainer, createTaskElement);
        reload(tomorrowTasks, tomorrowContainer, createTaskElement);
        reload(laterTasks, laterContainer, createTaskElement);

        taskInfo.textContent = `HI, YOU HAVE ${undoneTasks.length} UNDONE TASKS`;

        onlyTodayLink.addEventListener('click', () => {
            onlyTodayLink.style.color = '#FFC700';
            homepageLink.style.color = '#000000';
            taskInfo.style.display = 'none';
            allTodosSection.querySelector('.alltodos').textContent = 'ONLY TODAY TODOS';
            tomorrowSection.style.display = 'none';
            laterSection.style.display = 'none';
        });

        homepageLink.addEventListener('click', () => {
            homepageLink.style.color = '#FFC700';
            onlyTodayLink.style.color = '#000000';
            taskInfo.style.display = 'block';
            taskInfo.textContent = `HI, YOU HAVE ${undoneTasks.length} UNDONE TASKS`;
            allTodosSection.querySelector('.alltodos').textContent = 'ALL TODOS';
            tomorrowSection.style.display = 'flex';
            laterSection.style.display = 'flex';
        });
    })
    .catch(error => console.error(error));
