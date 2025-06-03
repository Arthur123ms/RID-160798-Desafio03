let tasks = [
    { id: 1, description: 'Implementar tela de listagem de tarefas', checked: false, etiqueta: 'back-end'},
    { id: 2, description: 'Criar endpoint para cadastro de tarefas', checked: false, etiqueta: 'web'},
    { id: 3, description: 'Implementar protótipo da listagem de tarefas ', checked: false, etiqueta: 'front-end'},

]


const createTaskListItem = (task , buttonWrapper) => {
    const list = document.getElementById('todo-list');
    const toDo = document.createElement('li');

    toDo.id = task.id;
    toDo.appendChild(buttonWrapper);
    list.appendChild(toDo);

    return toDo;
}


const createEtiqueta = ( texto) => {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'etiqueta';
    etiqueta.textContent = texto;

    return etiqueta;
}

const createCheckIcon = () => {
    const img = document.createElement('img');
    img.className = 'check-icon-final';
    img.src = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png';
    img.alt = 'Tarefa Concluida';
    img.width = 40;
    img.height = 40;

    return img;
}

const updateContadorConluide = () => {
    const totalConcluidas = tasks.filter(t => t.checked).length;
    document.getElementById('contador-concluida').textContent = totalConcluidas;
}

const createConcludeButton = (tasks, label, wrapper, rightContainer) => {
    const button = document.createElement('button');
    button.innerHTML = 'Concluir';
    button.className = 'button-checked';
    button.type = 'button';
    button.id = `${tasks.id}-button`;

    const updateButtonState = () => {
        if(tasks.checked) {
            button.disabled = true;
            button.textContent = 'Concluido';
        } else {
            button.disabled = false;
            button.textContent = 'Concluir';
        }
    }

    button.addEventListener('click', () =>{
        tasks.checked = !tasks.checked;

        if(tasks.checked) {
        label.style.textDecoration = 'line-through';
        wrapper.classList.add('tarefa-concluida');

        const checkIcon = createCheckIcon();
        checkIcon.classList.add(`check-icon-${tasks.id}`)
        rightContainer.appendChild(checkIcon);
        button.remove();
        } else {
            label.style.textDecoration = 'none';
            wrapper.classList.remove('tarefa-concluida');

            const icon = rightContainer.querySelector(`.check-icon-${tasks.id}`);
            if (icon) {
                icon.remove();
            }
        }

        updateButtonState();
        updateContadorConluide();

    });

    updateButtonState();

    return button;
}

const createTasksLabel = (description, checked) => {
    const label = document.createElement('label');
    label.textContent = description;

    if(checked) {
        label.style.textDecoration = 'line-through';
    }

    return label;
}


const createMetaRow = (etiqueta, data) => {
    const metaRow = document.createElement('div');
    metaRow.className = 'meta-row';

    const tag = document.createElement('span');
    tag.className = 'etiqueta';
    tag.textContent = etiqueta;

    const date = document.createElement('span');
    date.className = 'task-date';
    date.textContent = `Criado em: ${data}`;

    metaRow.appendChild(tag);
    metaRow.appendChild(date);

    return metaRow;
}


const  buildTaskContainer = (tasks) => {
    const wrapper = document.createElement('div')
    wrapper.className = 'div-container';

    const left = document.createElement('div');
    left.className = 'left-content';

    const label = createTasksLabel(tasks.description, tasks.checked);
    const metaRow = createMetaRow(tasks.etiqueta, tasks.data);

    left.appendChild(label);
    left.appendChild(metaRow);

    const right = document.createElement('div');
    right.className = 'right-content';

    const button = createConcludeButton(tasks, label, wrapper, right);
    if(tasks.checked) {
        button.disabled = true;
        button.textContent = 'Concluído';
        wrapper.classList.add('tarefa-concluida');
    }
    
    right.appendChild(button);

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    return wrapper;
}

const getNewTasksId = () => {
     const lastId = tasks[tasks.length - 1]?.id;
     return lastId ? lastId + 1 : 1;
}

const getNewTaskData = () => {
    const description = document.getElementById('description1').value.trim();
    const etiqueta = document.getElementById('description2').value.trim();
    const id = getNewTasksId();
   
    const data = new Date().toLocaleDateString();

    return {description, id, etiqueta, data, checked: false};
}


const createTask = (event) => {
    event.preventDefault();

    const newTaskData = getNewTaskData();
    tasks.push(newTaskData); 

    const wrapper =  buildTaskContainer(newTaskData);
    createTaskListItem(newTaskData, wrapper);

    updateContadorConluide();


    document.getElementById('description1').value = '';
    document.getElementById('description2').value = '';
}





window.onload = function () {
    const form = document.getElementById('create-todo-form');
    form.addEventListener('submit', createTask);

    tasks.forEach(task => {
        if (!task.data) {
            task.data = new Date().toLocaleDateString()
        }


        const wrapper =  buildTaskContainer(task);
        createTaskListItem (task,wrapper);
        
    })

    updateContadorConluide();
}