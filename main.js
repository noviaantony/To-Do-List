
    // ========== START MODEL SECTION =================================================================================

    // if local storage has a todos array use it, else : use default array

    let todos;

    // Retrieve localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    // Check if it's an array
    if (Array.isArray(savedTodos)) {
      todos = savedTodos;
    } else {
      todos = [{
        title: 'Get groceries',
        dueDate: '2021-10-04',
        id: 'id1'
      }, {
        title: 'Wash car',
        dueDate: '2021-02-03',
        id: 'id2'
      }, {
        title: 'Make dinner',
        dueDate: '2021-03-04',
        id: 'id3'
      }];
    }


    function createToDo(title, dueDate) {
      const id = '' + new Date().getTime(); // gets current time in milliseconds
      todos.push({
        title : title,
        dueDate: dueDate,
        id: id
      });

      saveToDo();
    }

    function removeToDo(idToDelete) {
        todos = todos.filter(function (todo) { // we need to reassign todos
          if (todo.id === idToDelete) {
            return false; 
          }
          return true; // whatever that returns true will be removed (or filtered)
        }); 

        saveToDo();
    }

    // this should run whenever our todos change
    function saveToDo() {
      localStorage.setItem('todos', JSON.stringify(todos)); // !
      
    }

    // ========== END MODEL SECTION =================================================================================

    // ========== START VIEW SECTION =================================================================================

    function render() { // clear the div and adds the updated list
      // reset the list
      document.getElementById('mytodolist').innerHTML = '';

      todos.forEach(function(todo) {
        const element = document.createElement('li'); 
        element.className = 'todo-item'
        element.innerText = todo.title + ' ' + todo.dueDate;

        const deleteButton = document.createElement('button');
        // deleteButton.className = "delete-btn"
        deleteButton.className = "delete-btn"
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        deleteButton.style = "margin-left: 263px";
        deleteButton.onclick = deleteToDo; // not deleteToDo() !
        deleteButton.id = todo.id;
        element.appendChild(deleteButton);


        const todolist = document.getElementById('mytodolist');
        todolist.appendChild(element);
      });
    }

    render();

    // ========== END VIEW SECTION =================================================================================

    // ========== START CONTROLLER SECTION =================================================================================

    function addToDo() {
      const textbox = document.getElementById('todo-title');
      const title = textbox.value;

      const datePicker = document.getElementById('date-picker');
      const dueDate = datePicker.value;

      createToDo(title, dueDate);
      render();  // updates the page! 
    }

    function deleteToDo(event) {
      const deleteButton = event.target;
      const idToDelete = deleteButton.id;

      removeToDo(idToDelete);
      render();
    }

    render(); /// DONT FORGET THIS ! u need to finally update again


    // ========== END CONTROLLER SECTION =================================================================================
