let submitBtn = document.querySelector("#submitBtn");

function setLocalStorage() {
  let showDiv = document.querySelector("#show");
  showDiv.innerHTML = "";

  if (localStorage.getItem("userData")) {
    let arr = JSON.parse(localStorage.getItem("userData")) || [];

    arr.forEach((user, id) => {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "newData");

      let htmldata = `Me:- <span>${user.name}</span>
                      Password:- <span>${user.password}</span>
                      <button onClick='onDelete(${id})'> Delete </button>
                      <button id="btnEdit-${id}" onClick='onEdit(${id})'> Edit </button>`;

      newDiv.insertAdjacentHTML("afterbegin", htmldata);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
  } else {
    localStorage.setItem("userData", JSON.stringify([]));
  }
}

// Delay ke bina directly call karein
setLocalStorage();

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;

  if (!name || !password) {
    alert("Kuch enter karein");
    return;
  }

  let arr = JSON.parse(localStorage.getItem("userData")) || [];

  let arrData = { name, password };
  arr.push(arrData);

  localStorage.setItem("userData", JSON.stringify(arr));
  setLocalStorage();
  document.querySelector("#name").value = "";
  document.querySelector("#password").value = "";
  alert("Successfully add kiya gaya");
});

// Delete function
function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("userData")) || [];
  arr.splice(id, 1);
  localStorage.setItem("userData", JSON.stringify(arr));
  setLocalStorage();
  alert("Data Deleted");
}

// Update function
function onEdit(id) {
  let arr = JSON.parse(localStorage.getItem("userData")) || [];
  let nameInput = document.querySelector("#name");
  let passwordInput = document.querySelector("#password");

  nameInput.value = arr[id].name;
  passwordInput.value = arr[id].password;

  submitBtn.setAttribute("disabled", true);

  let form = document.querySelector("form");
  let existingEditBtn = document.querySelector("#updateBtn");

  if (!existingEditBtn) {
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Update";
    editBtn.id = "updateBtn";
    form.appendChild(editBtn);

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();

      arr[id] = { name: nameInput.value, password: passwordInput.value };
      localStorage.setItem("userData", JSON.stringify(arr));

      nameInput.value = "";
      passwordInput.value = "";

      submitBtn.removeAttribute("disabled");
      form.removeChild(editBtn);

      setLocalStorage();
      alert("Data Updated");
    });
  }
}
