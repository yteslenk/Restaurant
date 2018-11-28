var dotPosition = 1;

localStorage.setItem("tables", JSON.stringify({}));

makeCarousel();

// CAROUSEL

function move(x) {
    var dot = document.querySelector(".dots_wrapper > span:nth-child(" + dotPosition + ")");
    if ((x === -1 && dotPosition > 1) || (x === 1 && dotPosition < 3))
    {
        dotPosition += x;
        dot.classList.remove("active");
    }
    pressTheDot(dotPosition);
}

function pressTheDot(x) {
    console.log(x);
    var offset, dot, sliderTape = document.getElementById("slidesWrapper");
    dot = document.querySelector(".dots_wrapper > span:nth-child(" + dotPosition + ")");
    dot.classList.remove("active");
    dotPosition = x;
    offset = dotPosition === 1 ? 0 : dotPosition > 2 ? document.body.clientWidth * -2 : document.body.clientWidth * -1;
    sliderTape.style.transform = "translateX(" + offset + "px" + ")";
    sliderTape.style.transition = "all 1s";
    dot = document.querySelector(".dots_wrapper > span:nth-child(" + dotPosition + ")");
    dot.classList.add("active");
}

function makeCarousel() {
    var carousel = document.getElementById("carousel");
    carousel.style.width = window.innerWidth + "px";
    carousel.style.height = window.innerHeight + "px";
    var slidesWrapper = document.createElement("div");
    slidesWrapper.setAttribute("id", "slidesWrapper");
    for (var i = 0; i < 3; i++)
    {
        var slide = document.createElement("div");
        slide.style.width = window.innerWidth + "px";
        slide.style.height = window.innerHeight + "px";
        slidesWrapper.appendChild(slide);
    }
    carousel.insertBefore(slidesWrapper, carousel.firstChild);
}
//

// SMOOTH SLIDE MENU - TARGET

function fly(event) {
    event.preventDefault();
    var target = event.target;
    if (target.tagName === "EM")
        target = target.parentNode;
    var key = target.getAttribute("href");
    var peak = document.querySelector(key).getBoundingClientRect().top;
    window.scrollBy({
    top: peak,
    left: 0,
    behavior: "smooth"} );
}

// FILL UP PAGE WITH CONTENT - BURGERS/DESSERT MENU

function makeContent (dataObj, block) {
    var content_wrapper = document.getElementById(block);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataObj.menu.length; i++)
    {
        var menuItem = document.createElement("div");
        var leftBlock = document.createElement("div");
        var rightBlock = document.createElement("div");

        leftBlock.style.backgroundImage = "url(" + "'" + dataObj.menu[i].path + "'" + ")";
        var title = document.createElement("h4");
        title.innerText = dataObj.menu[i].title;
        var ingredients = document.createElement("p");
        ingredients.innerText = dataObj.menu[i].consist;
        var price = document.createElement("span");
        price.innerText = dataObj.menu[i].price + " UAH";
        rightBlock.appendChild(title);
        rightBlock.appendChild(ingredients);
        rightBlock.appendChild(price);

        menuItem.appendChild(leftBlock);
        menuItem.appendChild(rightBlock);
        fragment.appendChild(menuItem);
    }
    content_wrapper.appendChild(fragment);
}

setTimeout(makeContent(JSON.parse(menuForBurgers), "burger"), 1000);
setTimeout(makeContent(JSON.parse(menuForDesserts), "dessert"), 1000);

//SORT BY PRICE

function sortMenu(a, obj,e)
{
    var block = e.target.getAttribute("data-target");
    if (a === 1)
    {
        obj.menu.sort(function (a, b) {
            return a.price - b.price;
        })
    }
    else if (a === 2)
    {
        obj.menu.sort(function (a, b) {
            return b.price - a.price;
        })

    }
    deleteMenu(block);
    makeContent(obj, block);
}

// CLEAN UP PAGE FROM CONTENT

function deleteMenu(block) {
    var parent = document.getElementById(block);
    var selector = "#" + block;
    var children = document.querySelectorAll(selector +  " > div");
    for (var i = 0; i < children.length; i++)
        parent.removeChild(children[i]);
}

// FILTER MENU

