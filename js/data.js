const dataBurgers = [];
dataBurgers[0] = {"title" : "Double Beef & Cheese Burger", "price" : 135, "consist" : "double beef patty, double cheese, sauce Relish", "path" : "img/b/b1.jpeg", "choice": "beef"};
dataBurgers[1] = {"title" : "Blue Cheese Burger", "price" : 135, "consist" : "beef burger, blue cheese, cranberry sauce, apple slices, sauce of French mustard", "path" : "img/b/b2.jpeg", "choice": "beef"};
dataBurgers[2] = {"title" : "Mexico City Burger", "price" : 119, "consist" : "tomatos, sauce jalapeno, hot pepper, Cheddar", "path" : "img/b/b3.jpeg", "choice": "vegan"};
dataBurgers[3] = {"title" : "Puld Pork Burger", "price" : 110, "consist" : "smoked pork, bacon, own BBQ sauce and jalapenos", "path" : "img/b/b4.jpeg", "choice": "pork"};
dataBurgers[4] = {"title" : "The farmer fed burger", "price" : 130, "consist" : "big burger with xxl beef cutlet, Cheddar cheese, egg, bacon, tomato, lettuce, pickles, sweet onions, ranch dressing and barbecue sauce", "path" : "img/b/b5.jpeg", "choice": "beef"};
dataBurgers[5] = {"title" : "Chicken Burger", "price" : 109, "consist" : "chicken thigh in a soy-marinated grilled thyme, bacon, pumpkin, spinach, mustard-honey sauce", "path" : "img/b/b6.jpeg", "choice": "chicken"};
dataBurgers[6] = {"title" : "Indy Farm Burger", "price" : 109, "consist" : "turkey (cutlet), caramelized onions, bell peppers, spinach, onion sauce", "path" : "img/b/b7.jpeg", "choice": "turkey"};
dataBurgers[7] = {"title" : "Fish Burger", "price" : 100, "consist" : "fish , pickles, lettuce and sauce", "path" : "img/b/b8.jpeg", "choice": "vegan"};



const dataDesserts = [];
dataDesserts[0] = {"title" : "Tasty Apricots", "price" : 135, "consist" : "dried apricots, pumpkin seeds, whipped cream", "path" : "img/c/c1.jpeg", "choice" : "cake"};
dataDesserts[1] = {"title" : "Nutty Cake", "price" : 150, "consist" : "hazelnut, walnut, peanut, dark chocolate", "path" : "img/c/c2.jpeg", "choice" : "cake"};
dataDesserts[2] = {"title" : "Honey Mood", "price" : 140, "consist" : "walnut, honey, cinnamon", "path" : "img/c/c3.jpeg", "choice" : "cake"};
dataDesserts[3] = {"title" : "Strawberry Cheese", "price" : 125, "consist" : "cheese, strawberry, biscuit", "path" : "img/c/c4.jpeg", "choice" : "cheese"};
dataDesserts[4] = {"title" : "Blueberry Cheese", "price" : 125, "consist" : "cheese, blueberry, mint, biscuit", "path" : "img/c/c5.jpeg", "choice" : "cheese"};
dataDesserts[5] = {"title" : "Freeze Brownie", "price" : 160, "consist" : "pistachio ice cream, dark chocolate biscuit", "path" : "img/c/c6.jpeg", "choice" : "brownie"};
dataDesserts[6] = {"title" : "Orange Brownie", "price" : 160, "consist" : "orange, dark chocolate, biscuit", "path" : "img/c/c7.jpg", "choice" : "brownie"};
dataDesserts[7] = {"title" : "Double Sweet", "price" : 160, "consist" : "dark chocolate, chocolate syrup", "path" : "img/c/c8.jpeg", "choice" : "brownie"};


const drinksImg = [];
drinksImg[0] = "img/d/cola.jpeg";
drinksImg[1] = "img/d/fanta.jpg";
drinksImg[2] = "img/d/mirinda.jpeg";
drinksImg[3] = "img/d/mountain.jpg";
drinksImg[4] = "img/d/pepper.jpg";
drinksImg[5] = "img/d/sprite.gif";


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var objBurgers = {
    "menu" : dataBurgers
};

var objDesserts = {
    "menu" : dataDesserts
};

var menuForBurgers = JSON.stringify(objBurgers);
var menuForDesserts = JSON.stringify(objDesserts);
var arr = [], currentTime = "";
for (var i = 1; i <= 50; i++) {
    var obj = {};
    var t = new Date();
    obj.name = "anonymous";
    var minutes = t.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = t.getSeconds();
    seconds = seconds  < 10 ? "0" + seconds : seconds;
    var hours = t.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    currentTime = t.getDate() + " " + monthNames[t.getMonth()].slice(0,3) + " " + t.getFullYear() + " " + hours + ":" + minutes + ":" + seconds;
    obj.time = currentTime;
    obj.text = "Comment №" + i;
    arr.push(obj);
}
var objComments = {
    "arr" : arr,
    "page": 1
};

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

