let containersArray = [];

const addContainerButton = document.getElementById("addContainer");

const clearContainersButton = document.getElementById("clearContainers");
const saveContainersButton = document.getElementById("saveContainers");
const loadContainersButton = document.getElementById("loadContainers");

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
};


function getIndexById(idToSearch, list){
  return list.findIndex(elem => elem.id == idToSearch) 
};

function clearAllContainers() {
	const allContainers = document.getElementById("allContainers");
	while (allContainers.firstChild) {
		allContainers.removeChild(allContainers.lastChild);
	}
	containersArray = [];
};

function loadContainers() {
	let allContainers = JSON.parse(window.localStorage.getItem("containers"));
	if (!allContainers) {return console.log("No notes to load")};
	clearAllContainers();
	allContainers.forEach((container) => {
		let c = new Container(container.id, container.order, container.title);
		c.createDOM();
		container.notes.forEach((note)=>{
			let n = new Note(c.id, note.id, note.content, getIndexById(note, container.notes));
			n.createDOM();
		});
	})
	addSortables();
};

function rebuildArray() {
	containersArray = [];

	let allContainers = document.querySelectorAll('.noteContainer');
	allContainers.forEach((container) => {
		let c = new Container(container.id, getIndexById(container.id, Array.from(allContainers)), container.querySelector('.containerTitle').innerText);
		containersArray.push(c);
		let notes = container.querySelectorAll('.note')
		notes.forEach((note)=>{
			let newNote = new Note(c.id, note.id, note.querySelector('.noteContent').innerText, getIndexById(note.id, Array.from(notes)));
			c.notes.push(newNote);
		});
	})
};

function addSortables() {
	document.querySelectorAll(".noteWrapper").forEach((note) => {
		new Sortable(note, {
			handle: '.handle',
			swapThreshold: 0.8,
	        	group: "shared",
	        	animation: 150,
	    	});
	});

	document.querySelectorAll("#allContainers").forEach((container) => {
		new Sortable(container, {
			handle: '.containerControls',
			swapThreshold: 0.8,
	        	animation: 150,
	    	});
	});
};

function saveContainers() {
	if (window.localStorage.getItem("containers")) {
		window.localStorage.removeItem("containers");
	}
	return window.localStorage.setItem("containers", JSON.stringify(containersArray));
};

clearContainersButton.addEventListener("click", () => {
	clearAllContainers();
});

addContainerButton.addEventListener("click", () => {
	let c = new Container(uuidv4(), "");
	containersArray.push(c);
	c.createDOM();
	addSortables();
	rebuildArray()
});

saveContainersButton.addEventListener("click", () => {
	rebuildArray()
	saveContainers();
});

loadContainersButton.addEventListener("click", () => {
	loadContainers();
});

window.addEventListener('load', () => {
	loadContainers();
});