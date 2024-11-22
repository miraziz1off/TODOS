export function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('box1');

    const inputToday = document.createElement('div');
    inputToday.classList.add('input_today');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = task.completed;
    
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = task.title;

    checkbox.addEventListener('change', (event) => {
        event.preventDefault();
        const updatedTask = { ...task, completed: checkbox.checked };

        fetch(`http://localhost:3001/todos/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json());
    });

    inputToday.appendChild(checkbox);
    inputToday.appendChild(title);

    const textToday = document.createElement('div');
    textToday.classList.add('text_today');
    
    const desc = document.createElement('p');
    desc.classList.add('desc');
    desc.textContent = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, recusandae.';

    const dayOfTodo = document.createElement('p');
    dayOfTodo.classList.add('dayoftodo');
    dayOfTodo.textContent = task.left === 0 ? 'Today' : `In ${task.left} days`;

    textToday.appendChild(desc);
    textToday.appendChild(dayOfTodo);

    taskElement.appendChild(inputToday);
    taskElement.appendChild(textToday);

    return taskElement;
}