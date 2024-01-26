let submitBtn = document.querySelector("#submitBtn");

function setLocalStorage() {
  if (localStorage.getItem("userData")) {
    let showDiv = document.querySelector("#show");
    showDiv.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("userData"));
    arr.forEach((user, id) => {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "newData");

      let htmldata = `Me:- <span>${user.name}</span>
                      Password:- <span>${user.password}</span>
                      <button onClick='onDelete(${id})'> Delete </button>
                      <button id="btnEdit" onClick='onEdit(${id})'> Edit </button>`;
      newDiv.insertAdjacentHTML("afterbegin", htmldata);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
  } else {
    let arr = [];
    let arrData = {
      name: "",
      password: "",
    };
    arr.push(arrData);
    localStorage.setItem(userData, JSON.stringify(arr));
    alert("data pushed");
  }
}

setTimeout(() => {
  setLocalStorage();
}, 2);

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let arr = JSON.parse(localStorage.getItem("userData"));
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;

  if (name.length <= 0 && password.length <= 0) {
    alert("Kuch enter karein");
  } else if (name.length > 0 && password.length > 0) {
    let arrData = {
      name: name,
      password: password,
    };

    // if (!arr) {
    //   arr = [];
    // }

    arr.push(arrData);
    localStorage.setItem("userData", JSON.stringify(arr));
    setLocalStorage();
    alert("Successfully add kiya gaya");
  } else {
    alert("Kuch enter karein");
  }
});

// delete function

function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("userData"));
  let deleteArr = [...arr];
  deleteArr.splice(id, 1);
  arr = [...deleteArr];
  localStorage.setItem("userData", JSON.stringify(arr));
  setLocalStorage();

  alert("Data Deleted")
}

// update function

function onEdit(id) {
  let arr = JSON.parse(localStorage.getItem("userData"));
  let name = (document.querySelector("#name").value = arr[id].name);
  let password = (document.querySelector("#password").value = arr[id].password);

  submitBtn.setAttribute("disabled", true);

  let editBtn = document.createElement("button");
  let form = document.querySelector("form");
  let btnEdit = document.querySelectorAll("#btnEdit");
  editBtn.innerHTML = "Update";

  btnEdit.forEach((elements) => {
    elements.setAttribute("disabled", true);
    
  });

  form.insertAdjacentElement("beforeend", editBtn);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newName = document.querySelector("#name");
    let newPassword = document.querySelector("#password");
    arr.splice(id, 1, { name: newName.value, password: newPassword.value });
    localStorage.setItem("userData", JSON.stringify(arr));
    setLocalStorage();
    newName.value = "";
    newPassword.value = "";
    form.removeChild(form.lastElementChild);
    submitBtn.removeAttribute("disabled");
    alert("Data Updated")
  });
}
