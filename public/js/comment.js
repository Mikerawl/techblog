function comment(){

const makeComment = document.getElementById('comment-btn');
const commentForm = document.getElementById('comment-form');
const commentSubmit = document.getElementById('submit-btn');


console.log(commentForm)
console.log(makeComment)

makeComment.addEventListener('click', (e)=> {

        commentForm.style.display = "block";
        makeComment.style.display = "none";
    
  });
}
comment()