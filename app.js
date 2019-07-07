//jshint esversion:6

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser:true });

const fruitSchema = new mongoose.Schema({
  name: { type: String,required:[true,"please check your data entry, no name is specified"] },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
// inserting fruits
const Fruit = mongoose.model("Fruit", fruitSchema);
const fruit = new Fruit({
  name: "peach",
  rating: 10,
  review: "solid fruit"
});

const Kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "The best Fruit"
});

const Orange = new Fruit({
  name: "Orange",
  rating: 6,
  review: "pretty sour"
});

const Banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "pretty good fruit"
});

fruit.save();

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 9,
//   review: "I love it "
// });
// pineapple.save();

// const mango = new Fruit({
//   name: "Mango",
//   rating: 10,
//   review: "Its heaven"
// });
//
// mango.save();

//or you can try this to insert many

Fruit.insertMany([Kiwi,Orange,Banana], function(err){
  if(err){
    console.log(error);
  }
  else{
    console.log("Sucessfully saved all the fruits");
  }
});

Fruit.deleteOne({name: "peach"}, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("successfully deleted the peach");
  }
});

Fruit.find(function(err, fruits){
  if(err)
  {
    console.log(err);
  }
  else{
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});



Fruit.updateOne({_id: "5d214126c4aae4182c914fbe"},{name:"peach"},function(err){
  if(err){
    console.log(error);
  }
  else{
    console.log("successfully updated the document");
  }
});

// creating person collection

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema

});

const Person= mongoose.model("Person", personSchema);
Person.updateOne({name: "John"},{ favouriteFruit: mango},function(err){
  if(err){
    console.log(err);
  }
  else
  {
    console.log("Sucessfully gave john a fav fruit");
  }

} );

Person.deleteMany({name:"John"}, function(err){
if(err){
  console.log(err);
}
else{
  console.log("successfully deleted all the Johns");
}
});

// const Person= mongoose.model("Person", personSchema);
// const person = new Person({
//   name: "Amy",
//   age: 7,
//   favouriteFruit: pineapple
// });

// const person = new Person({
//   name:"John",
//   age: 37
// });

//person.save();
