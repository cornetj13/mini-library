// add front end scripting here!
console.log("Linked.")

const booksUl    = document.getElementById("allBooks");
const bookForm   = document.getElementById("newBook");
const bookId     = document.getElementById("bookId");
const bookTitle  = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");

fetch("/api/books")
.then(res => {
  return res.json();
})
.then(data => {
  console.log(data);
  data.forEach(book => {
    const newLi = document.createElement('li');
    newLi.textcontent = book.title;
    booksUl.append(newLi);
  });
}).catch((error) => {
  console.error('Error:', error);
});

bookForm.addEventListener("submit", e => {
  e.preventDefault();
  const bookObj = {
    id: parseInt(bookId.value),
    title: bookTitle.value,
    author: bookAuthor.value
  };
  console.log(bookObj);

  fetch("/api/books",{
    method:"POST",
    body:JSON.stringify(bookObj),
    headers:{
        "Content-Type":"application/json"
    }
  })
  .then(res => {
      if(res.ok){
          location.reload()
      } else {
          alert("trumpet sound")
      };
  });
});