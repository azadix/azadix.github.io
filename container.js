console.log("container.js loaded.");

class Container {
	constructor(id, order, title) {
		this.id = id;
		this.parent = "allContainers";
		this.order = order || document.getElementById(this.parent).childElementCount;
		this.notes = [];
		this.title = title || "New container";
	}

	createDOM() {
		this.createNoteContainer();
		this.createTitleField();
		this.createButtons();
	}

	createTitleField() {
		let titleField = document.createElement('p');
		titleField.classList.add('containerTitle');
		titleField.setAttribute('contenteditable', 'true');
		titleField.setAttribute('title-placeholder', 'Title')
		titleField.placeholder = "Title";
		titleField.innerText = this.title;
		document.getElementById(this.id).appendChild(titleField).addEventListener('input', (event) => {
			this.title = event.target.value;
		});
	}

	createNoteContainer() {
 		let newContainer = document.createElement('div');
 		newContainer.classList.add('noteContainer');
		newContainer.id = this.id;
 		document.getElementById(this.parent).appendChild(newContainer);
	}
	
	createButtons() {
		let controlsWrapper = document.createElement('div');
		controlsWrapper.classList.add('containerControls');
		document.getElementById(this.id).appendChild(controlsWrapper);


		let noteWrapper = document.createElement('div');
		noteWrapper.classList.add('noteWrapper');
		document.getElementById(this.id).appendChild(noteWrapper);

		let addButton = document.createElement("button");
		addButton.classList.add('containerButtons');
		addButton.innerHTML = "<i class='fa-solid fa-file-circle-plus'></i> &nbsp; Add new note";
		controlsWrapper.appendChild(addButton);
		addButton.addEventListener("click", () => {
			let newNote = new Note(this.id, uuidv4(), "");
			newNote.createDOM();
			this.notes.push(newNote);
		});

		let closeButton = document.createElement("button");
		closeButton.innerHTML = "Remove &nbsp; <i class='fa-solid fa-x'></i>";
		closeButton.classList.add('containerButtons');

		controlsWrapper.appendChild(closeButton);
		closeButton.addEventListener("click", () => {
			document.getElementById(this.parent).removeChild(document.getElementById(this.id));
			containersArray.pop(document.getElementById(this.id));
		});


	}
}