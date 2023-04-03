/* eslint-disable no-unused-vars */
const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); 
const path = require("path"); 
const todo = require("./models/todo");
const pathofview =path.join(__dirname+"/views");

// set EJS as view engine
app.set("view engine", "ejs");

app.set("views",pathofview);
app.get("/", async (request, response) => {
  
  const todolist = await Todo.gettodos();
  const yesterday = await Todo.Overdue();
  const tomorrow = await Todo.duelater();
  const today = await Todo.duetoday();
  
  try {
   response.render("index",{
     todolist,yesterday,tomorrow,today,
   });
  } catch (error) {
   response.send(error)
  }
});

app.get("/todos", async function (_request, response) {
  console.log("Processing list of all Todos ...");

  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

// app.get("/todos/:id", async function (request, response) {
//   try {
//     const todo = await Todo.findByPk(request.params.id);
//     return response.json(todo);
//   } catch (error) {
//     console.log(error);
//     return response.status(422).json(error);
//   }
// });

app.post("/todos", async function (request, response) {
  try {
    const todos = await Todo.addTodo({
      title:request.body.title,
      dueDate:request.body.dueDate,
      completed:false
    });
    await todos.save();
    response.redirect("/");
  } catch (error) {
    console.log(error);
    return response.status(400).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updatedTodo = await todo.markAsCompleted();
    return response.json(updatedTodo);
  } catch (error) {
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  console.log("We have to delete a Todo with ID: ", request.params.id);

  const deleteItem = await Todo.destroy({where:{id:request.params.id}})
  console.log(deleteItem?true:false)
  response.render("index")
});

module.exports = app;