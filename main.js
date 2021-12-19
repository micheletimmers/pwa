const db = firebase.firestore();

const userForm = document.getElementById("user-form");
const werknemerContainer = document.getElementById("werknemer-container");

const takenForm = document.getElementById("taken-form");
const takenContainer = document.getElementById("taken-container");


let editStatus = false;
let id = '';

/**
 * Save a New werknemer in Firestore
 * @param {string} firstName the title of the Werknemer
 * @param {string} lastName the description of the werknemer
 * @param {string} email the email of the Werknemer
 * @param {string} phone the email of the Werknemer
 * @param {string} date the email of the Werknemer
 * 
 * * @param {string} taakNaam the email of the Werknemer
 * @param {string} taakOmschrijving the email of the Werknemer
 * @param {string} date the email of the Werknemer
 */

//WERKNEMER
const saveWerknemer = (firstName, lastName, email, phone, date) =>
  db.collection("users").doc().set({
    firstName,
    lastName,
    email,
    phone,
    date,

  });

  //TAKEN
  const saveTask = (taakNaam, taakOmschrijving, date) =>
  db.collection("users").doc(id).collection('taken').doc(id).get()({
    taakNaam,
    taakOmschrijving,
    date,
    

  });
  console.log(id)
//Werknemers
const getWerknemers = () => db.collection("users").get();

const onGetWerknemer = (callback) => db.collection("users").onSnapshot(callback);

const deleteWerknemer = (id) => db.collection("users").doc(id).delete();

const getWerknemer = (id) => db.collection("users").doc(id).get();

const updateWerknemer = (id, updatedWerknemer) => db.collection('users').doc(id).update(updatedWerknemer);

//TAKEN
const getTasks = () => db.collection("users").doc(id).col('taken').get();

const onGetTasks = (callback) => db.collection("users").onSnapshot(callback);

const deleteTask = (id) => db.collection("taken").doc(id).col('taken').get().delete();

const getTask = (id) => db.collection("users").doc(id).get();

const updateTask = (id, updatedTask) => db.collection('users').doc(id).update(updatedTask);





window.addEventListener("DOMContentLoaded", async (e) => {
  onGetWerknemer((querySnapshot) => {
    werknemerContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const werknemer = doc.data();

      werknemerContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3 class="h5">${werknemer.firstName}</h3>
    <p>${werknemer.lastName}</p>
    <p>${werknemer.email}</p>
    <p>${werknemer.phone}</p>
    <p>${werknemer.date}</p>
    <div>
      <button class="btn btn-primary btn-delete" data-id="${doc.id}">
        🗑 Delete
      </button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
        🖉 Edit
      </button>
    </div>
    <p>${doc.id} </p>
    

  </div>`;
    });

    const btnsDelete = werknemerContainer.querySelectorAll(".btn-delete");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async (e) => {
        console.log(e.target.dataset.id);
        try {
          await deleteWerknemer(e.target.dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = werknemerContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getWerknemer(e.target.dataset.id);
          const werknemer = doc.data();
          userForm["user-title"].value = werknemer.firstName;
          userForm["userlastname-title"].value = werknemer.lastName;
          userForm["user-email"].value = werknemer.email;
          userForm["user-phone"].value = werknemer.phone;
          userForm["user-date"].value = werknemer.date;

          editStatus = true;
          id = doc.id;
          userForm["btn-user-form"].innerText = "Update";

        } catch (error) {
          console.log(error);
        }
      });
    });

    //taken weergeven
    // querySnapshot.forEach((doc) => {
    //     const task = doc.data();
  
    //     werknemerContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    //   <h3 class="h5">${task.firstName}</h3>
    //   <p>${task.lastName}</p>
    //   <p>${task.email}</p>
    //   <p>${task.phone}</p>
    //   <p>${task.date}</p>
    //   <div>
    //     <button class="btn btn-primary btn-delete" data-id="${doc.id}">
    //       🗑 Delete
    //     </button>
    //     <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
    //       🖉 Edit
    //     </button>
    //   </div>
    // </div>`;
    //   });

  });
});

//TAKENDING

window.addEventListener("DOMContentLoaded", async (e) => {
    onGetTasks((querySnapshot) => {
        takenContainer.innerHTML = "";
  
      querySnapshot.forEach((doc) => {
        const taak = collection('users').doc(id).col('taken').data();
  
        takenContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
      <h3 class="h5">${taak.taakNaam}</h3>
      <p>${taak.taakNaam}</p>
      <p>${taak.taakOmschrijving}</p>
      <p>${taak.date}</p>
      <div>
        <button class="btn btn-primary btn-delete" data-id="${doc.id}">
          🗑 Delete
        </button>
        <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
          🖉 Edit
        </button>
      </div>
      <p>${doc.id}</p>
      
  
  
    </div>`;
      });
  
  
     
  
      const btnsDelete = takenContainer.querySelectorAll(".btn-delete");
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
  
      const btnsEdit = takenContainer.querySelectorAll(".btn-edit");
      btnsEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          try {
            const doc = await getTask(e.target.dataset.id);
            const taak = doc.data();
            takenForm["taak-naam"].value = taak.taakNaam;
            takenForm["taak-omschrijving"].value = taak.taakOmschrijving;
            takenForm["taak-datum"].value = taak.date;
  
            editStatus = true;
            id = doc.id;
            takenForm["btn-user-form"].innerText = "Update";
  
          } catch (error) {
            console.log(error);
          }
        });
      });
  
      //taken weergeven
      // querySnapshot.forEach((doc) => {
      //     const taak = doc.data();
    
      //     takenContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
      //   <h3 class="h5">${taak.firstName}</h3>
      //   <p>${taak.lastName}</p>
      //   <p>${taak.email}</p>
      //   <p>${taak.phone}</p>
      //   <p>${taak.date}</p>
      //   <div>
      //     <button class="btn btn-primary btn-delete" data-id="${doc.id}">
      //       🗑 Delete
      //     </button>
      //     <button class="btn btn-secondary btn-edit" data-id="${doc.id}">
      //       🖉 Edit
      //     </button>
      //   </div>
      // </div>`;
      //   });
  
    });
  });

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = userForm["user-title"];
  const lastName = userForm["userlastname-title"];
  const email = userForm["user-email"];
  const phone = userForm["user-phone"];
  const date = userForm["user-date"];

  try {
    if (!editStatus) {
      await saveWerknemer(firstName.value, lastName.value, email.value, phone.value, date.value);
    } else {
      await updateWerknemer(id, {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        phone: phone.value,
        date: date.value,
      })

      editStatus = false;
      id = '';
      userForm['btn-user-form'].innerText = 'Save';
    }

    userForm.reset();
    firstName.focus();
  } catch (error) {
    console.log(error);
  }
});

//TAKENNN
takenForm.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const taakNaam = takenForm["taak-naam"];
    const taakOmschrijving = takenForm["taak-omschrijving"];
    const date = takenForm["taak-datum"];

  
    try {
      if (!editStatus) {
        await saveTask(taakNaam.value, taakOmschrijving.value, date.value);
      } else {
        await updateTask(id, {
          taakNaam: taakNaam.value,
          taakOmschrijving: taakOmschrijving.value,
          date: date.value,
        })
  
        editStatus = false;
        id = '';
        takenForm['btn-taken-form'].innerText = 'Save';
      }
  
      takenForm.reset();
      taakNaam.focus();
    } catch (error) {
      console.log(error);
    }
  });
