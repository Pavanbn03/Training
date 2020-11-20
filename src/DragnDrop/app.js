const box = document.getElementsByClassName("box");
const p = document.getElementsByTagName("p");
const btn = document.getElementById("btn");

let updatedArray = [];
let dragItem = null;
let newState = {};

for (let i of p) {
  i.addEventListener("dragstart", dragStart);
  i.addEventListener("dragend", dragEnd);
}

function dragStart() {
  dragItem = this;
  setTimeout(() => (this.style.display = "none"), 0);
  console.log("start");
  this.style.border = "2px solid red";
}

function dragEnd() {
  setTimeout(() => (this.style.display = "block"), 0);
  dragItem = null;
  console.log("end");
  this.style.border = "none";
}
for (j of box) {
  j.addEventListener("dragover", dragOver);
  j.addEventListener("dragenter", dragEnter);
  j.addEventListener("dragleave", dragLeave);
  j.addEventListener("drop", Drop);
}

function dragOver(e) {
  e.preventDefault();
  console.log("over");
}
function dragEnter(e) {
  e.preventDefault();
  console.log("enter");
  this.style.border = "2px dashed green";
}

function dragLeave() {
  console.log("leave");
  this.style.border = "none";
}

function Drop() {
  this.append(dragItem);
  console.log("drop");
  this.style.border = "none";
}
btn.addEventListener("click", () => {
  for (b of box) {
    updatedArray.push(b);
  }

  newState = {
    box1: updatedArray[0].innerText,
    box2: updatedArray[1].innerText,
    box3: updatedArray[2].innerText,
  };
  console.log("Box1", newState.box1);
  console.log("Box2", newState.box2);
  console.log("Box3", newState.box3);
});
