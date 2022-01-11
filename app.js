const modalWrapper2 = document.querySelector('.modal-wrapper2');
// modal add
const addModal2 = document.querySelector('.add-modal2');
const addModalForm2 = document.querySelector('.add-modal2 .form2');

// modal edit
const editModal2 = document.querySelector('.edit-modal2');
const editModalForm2 = document.querySelector('.edit-modal2 .form2');

const btnAdd2 = document.querySelector('.btn-add2');

const tableTaken = document.querySelector('.table-taken');

let id;




// Create element and render users
const renderTaken = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
      <td>${doc.data().taakNaam}</td>
      <td>${doc.data().taakOmschrijving}</td>
      <td>${doc.data().datumTaak}</td>
      <td>
      <button class="btn btn-edit2">Edit</button>
        <button class="btn btn-delete2">Delete</button>
      </td>
      <td>
      
      <button class="btn"><a target="_blank" href='https://outlook.live.com/calendar/0/deeplink/compose?body=${doc.data().taakOmschrijving}&enddt=${doc.data().datumTaak}T12%3A45%3A00%2B00%3A00&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=${doc.data().datumTaak}T12%3A15%3A00%2B00%3A00&subject=${doc.data().taakNaam}'><i class="fa fa-bell"></i> Reminder</a></button>
      </td>
    </tr>
  `;
  tableTaken.insertAdjacentHTML('beforeend', tr);

  // Click edit user
  const btnEdit2= document.querySelector(`[data-id='${doc.id}'] .btn-edit2`);
  btnEdit2.addEventListener('click', () => {
    editModal2.classList.add('modal-show2');

    id = doc.id;
    editModalForm2.taakNaam.value = doc.data().taakNaam;
    editModalForm2.taakOmschrijving.value = doc.data().taakOmschrijving;
    editModalForm2.datumTaak.value = doc.data().datumTaak;
  });

  // Click delete user
  const btnDelete2 = document.querySelector(`[data-id='${doc.id}'] .btn-delete2`);
  btnDelete2.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd2.addEventListener('click', () => {
  addModal2.classList.add('modal-show2');

  addModalForm2.taakNaam.value = '';
  addModalForm2.taakOmschrijving.value = '';
  addModalForm2.datumTaak.value = '';
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal2) {
    addModal2.classList.remove('modal-show2');
  }
  if(e.target === editModal2) {
    editModal2.classList.remove('modal-show2');
  }
});

// Get all users
// db.collection('taken').get().then(querySnapshot => {
//   querySnapshot.forEach(doc => {
//     renderTaken(doc);
//   })
// });

// Real time listener
db.collectionGroup('taken').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
        renderTaken(change.doc);
      
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTaken.removeChild(tbody);
      console.log(id)
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableTaken.removeChild(tbody);
      renderTaken(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm2.addEventListener('submit', e => {
  e.preventDefault();
  db.collectionGroup('taken').add({
    taakNaam: addModalForm2.taakNaam.value,
    taakOmschrijving: addModalForm2.taakOmschrijving.value,
    datumTaak: addModalForm2.datumTaak.value,
  });
  modalWrapper2.classList.remove('modal-show2');
});

// Click submit in edit modal
editModalForm2.addEventListener('submit', e => {        //DIT IS ORIGINEEL
  e.preventDefault();
  db.collectionGroup('taken').update({
    taakNaam: editModalForm2.taakNaam.value,
    taakOmschrijving: editModalForm2.taakOmschrijving.value,
    datumTaak: editModalForm2.datumTaak.value,
  });
  editModal2.classList.remove('modal-show2');
  
});
