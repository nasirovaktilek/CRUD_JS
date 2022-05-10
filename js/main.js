//!_______________ CRUD - create, read, update, delete ________________________
let button = document.querySelector(".btn");
let input1 = document.querySelector("#inp1");
let input2 = document.querySelector("#inp2");
let input3 = document.querySelector("#inp3");
let list1 = document.querySelector("#ul1");
let table1 = document.querySelector("#table");
let table = document.createElement("table");
table.style.marginLeft = "350px";
let thead = document.createElement("thead");
thead.style.color = "red";
let tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
document.body.appendChild(table);
let row_1 = document.createElement("tr");
let heading_1 = document.createElement("th");
heading_1.innerHTML = "NAME";
let heading_2 = document.createElement("th");
heading_2.innerHTML = "E-MAIL";
let heading_3 = document.createElement("th");
heading_3.innerHTML = "IMAGE";
let heading_4 = document.createElement("th");
heading_4.innerHTML = "EDIT";
let heading_5 = document.createElement("th");
heading_5.innerHTML = "DELETE";
row_1.appendChild(heading_1);
row_1.appendChild(heading_2);
row_1.appendChild(heading_3);
row_1.appendChild(heading_4);
row_1.appendChild(heading_5);
thead.appendChild(row_1);
render();

button.addEventListener("click", () => {
  if (
    input1.value.trim() === "" ||
    input2.value.trim() === "" ||
    input3.value.trim() === ""
  ) {
    alert("Заполните поле!");
    return;
  }
  let object = { name: input1.value, email: input2.value, image: input3.value };
  setItemToLocalStorage(object);
  render();
  input1.value = "";
  input2.value = "";
  input3.value = "";
});

function setItemToLocalStorage(name) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(name);
  localStorage.setItem("task-data", JSON.stringify(data));
}

function setItemToLocalStorage(email) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(email);
  localStorage.setItem("task-data", JSON.stringify(data));
}
function setItemToLocalStorage(image) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(image);
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

function render() {
  if (!localStorage.getItem("task-data")) {
    localStorage.setItem("task-data", JSON.stringify([]));
  }
  let newData = JSON.parse(localStorage.getItem("task-data"));
  tbody.innerHTML = "";
  newData.forEach((item, index) => {
    let row_2 = document.createElement("tr");
    let row_2_data_1 = document.createElement("td");
    row_2_data_1.innerHTML = item.name;
    let row_2_data_2 = document.createElement("td");
    row_2_data_2.innerHTML = item.email;
    let row_2_data_3 = document.createElement("img");
    row_2_data_3.src = item.image;
    row_2_data_3.width = 150;
    let row_2_data_4 = document.createElement("td");
    let row_2_data_5 = document.createElement("td");
    row_2.appendChild(row_2_data_1);
    row_2.appendChild(row_2_data_2);
    row_2.appendChild(row_2_data_3);
    row_2.appendChild(row_2_data_4);
    row_2.appendChild(row_2_data_5);
    tbody.appendChild(row_2);
    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.style.backgroundColor = "red";
    btnDelete.style.border = "1px solid black";
    btnDelete.style.borderRadius = "3px";
    btnDelete.style.margin = "3px";
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.style.backgroundColor = "yellow";
    btnEdit.style.border = "1px solid black";
    btnEdit.style.borderRadius = "3px";
    row_2_data_4.append(btnEdit);
    row_2_data_5.append(btnDelete);
    btnDelete.addEventListener("click", () => {
      deleteElement(index);
    });
    btnEdit.addEventListener("click", () => {
      editElement(index);
    });
  });
}

function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1);
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

//? Сохраняем в переменные, элементы модального окна
let mainModal = document.querySelector(".main-modal");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");
let inpEdit1 = document.querySelector(".inp-edit1");
let inpEdit2 = document.querySelector(".inp-edit2");
let inpEdit3 = document.querySelector(".inp-edit3");

function editElement(id) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("task-data"));
  inpEdit1.setAttribute("id", id);
  inpEdit1.value = data[id].name;
  inpEdit2.value = data[id].email;
  inpEdit3.value = data[id].image;
}

btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  if (
    inpEdit1.value.trim() === "" ||
    inpEdit2.value.trim() === "" ||
    inpEdit3.value.trim() === ""
  ) {
    alert("Заполните поле!");
    return;
  }
  let data = JSON.parse(localStorage.getItem("task-data"));
  let editTask = {
    name: inpEdit1.value,
    email: inpEdit2.value,
    image: inpEdit3.value,
  };
  let index = inpEdit1.id;
  data.splice(index, 1, editTask);
  localStorage.setItem("task-data", JSON.stringify(data));
  mainModal.style.display = "none";
  render();
});

// inpEdit.addEventListener("focus", () => {
//   inpEdit.style.backgroundColor = "rgb(239, 220, 75)";
// });

// input.addEventListener("focus", () => {
//   input.style.backgroundColor = "rgb(45, 162, 162)";
// });