function filterMenu(obj, block, choice) {
    deleteMenu(block);
    var selection = document.getElementById(choice);
    var filterName = selection.options[selection.selectedIndex].value;
    if (filterName === "all")
        makeContent(obj, block);
    else
    {
        var filteredArray = obj.menu.filter(function (a) {return a.choice === filterName});
        makeContent({menu: filteredArray}, block);
    }
}
makeBreadPath();

//ADD CHAIRS

function addChairs(parent, amountOfChairs) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < amountOfChairs; i++)
    {
        var child = document.createElement("div");
        child.classList.add("chairs");
        fragment.appendChild(child);
    }
    parent.appendChild(fragment);
}

// RESERVATION HEADING ABOVE TABLES

function reservationHeading(key) {
    var parent = document.getElementById("tables");
    var headingWrapper = document.createElement("div");
    var heading = document.createElement("p");
    var arr = key.split(".");
    heading.innerText = arr[3] + "." + arr[2] + "." + arr[1] + " " + arr[4] + ".00 o'clock";
    headingWrapper.appendChild(heading);
    parent.appendChild(headingWrapper);
}

// TABLES LAYOUT

function tablesLayout(key) {
    var numOfChairs;
    var parent = document.getElementById("tables");
    reservationHeading(key);
    var fragment = document.createDocumentFragment();
    var tableSixWrapper = document.createElement("div");
    tableSixWrapper.classList.add("tableSixWrapper");
    for (var i = 0; i < 3; i++)
    {
        var table = document.createElement("div");
        var p = document.createElement("p");
        table.setAttribute("data-tableNum", key + "." + (i + 1));
        table.addEventListener("click", saveReservation);
        addChairs(table, 6);
        p.innerHTML = "table #" + (i + 1) + "<br>" +   "6 spots";
        table.appendChild(p);
        tableSixWrapper.appendChild(table);
    }
    fragment.appendChild(tableSixWrapper);
    for (var z = 0; z < 3; z++)
    {
        var tableThreeFourWrapper = document.createElement("div");
        tableThreeFourWrapper.classList.add("tableThreeFourWrapper");
        for (var j = 0; j < 3; j++)
        {
            i++;
            table = document.createElement('div');
            table.addEventListener("click", saveReservation);
            table.setAttribute("data-tableNum", key + "." + i);
            p = document.createElement("p");
            numOfChairs = j % 2 === 0 ? 3 : 4;
            p.innerHTML = "table #" + i + "<br>" + numOfChairs + " spots";
            addChairs(table, numOfChairs);
            table.appendChild(p);
            tableThreeFourWrapper.appendChild(table);
        }
        fragment.appendChild(tableThreeFourWrapper);
    }
    parent.appendChild(fragment);
}

// COMPARE DATES FOR RESERVATION. CHECK IF IT'S NOT A PAST

function compareDates(year, month, day) {
    console.log("hello");

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    if (currentYear > year)
        return false;
    else if (currentYear == year && currentMonth > month)
        return false;
    else if (currentYear == year && currentMonth == month && currentDay > day)
        return false;
    return true;
}

// MAKE KEY FOR tableNum

function timeKey() {
    var resDate = document.getElementById("reservationDate");
    var resTime = document.getElementById("reservationTime").value;
    var currentDate = new Date(resDate.value.split("-").join(","));
    var y = currentDate.getFullYear();
    var m = currentDate.getMonth() + 1 < 10 ? "0" + currentDate.getMonth() + 1 : currentDate.getMonth() + 1;
    var d = currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate();
    return "K." + y + "." +  m + "." + d + "." + resTime;
}

//MAKE RESERVATION

function makeReservation(e) {
    e.preventDefault();
    var key = timeKey();
    var mass = key.split(".");
        if (!compareDates(mass[1],mass[2],mass[3]))
        {
            deleteMenu("tables");
            alert("We are sorry, but it's all about past");
        }
        else{
            deleteMenu("tables");
            deleteReserves();
            tablesLayout(key);
            printReserves();
            addColors("tables");
        }
}

// DELETE RESERVES FROM PAGE

function deleteReserves() {
    var parent = document.getElementById("reserves");
    var children = document.querySelectorAll("#reserves > p");
    for (var i = 0; i < children.length; i++)
        parent.removeChild(children[i]);
}

