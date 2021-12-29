const modalWrapper = document.querySelector('.modal-wrapper3');
// modal add
const addModal = document.querySelector('.add-employee');
const addModalForm = document.querySelector('.add-employee .form');

// modal edit
const editModal = document.querySelector('.edit-employee');
const editModalForm = document.querySelector('.edit-employee .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');
const tableTaken = document.querySelector('.table-taken');

let id;



// Element creeeren en users renderen 
const renderUser = (doc, takenlijst) => {         // item.data 
  console.log(doc.data().firstName);              ///werknemer wordt opgeroepen

  const tr = `
  
    <tr data-id='${doc.id}'>
      <td>${doc.data().firstName}</td>
      <td>${doc.data().lastName}</td>
      <td>${doc.data().phone}</td>
      <td>${doc.data().email}</td>
      <td>${doc.data().date}</td>
      <td>
      
        <button class="btn btn-edit">Bekijk/Bewerk</button>
        <button class="btn btn-delete">Verwijder</button>
      </td>


    </tr>
  `;
  tableUsers.insertAdjacentHTML('beforeend', tr);
  
  takenlijst.forEach((taak) => {
  
    


  const p = `
  <tr>
    <th id="th-style">Taak</th>										
    <th id="th-style">Taakomschrijving</th>
	
    <th id="th-style">Datum</th>
    <th id="th-style">Taak klaar?</th>
  </tr>
    
  <tr data-id='${taak.id}'>
  
    <td>${taak.data().taakNaam}</td>
    <td>${taak.data().taakOmschrijving}</td>
    <td>${taak.data().date}</td>
    <td>${taak.data().taakDone}</td>
    
    <td>
      <button class="btn btn-edit2">Bekijk/Bewerk</button>
      <button class="btn btn-delete2">Verwijder</button>
      <input class="form-check-input btn-delete" type="checkbox" value="" id="flexCheckDefault">
    </td>


  </tr>
`;
tableTaken.insertAdjacentHTML('beforeend', p);

    
    console.log(taak.data());                     //taak wordt opgeroepen 
  })

  


  // Button Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show3');

    id = doc.id;
    editModalForm.firstName.value = doc.data().firstName;
    editModalForm.lastName.value = doc.data().lastName;
    editModalForm.phone.value = doc.data().phone;
    editModalForm.email.value = doc.data().email;
    editModalForm.date.value = doc.data().date;

  });


  // Click delete user
  
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}


// Click add user button
btnAdd.addEventListener('click', () => {
  addModal.classList.add('modal-show3');

  addModalForm.firstName.value = '';
  addModalForm.lastName.value = '';
  addModalForm.phone.value = '';
  addModalForm.email.value = '';
  addModalForm.date.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show3');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show3');
  }
});

// Alle gebruikers ophalen / Get all users
// db.collection('users').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderUser(doc);
//   })
// });

// Real time listener


db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
  
    change.doc.ref.collection('taken').get()
    .then((snapshotTaken) => {
      if(change.type === 'added') {
        renderUser(change.doc, snapshotTaken);
      }
      if(change.type === 'removed') {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        let tbody = tr.parentElement;
        tableUsers.removeChild(tbody);
      }
      if(change.type === 'modified') {
        let tr = document.querySelector(`[data-id='${change.doc.id}']`);
        let tbody = tr.parentElement;
        tableUsers.removeChild(tbody);
        renderUser(change.doc, snapshotTaken);
      }
    })
    })

    
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    firstName: addModalForm.firstName.value,
    lastName: addModalForm.lastName.value,
    phone: addModalForm.phone.value,
    email: addModalForm.email.value,
    date: addModalForm.date.value,
  });
  modalWrapper.classList.remove('modal-show3');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    firstName: editModalForm.firstName.value,
    lastName: editModalForm.lastName.value,
    phone: editModalForm.phone.value,
    email: editModalForm.email.value,
    date: editModalForm.date.value,
  });
  editModal.classList.remove('modal-show3');
  location.reload();
  
});

// var usersRef = db.collection("users");
// usersRef.get()
//   .then(function(querySnapshot) {
//       if (!querySnapshot.empty) {
//           var doc = querySnapshot.docs[0];
//           var takenCollRef = usersRef.doc(doc.id).collection("taken");
//           return restaurantsCollRef.get();    
//       } else {
//           throw new Error("No such document!");
//       }
//   })
//   .then(function(querySnapshot) {
//       querySnapshot.forEach(function(doc) {
//          console.log(doc.id, " => ", doc.data());
//       })
//   }).catch(function(error) {
//       console.log("Error getting document:", error);
//   });

