//which part of this server is the API? the CRUD methods? why? 

const MongoClient= require("mongodb").MongoClient
const express = require('express')
const app =express()
const bodyParser =require("body-parser")


//global vars
var db, collection;

const url ='mongodb+srv://dmorin18:LdaIyCN7Ug1iBxmY@cluster0.vxps0.mongodb.net/?retryWrites=true&w=majority'

const dbName = "to-do-list";

//higher order function
app.listen(8000, () => { 
MongoClient.connect(url,
   {useUnifiedTopology: true},
  (err,client) => {
    if (err) {
      throw err
    }
    db = client.db(dbName)
    console.log("Connected to `" + dbName + "`!")
    }
  )

})

//middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// makes client side static files ( main.js & styles.css) are accessible public
app.use(express.static("public"));

//why do some of the routes/paths have to match the path in the fetch requests made in main js file? 
//why does each put & delete request require a new ( unique) path? 
//why does the get method have the root / path and the other methods don't?
//are these the "event handlers"- event referring to when an event listener is triggers and a function is run and a request made? 

app.get("/", (req, res) => {
  db.collection("CRUD_App")
    .find()
    .toArray((err, response) => {
      if (err) return console.log(err);
      //tasks is teh [ objects or documents in the DB]
      res.render("index.ejs", {tasks:response});
    });
});

//every time the page refreshes is triggers a new "get" request, and the data is updated in the DOM  & the DB ?

app.post("/tasks", (req, res) => {
  // console.log(req)
  db.collection("CRUD_App").insertOne(
    // console.log(req)
    //what is 'req.body.tasks' targeting? 
    {tasks:req.body.tasks,crossed:false},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
//add li's
app.put("/tasks", (req, res) => {
  db.collection("CRUD_App").findOneAndUpdate(
    {tasks:crossed},
    {
      $set: {
        crossed:false
      }
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
    
  );
});

//strikethrough li's
app.put("/tasksCompleted", (req, res) => {
  db.collection("CRUD_App").findOneAndUpdate(
    {tasks:crossed},
    {
      $set: {
        crossed:true
      }
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
    
  );
});


//delete struckthrough tasks ONLY

//when the user  clicks the delete button on the client side, the browser will send a DELETE request through Fetch to our 'Express' server. Then, the server responds by sending either an error or a message back with the .then(' request received') method.

app.delete("/completedTasks", (req, res) => {
  db.collection("CRUD_App").deleteMany(
    {tasks:req.body.tasks},//what is this object syntax targetting? 
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Completed tasks deleted!");
    }
  );
});



//delete ALL TASKS 
 
app.delete("/allTasks", (req, res) => {
  db.collection("CRUD_App").remove({},
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("All Tasks deleted!");
    }
  );
});


