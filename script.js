var toDoList ={
	list: [],

	addTask: function(task){ // task('hi')
			this.list.push({
			toTask: task, //task: 'hi
			completed: false
		});
	},

	changeTask: function(position, newTask){
		this.list[position].toTask = newTask;
		document.getElementById('inputText').value = "";
		document.getElementById('inputText').placeholder = "Plans for today?";
	},

	toggleCompleted: function(position){
		var taskId = this.list[position];
		taskId.completed = !taskId.completed;
		view.displayTasks();
	},

	toggleAll: function(){
		var totalTasks = this.list.length;
		var completedTasks = 0;

		this.list.forEach(function(toTask){
			if(toTask.completed === true){
				completedTasks++;
			};
		});
		
		this.list.forEach(function(toTask){			
			if(completedTasks === totalTasks){
				toTask.completed = false;
			}else{
				toTask.completed = true;
			};
		});
	},

	deleteTask: function(position){
		this.list.splice(position, 1);
	}
};

var handlers = {

	addTask2: function(e){
	var textInput = document.getElementById('inputText');
		if(e.keyCode === 13){
			e.preventDefault();
			toDoList.addTask(textInput.value);
			textInput.value = "";
			textInput.placeholder = "Plans for today?";
			view.displayTasks();
		};	
	},

	newTask: function(e){

		for(var i = 0; i < toDoList.list.length; i++){
			if(toDoList.list[i].completed === true){
				var textBox = document.getElementById('inputText');
				var textInput = textBox.value;	
				toDoList.changeTask(i, textInput);
							
			};
					
		};

		view.displayTasks();
	},	
	
		
	toggleAll: function(){
		toDoList.toggleAll();
		view.displayTasks();
	},

	deleteTask: function(){
		for(var i = toDoList.list.length - 1; i >= 0; i--){
			if(toDoList.list[i].completed === true){
				toDoList.deleteTask(i);
			};
		};
		view.displayTasks();
	}
};
	


var view = {

	displayTasks: function(){
	
		var tasksUl = document.querySelector('ul');
		tasksUl.innerHTML = '';

		toDoList.list.forEach(function(task, position){
		
			var tasksLi = document.createElement('li');
			tasksLi.setAttribute('class', 'list-group-item');
			tasksLi.setAttribute('id', position);

			if(task.completed === true){
				
				tasksLi.setAttribute('class', 'list-group-item active');
				
			}else{

				tasksLi.removeAttribute('active');

			};

			
			tasksLi.textContent = task.toTask;
			tasksUl.appendChild(tasksLi);

		}, this);
	},

	setUpEventListeners: function(){
		var tasksDiv = document.getElementsByClassName('well');
		var tasksUl = document.querySelector('ul');
		tasksUl.addEventListener('click', function(event){
			event.target.id
			var elementClicked=event.target.id;
			toDoList.toggleCompleted(parseInt(elementClicked));
		});

	}
};

view.setUpEventListeners();