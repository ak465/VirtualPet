var dog,sadDog,happyDog;
var foodObj;
var food5, foodStock;
var fedTime, lastFed, food, addFood;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);


  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  food = createButton("Feed the dog");
  food.position(700,95);
  food.mousePressed(FeedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  
  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
     lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed >= 12) {
     text("last Feed:   " + "PM", 350, 30);
  }
  else if(lastFed == 0){
    text("last Feed: 12AM ", 350, 30);
  }
  else {
    text("last Feed:  " + lastFed + "AM", 350, 30);
  }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  food5 = data.val();
  foodObj.updateFoodStock(food5);
}


//function to update food stock and last fed time
function FeedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj).getFoodStock()-1;
  daatbase.ref('/').update({
    Food: foodObj.getFoodStock(),
  })
}


//function to add food in stock
function addFoods(){
  foodS++;
  daatbase.ref('/').update({
    Food: foodS
  })
}
