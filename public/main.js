// // declare const variables
console.log('Hello World!')
 const btn =document.querySelector('.btn')
// const input=document.querySelector('#input')
 const spans = document.querySelectorAll('span')
  const ul = document.querySelector('#toDoList')
 const clearAll = document.querySelector('#clearAll')
 const clearCompleted = document.querySelector('#clearCompleted')
 const toDoCount = document.querySelector("#toDoCount")




 //functions to dynamically create  li's, note site wouldn't render when these functions were "active", are they are no longer needed in main.js file b/c the li's are being dynamically created in the index.js file using a loop and the EJS sytanx, does that mean that logic is not on the " server side"? 

//   function createAnLi(e){
//     //prevent default refreshing behavior from the form and submit button
//     e.preventDefault()
//     //if input is empty stop running the function 
//     if(input.value === '') return
//     //dynamically create the li element in JS
//     const li = document.createElement('li')
//     //give newly created elements class names
//     li.className = "not-crossed"
//     //assign said elements its inner text to be the value inputed from the user 
//     li.innerText = input.value
//     //stick the li's in the ul to display in the DOM 
//     ul.appendChild(li)
//     // reset the input value back to empty once the button is clicked and the previous value is submitted
//     input.value= ''
//     //increase the value of the counter by 1 
//     toDoCount.innerText = parseInt(toDoCount.innerText) + 1
  
//   }

// function to strikethrough said li's 
  // function strikeThrough(e){
  //   //e.target in this case is = li,that will be clicked  the element that is "clicked" aka connected to the event listener , see: *EVENT DELEGATION & e.target property* for more info.
  //    // if the li is clicked, toggle on and off the line-through styling and change the class accordingly 
  //   if (e.target.classList.contains('not-crossed')){
  //     // console.log('Hello I\'m working!') debugging/ testing if function is running 
  //    e.target.style.textDecoration="line-through"// change CSS syntax text-decoration to JS camelCase
  //    // every time an li is striked through, decrease the # of items you have left to do by 1
  //    //convert the inner text of the string of the #toDoCount element into an integer and decrease by one reassign = the new value to the same element id's inner text 
  //    toDoCount.innerText= parseInt(toDoCount.innerText) - 1 
  //    //reassing the target elements, in this case, the li's class name to "crossed"
  //     e.target.className = "crossed"
  //     //if the above condition is not true then, if the target element's class is already "crossed" and the event listener is activated then
  //   }else if( e.target.classList.contains("crossed")){
  //     //remove the text line-through decoration from the li's string
  //     e.target.style.textDecoration= "none"
  //     //reassign the className to "not-crossed", the function will run/ reiterate through the conditonal every time the click event is activated
  //     e.target.className = "not-crossed"
  //     // increase the # of items you have left to do by 1 if the e. target is re assigned the id of "not-crossed" 
  //     toDoCount.innerText= parseInt(toDoCount.innerText) + 1
  //   }
  // }


//new strikethrough function, not 'dependent on the previous li creating function, no longer in use

  function strikeThrough(e){
    console.log(e.target)
    let aim =e.target
    if(aim.matches('span')){
      console.log(aim.className)
      aim.classList.toggle('crossed')
    }
     updateCounter()
  }


  function updateCounter(){
    // console.log(spans.filter(el => el.className === 'crossed').length)
    let finishedTasks = document.querySelectorAll('.crossed').length 
    let totalTasks = document.querySelectorAll('.tasks').length -1 // -1 to account for the ul also having the same class of "task"
    // console.log()
    toDoCount.innerText= totalTasks - finishedTasks //value of vars are #'s so we can do an arithmetic operation 
  }

      //const listItem =this.parentNode.childNodes[1].innerText

    //  fetch('/strikeThrough', {
    //    method: 'put',
    //    headers: {
    //      'Content-Type': 'application/json'},
    //      body: JSON.stringify({
    //        'tasks':clearCompletedListItems,
    //       'crossed':false
    //     })
  //      })
  //      .then(response =>{
  //        if(response.ok) return response.json()
  //      })
  //      .then(data => {
  //        console.log(data)
  //        window.location.reload(true)
  //      })
  //    })
//


//function to clear ONLY completed list tasks 
  function clearCompletedListItems(e){
    console.log(spans)
    Array.from(spans).forEach(li => {
      console.log(li.classList)
    if(li.classList.contains("crossed")){
      // console.log(this)
      console.log(li.innerText)
       //declare vars 
      const tasks = li.innerText
      // const crossed = li.innerText
     
      //is this fetch() retrieving data ( awaiting a response) from the server ( put & delete request?) and DB?  how? 
      //why does the path have to match the put & delete request (params) on the server side ?
      fetch('/completedTasks', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'tasks': tasks,
          'crossed':true,       
        })
      })
      //do I need a second .then()? 
      //  .then(response => {
      //    if(response.ok) return response.json()
      //  })    
      .then(function (response) {
         window.location.reload()
      })          
      }
    })
  }
// li.remove()
    // if(ul.hasChildNodes() && li.classList.contains("crossed")){
    //   ul.removeChild(ul.firstChild)
     //for / each loop takes in an anonymous function expression as a parameter ({})* see more about loops, arrays ( converting Node-lists to Array list), high order functions & fat arrow function short hand notation 
    // Array.from(ul.childNodes).forEach ( li => {
    //     //if li has .crossed class then .remove() from list
    //   if(li.classList.contains("crossed") ){
    //       // li.remove()
    //    




// //when the button is clicked, remove all the items in the list 
 function clearAllValues(e){
   while(ul.hasChildNodes()){// while this condition is true, this loop will run through the ul li's & remove them 1 @ a time
     ul.removeChild(ul.firstChild)//only first or last child can be removed at any one given time
     toDoCount.innerText = "0"//reset the counter to a string of 0 when all values are cleared
   } 
   fetch('/allTasks', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(function (response) {
    window.location.reload()
  })
 }


// //event listeners with functions as parameters

 //btn.addEventListener('click', createAnLi)
 ul.addEventListener('click', strikeThrough)
 clearAll.addEventListener('click', clearAllValues)
 clearCompleted.addEventListener('click', clearCompletedListItems)


