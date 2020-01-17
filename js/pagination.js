// Pagination stuff. Partially stolen from https://stackoverflow.com/questions/25434813/simple-pagination-in-javascript

var current_page = 1;
var records_per_page = 5;
var body = "";

function nextPage() {

  if (current_page < numPages()) {
    current_page++;
    changePage(current_page);
  }

}

function prevPage() {

  if (current_page > 1) {
    current_page--;
    changePage(current_page);
  }

}

function pageButton(btn_index){

    var btn_pagenum = document.getElementById("page" + btn_index);
    var btn_number = Number(btn_pagenum.textContent);
    current_page = btn_number;
    changePage(current_page);

}

function changePage(page) {

    var main = document.getElementById("main");
    body = "";
    
    // Validate page
    if (current_page < 1) 
        current_page = 1;
    if (current_page > numPages()) 
        current_page = numPages();

    // Load the entries for this page
    for (var i = (current_page-1) * records_per_page; i < (current_page * records_per_page); i++) {
        
        // If we are out of entries to load, then stop.
        if (i == entries.length)
            break;

        appendPostToMainBody(entries[i]);
    }
    
    activatePageButtons();
    main.innerHTML = body;
    console.log(current_page);

}

function appendPostToMainBody(fileName) {

    var client = new XMLHttpRequest();
    client.open('GET', 'https://lexleesch.com/entries/' + fileName, false);
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            body += client.responseText;
        }
    }
    client.send();

}

function numPages() {

    return Math.ceil(entries.length / records_per_page);

}

function activatePageButtons() {

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");

    // The "Prev" button
    if (current_page == 1) {
        btn_prev.classList.add("inactive");
    } else {
        btn_prev.classList.remove("inactive");
    }

    // The "Next" button
    if (current_page == numPages()) {
        btn_next.classList.add("inactive");
    } else {
        btn_next.classList.remove("inactive");
    }

    for (var i = 1; i <= 9; i++) {

        var btn_pagenum = document.getElementById("page" + i);
        var btn_number = Number(btn_pagenum.textContent);

        if (btn_number == current_page && i > 5) {

            var current_page_temp = current_page;
            var num_to_shift = i - 5;
            while(current_page_temp + 4 > numPages()){
                current_page_temp--;
                num_to_shift--;
            }

            shiftPageButtons(num_to_shift);
        
        }

        if (btn_number == current_page && i < 5)
            shiftPageButtons(- (btn_number - i));

    }

    // The 9 buttons between
    for (var i = 1; i <= 9; i++) {

        var btn_pagenum = document.getElementById("page" + i);
        var btn_number = Number(btn_pagenum.textContent);

        if (btn_number > numPages())
            btn_pagenum.classList.add("inactive");
        else
            btn_pagenum.classList.remove("inactive");

        // Set the highlighted page
        if (btn_number == current_page)
            btn_pagenum.classList.add("current");
        else
            btn_pagenum.classList.remove("current");

    }

}

function shiftPageButtons(shiftNumber){

    for (var i = 1; i <= 9; i++) {

        var btn_pagenum = document.getElementById("page" + i);
        var btn_number = Number(btn_pagenum.textContent);
        btn_pagenum.textContent = btn_number + shiftNumber;

    }

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
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html",
    "01142020.html"
];