document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos';
    const todosPerPage = 10; 
    let currentPage = 1; 

    const todoList = document.getElementById('todo-list');
    const pageNumber = document.getElementById('page-number');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    async function fetchTodos(page) {
        try {
            const response = await fetch(`${apiUrl}?_page=${page}&_limit=${todosPerPage}`);
            if (!response.ok) throw new Error('Failed to fetch todos');
            const todos = await response.json();
            displayTodos(todos);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function displayTodos(todos) {
        todoList.innerHTML = ''; 
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            todoItem.innerHTML = `
                <h3>${todo.title}</h3>
                <p>Status: ${todo.completed ? 'Completed' : 'Not Completed'}</p>
            `;
            todoList.appendChild(todoItem);
        });
    }

    function updatePagination() {
        pageNumber.textContent = `Page ${currentPage}`;
    }

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchTodos(currentPage);
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', () => {
        currentPage++;
        fetchTodos(currentPage);
        updatePagination();
    });

   
    fetchTodos(currentPage);
    updatePagination();
});
