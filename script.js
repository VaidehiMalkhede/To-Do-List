document.addEventListener("DOMContentLoaded", () => {
  const inputBox = document.querySelector(".inputField input");
  const addBtn = document.querySelector(".inputField button");
  const todoList = document.querySelector(".todoList");
  const deleteAllBtn = document.querySelector(".footer button");

  // onkeyup event
  inputBox.onkeyup = () => {
    const userEnteredValue = inputBox.value; // getting user entered value
    if (userEnteredValue.trim() !== "") { // if the user value isn't only spaces
      addBtn.classList.add("active"); // activate the add button
    } else {
      addBtn.classList.remove("active"); // deactivate the add button
    }
  };

  showTasks(); // calling showTask function

  addBtn.onclick = () => { // when user clicks on plus icon button
    const userEnteredValue = inputBox.value; // getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); // getting localstorage
    let listArray;
    if (getLocalStorageData == null) { // if localstorage has no data
      listArray = []; // create a blank array
    } else {
      listArray = JSON.parse(getLocalStorageData);  // transforming json string into a js object
    }
    listArray.push(userEnteredValue); // pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); // transforming js object into a json string
    showTasks(); // calling showTask function
    addBtn.classList.remove("active"); // deactivate the add button once the task added
  };

  function showTasks() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    let listArray;
    if (getLocalStorageData == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; // passing the array length in pending task
    if (listArray.length > 0) { // if array length is greater than 0
      deleteAllBtn.classList.add("active"); // activate the delete button
    } else {
      deleteAllBtn.classList.remove("active"); // deactivate the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += `<li>${sanitizeHTML(element)}<span class="edit" onclick="editTask(${index}, '${sanitizeHTML(element)}')"><i class="fas fa-edit"></i></span><span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; // once task added leave the input field blank
  }

  // delete task function
  window.deleteTask = (index) => {
    let getLocalStorageData = localStorage.getItem("New Todo");
    let listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); // delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); // call the showTasks function
  };

  // edit task function
  window.editTask = (index, oldValue) => {
    const newValue = prompt("Edit your task:", oldValue);
    if (newValue.trim() !== "") {
      let getLocalStorageData = localStorage.getItem("New Todo");
      let listArray = JSON.parse(getLocalStorageData);
      listArray[index] = newValue; // update the task
      localStorage.setItem("New Todo", JSON.stringify(listArray));
      showTasks(); // call the showTasks function
    }
  };

  // delete all tasks function
  deleteAllBtn.onclick = () => {
    listArray = []; // empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); // set the item in localstorage
    showTasks(); // call the showTasks function
  };

  // Sanitize HTML to prevent XSS
  function sanitizeHTML(str) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = str;
    return tempDiv.innerHTML;
  }
});
