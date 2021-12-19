const db = firebase.firestore();

const taskForm = document.getElementById("user-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false;
let id = '';

/**
 * Save a New Task in Firestore
 * @param {string} firstName the title of the Task
 * @param {string} lastName the description of the Task
 */
const saveTask = (firstName, lastName) =>
  db.collection("users").doc().set({
    firstName,
    lastName,
  });

const getTasks = () => db.collection("users").get();

const onGetTasks = (callback) => db.collection("users").onSnapshot(callback);

const deleteTask = (id) => db.collection("users").doc(id).delete();

const getTask = (id) => db.collection("users").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('users').doc(id).update(updatedTask);

window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    tasksContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const task = doc.data();

      tasksContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${task.firstName}</h3>
    <p>${task.lastName}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
  </div>`;
    });

    const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteTask(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getTask(e.target.dataset.id);
          const task = doc.data();
          taskForm["user-title"].value = task.firstName;
          taskForm["userlastname-title"].value = task.lastName;

          editStatus = true;
          id = doc.id;
          taskForm["btn-user-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = taskForm["user-title"];
  const lastName = taskForm["userlastname-title"];

  try {
    if (!editStatus) {
      await saveTask(firstName.value, lastName.value);
    } else {
      await updateTask(id, {
        firstName: firstName.value,
        lastName: lastName.value,
      })

      editStatus = false;
      id = '';
      taskForm['btn-user-form'].innerText = 'Save';
    }

    taskForm.reset();
    firstName.focus();
  } catch (error) {
    console.log(error);
  }
});