// DELETE RESERVES FROM LOCALSTORAGE

function deleteReservationFromData(event) {
    var target = event.target.parentElement.parentElement;
    var reserves = JSON.parse(localStorage.getItem("tables"));
    var key = target.getAttribute("data-dateKey");
    delete reserves[key];
    localStorage.setItem("tables", JSON.stringify(reserves));
    deleteMenu("tables");
    deleteReserves();
    var dateKey = timeKey();
    tablesLayout(dateKey);
    printReserves();
    addColors("tables");
}


// FILL UP PAGE WITH RESERVATION LIST

function printReserves() {
    var reserves = JSON.parse(localStorage.getItem("tables"));
    var parent = document.getElementById("reserves");
    var fragment = document.createDocumentFragment();
    var arrReserves = [];
    for (var key in reserves) {
        if (reserves.hasOwnProperty(key))
            arrReserves.push(key);
    }
    var heading = document.createElement("p");
    heading.innerText = "Your Reserves (" + arrReserves.length + ")";
    fragment.appendChild(heading);
    for (var i = 0; i < arrReserves.length; i++)
    {
        var mass = arrReserves[i].split(".");
        var p = document.createElement("p");
        var cross = document.createElement("span");
        cross.addEventListener("click", deleteReservationFromData);
        cross.innerHTML = "<i class=\"fas fa-times reserve_cross\"></i>";
        p.innerText = (i + 1) +  ") " + mass[3] + "." + mass[2] + "." + mass[1] + " " + mass[4] + ".00 o'clock"
        + "/" + "table # " + mass[5];
        p.setAttribute("data-dateKey", arrReserves[i]);
        p.appendChild(cross);
        fragment.appendChild(p);
    }
    parent.appendChild(fragment);
}


// SAVE RESERVATION IN LOCALSTORAGE

function saveReservation(event) {
    var target = event.target.tagName === "div" ? event.target : event.target.parentElement;
    var tableNum = target.getAttribute("data-tableNum");
    var t = JSON.parse(localStorage.getItem("tables"));
    var response = tableNum in t;
    if (!response)
    {
        t[tableNum] = 1;
        localStorage.setItem("tables", JSON.stringify(t));
    }
    deleteMenu("tables");
    var key = timeKey();
    tablesLayout(key);
    addColors("tables");
    deleteReserves();
    printReserves();
}

// ADD OR REMOVE COLORS OF RESERVATION

function addColors(tables) {
    var parent = document.getElementById(tables);
    var data = JSON.parse(localStorage.getItem("tables"));
    console.log(data);
    var parentChildren = parent.children;
    for (var i = 0; i < parentChildren.length; i++)
    {
         var medium = parentChildren[i];
         var mediumChildren = medium.children;
         for (var j = 0; j < mediumChildren.length; j++)
         {
            var key = mediumChildren[j].getAttribute("data-tableNum");
            if (key in data)
                mediumChildren[j].classList.add("colors");
             else
                mediumChildren[j].classList.remove("colors");
         }
    }
}

// SHOW FULL SIZE OF DRINK

function showFullSizeDrinkImg(event) {
    var keyForFullPicture = event.target.getAttribute("data-img");
    var target = document.getElementById(keyForFullPicture);
    target.classList.add("show_block");
}

// DELETE FULL SIZE DRINK IMG

function deleteFullDrinkImg(event) {
    var parent = event.target.parentNode.parentNode;
    parent.classList.remove("show_block");
}

// MOBILE VERSION MENU ROLLDOWN

function rollDown() {
    var parent = document.getElementsByTagName("nav")[0];
    var arrowDown = document.getElementById("menu_open");
    arrowDown.style.display = "none";
    arrowDown.style.transitionDelay = "all 1s";
    parent.classList.remove("rollUp");
    parent.classList.add("rollDown");
}

// MOBILE VERSION MENU ROLLUP

function rollUp() {
    var parent = document.getElementsByTagName("nav")[0];
    parent.classList.remove("rollDown");
    parent.classList.add("rollUp");
    var arrowDown = document.getElementById("menu_open");
    arrowDown.style.display = "inline-block";
}
