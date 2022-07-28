console.log("note.js loaded.");

class Note {
	constructor(parent, id, content, order) {
		this.parentContainer = parent;
		this.id = id;
		this.content = content;
		this.order = order;
	}
	
	getParentWrapper() {
		return document.getElementById(this.parentContainer).querySelector('.noteWrapper');
	}

	createDOM() {
		let wrapper = document.createElement('div');
		wrapper.classList.add('note');
		wrapper.id = this.id;

		let noteContent = document.createElement('p');
		noteContent.classList.add('noteContent');
  		noteContent.setAttribute('contenteditable','true');
		noteContent.innerText = this.content;

  		let noteClose = document.createElement('button');
		noteClose.innerHTML = "<i class='fa-solid fa-x'></i>";
		noteClose.classList.add('containerClose');
  		noteClose.classList.add('noteButtons');

		let noteHandle = document.createElement('i');
		noteHandle.classList.add('handle');
		noteHandle.classList.add('fa-solid');
		noteHandle.classList.add('fa-arrows-up-down-left-right');
		

		let thisElement = this.getParentWrapper().appendChild(wrapper);

		thisElement.appendChild(noteHandle);
  		thisElement.appendChild(noteContent).addEventListener('input', (event) => {
			this.content = event.target.value;
		});
		
  		thisElement.appendChild(noteClose).addEventListener('click', () => {
			containersArray.forEach((item) => {
				if (item.id == this.parent) {
					item.notes.splice(item.notes.indexOf(this), 1);
				};
			});
			this.getParentWrapper().removeChild(thisElement);
			rebuildArray();
  		});
		rebuildArray();
	}
}