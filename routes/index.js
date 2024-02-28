var express = require('express');
var router = express.Router();


//Populate the array on the server side

let serverArray = []; //create an empty array in the server

//creating an "Expense" object function
let ExpenseObject = function (pName, pPrice, pDate, pLocationName, pCategory) {
  //define object's attributes
  this.name = pName;
  this.price = pPrice;
  this.date = pDate;
  this.locationName = pLocationName;
  this.category = pCategory;
  this.id = Math.random().toString(16).slice(5); //creating a random string for server Id 
  this.show = function(){
      return this.id + ", " + this.name + ", " + this.price + ", " + 
      this.date + ", " + this.locationName + ", " + this.category;
  };
};

//Populate the array in the server
serverArray.push ( new ExpenseObject("Laptop", 1100, "2004-22-12", "Mall", "School")  );
serverArray.push ( new ExpenseObject("Strawberries", 5, "2006-12-10", "Mall", "Food")  );
serverArray.push ( new ExpenseObject("Blanket", 30, "2005-25-11", "Mall", "Home")  );

//Display the serverarry
console.log(serverArray);


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html');
});

/* GET all Expense data */
router.get('/getAllExpenses', function(req, res) {
  res.status(200).json(serverArray);
});

/* Add one new expense */
router.post('/AddExpense', function(req, res) {
  const newExpense = req.body;
  serverArray.push(newExpense);
  res.status(200).json(newExpense);
  console.log(serverArray);
});

// Route the DELETE request for deleting an expense
router.delete('/DeleteExpense/:id', function(req,res){
  const expenseId = req.params.id;
  //find the index of expense with given Id In serverArray
  const index = serverArray.findIndex(expense =>expense.id === expenseId);
  if (index !== -1){
    //Remove expense from ServerArray
    serverArray.splice(index,1);
    res.status(200).json({message:"Expense deleted successfully"});
  }else{
    res.status(404).json({message:"Expense not found"});
  }
})
//export the router
module.exports = router;
