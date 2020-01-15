// Pagination stuff. Partially stolen from https://stackoverflow.com/questions/25434813/simple-pagination-in-javascript

var current_page = 1;
var records_per_page = 5;

function nextPage(){

  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }

}

function changePage(page){

    var main = document.getElementById("main");
    
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    appendPostToMainBody(entries[page - 1]);


    /*
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var main = document.getElementById("main");
    var page_span = document.getElementById("page");



    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        listing_table.innerHTML += objJson[i].adName + "<br>";
    }
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
    */

}

function appendPostToMainBody(fileName){

    var client = new XMLHttpRequest();
    client.open('GET', 'https://lexleesch.com/entries/' + fileName);
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            main.innerHTML += client.responseText;
        }
    }
    client.send();

}

function numPages(){

    return Math.ceil(entries.length / records_per_page);

}

window.onload = function() {

    changePage(1);

};

var entries = [
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html"
];