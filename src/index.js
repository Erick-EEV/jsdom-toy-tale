let addToy = false;
let url = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  getToys()
  document.querySelector('form').addEventListener('submit', (event) => {
    createToy(event)
  })
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



function getToys(){
  fetch(url)
  .then((response) => response.json())
  .then((toyArray) => {
    toyArray.forEach((toy) => renderToys(toy))
  })
}

function renderToys(toy){
  let toyBox  = document.getElementById('toy-collection')

  let newToy = document.createElement('div')
  newToy.className = "card"

  
  let toyImg = document.createElement('img')
  toyImg.className = "toy-avatar"
  toyImg.src = toy.image

  let toyName = document.createElement('h2')
  toyName.innerText = toy.name

  let toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes


  let btn = document.createElement('button')
  btn.innerText = "<3"
  btn.className = "like-btn"

  newToy.append(toyImg, toyName, toyLikes, btn)
  toyBox.appendChild(newToy)

}

function createToy(event){
  event.preventDefault()
  let toyData = {
    name: event.target.name.value,
    image: event.target.image.value
  }

  let requestObj = {}
  requestObj.method = "POST"
  requestObj.headers = {"Content-Type": "application/json"}
  requestObj.body = JSON.stringify(toyData)

  fetch(url, requestObj)
  .then(response => response.json())
  .then(toyData => renderToys(toyData))
}


function incrementLike(event){
  let toyLikes = {
    name: event.target.likes.value
  }

  let requestObj = {}
  requestObj.method = "PATCH"
  requestObj.headers = {"Content-Type": "application/json"}
  requestObj.body = JSON.stringify(toyLikes)

  fetch(url, requestObj)
  .then(response => response.json())
  .then(toyLikes => console.log(toyLikes))
}