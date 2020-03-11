/////////bring the element from HTML
let button = document.getElementById("add");
let input = document.getElementById("myInput");
let todoArea = document.getElementById("todoList");
let checkBox = document.getElementById("myCheck");

// bring the todo list from local storage
let priviousList = JSON.parse(localStorage.getItem("data"));
console.log("privious", priviousList);

//list for my todo list
let masterTodoList = [];

//if there is no any data from local storage, then set up empty array
if (priviousList == null) {
  masterTodoList = [];
} else {
  masterTodoList = priviousList;
  showData(masterTodoList);
}

// object structure for each memo item
let listObject = {
  text: "",
  isDone: false
};

//add event
button.addEventListener("click", addToList);
checkBox.addEventListener("click", filterData);

// show undone list when user click the checkbox
function filterData() {
  let list = [];
  if (checkBox.checked == true) {
    list = masterTodoList.filter(object => object.isDone == false);
    showData(list);
  } else {
    showData(masterTodoList);
  }
}

//add the item to the list
function addToList() {
  //let value = input.value;
  let ob = { text: input.value, isDone: false };
  masterTodoList.push(ob);
  saveData();
  showData(masterTodoList);
  input.value = "";
}

// remove the item to the list
function remove(index) {
  masterTodoList.splice(index, 1);
  console.log(masterTodoList);
  let html = "";
  saveData();
  showData(masterTodoList);
}

//render the data to show screen
function showData(list) {
  let html = "";

  html = list.reduce((final, item, i) => {
    let message = "";
    if (item.isDone) {
      message = `<li>${item.text} <a href='#' onclick='remove(${i})'>x</a> <a href="#" onclick='toggleDone(${i})'>undo Mark</a></li>\n`.strike();
    } else {
      message = `<li>${item.text} <a href='#' onclick='remove(${i})'>x</a> <a href="#" onclick='toggleDone(${i})'>do Mark</a></li>\n`;
    }
    return final + message;
  }, "");
  todoArea.innerHTML = html;
}

//if user click done button, then it turn to be isDoen false
function toggleDone(index) {
  masterTodoList[index].isDone = !masterTodoList[index].isDone;
  console.log(masterTodoList);
  saveData();
  showData(masterTodoList);
}

//save the data at the local storage
function saveData() {
  console.log("here");
  localStorage.setItem("data", JSON.stringify(masterTodoList));
}
