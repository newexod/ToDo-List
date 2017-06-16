function Task(text, isDone) {
	this.text = text;
	this.isDone = isDone || false;
};

Task.prototype.done = function() {
	this.isDone = !this.isDone;
	console.log(this);
};

Task.prototype.el = function(n) {
	var el = document.createElement('li');
	el.innerText = this.text;

	var done = document.createElement('button');
	done.innerText = 'done';
	if (this.isDone) {
		el.classList.add('passed');
	}

	var self = this;
	done.addEventListener('click', function() {
		console.log(self)
		self.done();
		el.classList.toggle('passed');
		allTasks.save();

		if (isHide) {
			el.classList.add('hide');
		}
	});

	var remove = document.createElement('button');
	remove.innerText = 'remove';
	remove.addEventListener('click', function() {
		el.remove();
		delete allTasks[n];
		allTasks.save();
	})

	el.appendChild(done);
	el.appendChild(remove);

	return el;
};

function List() {}

List.prototype = [];

List.prototype.save = function() {
	localStorage.myApp = JSON.stringify(this);
}


var allTasks = new List();
console.log(allTasks);

if (localStorage.myApp) {
	var lastTasks = JSON.parse(localStorage.myApp);
	delete lastTasks.length;
	console.log(lastTasks);
	for(var i in lastTasks) {
		lastTasks[i];
		var task = new Task(lastTasks[i].text, lastTasks[i].isDone);
		var num = allTasks.push(task) - 1;
		document.querySelector('.list').appendChild(task.el(num));
	}
}

var isHide = false;

var add = document.getElementById('add');
add.addEventListener('click', function(event) { // добавляет новый таск
	var text = document.getElementById('new').value;
	var task = new Task(text); // {text: ...., isDone: false}
	var num = allTasks.push(task) - 1;
	console.log(num);

	document.querySelector('.list').appendChild(task.el(num));
	allTasks.save();
});


document.getElementById('showHide')
	.addEventListener('click', function() {
		isHide = !isHide;
		var els = document.querySelectorAll('.passed');
		[].forEach.call(els, function(item) {
			item.classList.toggle('hide');
		});
	});