/*handles routes, rendering of view, passing of data to views

*/

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://test:test@ds157288.mlab.com:57288/todo');

//Create a schema, the kind of information to expect
var todoSchema = new mongoose.Schema({
  item: String
});

//model 
var Todo = mongoose.model('Todo', todoSchema);
/*
var itemOne = Todo({item: 'get flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
*/
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/todo', function(req, res){
  //get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
    if (err) throw err;//find all items
    res.render('todo', {todos: data});
  });
});

app.post('/todo', urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var newTodo = Todo(req.body).save(function(err,data){
    if (err) throw err;
	res.json(data);
  })
  //data.push(req.body);
  //res.json(data);
});

app.delete('/todo:item', function(req, res){
  //delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
	res.json(data);
  });
});

}
