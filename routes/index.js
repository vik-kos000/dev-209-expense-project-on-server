var express = require('express');
var router = express.Router();

let serverArray = [];

let ExpenseObject = function (pName, pPrice, pDate, pLocationName, pCategory) {
  this.name = pName;
  this.price = pPrice;
  this.date = pDate;
  this.locationName = pLocationName;
  this.category = pCategory;
  this.id = Math.random().toString(16).slice(5);
  this.show = function(){
      return this.id + ", " + this.name + ", " + this.price + ", " + 
      this.date + ", " + this.locationName + ", " + this.category;
  };
};

serverArray.push ( new ExpenseObject("Laptop", 1100, "2004-22-12", "Mall", "School")  );
serverArray.push ( new ExpenseObject("Strawberries", 5, "2006-12-10", "Mall", "Food")  );
serverArray.push ( new ExpenseObject("Blanket", 30, "2005-25-11", "Mall", "Home")  );

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
});

module.exports = router;
