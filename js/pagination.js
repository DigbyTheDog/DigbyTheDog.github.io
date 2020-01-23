// Pagination stuff. Partially stolen from https://stackoverflow.com/questions/25434813/simple-pagination-in-javascript

var devMode = false;
var current_page = 1;
var records_per_page = 5;
var body = "";

function nextPage() {

  if (current_page < numPages()) {
    changePage(current_page + 1);
  }

}

function prevPage() {

  if (current_page > 1) {
    changePage(current_page - 1);
  }

}

function pageButton(btn_index){

    var btn_pagenum = document.getElementById("page" + btn_index);
    var btn_number = Number(btn_pagenum.textContent);
    changePage(btn_number);

}

function changePage(page) {

    current_page = page;
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
        if (i == entries.length || i < 0)
            break;

        body += getEntryText(entries[i]);
    }
    
    activatePageButtons();
    main.innerHTML = body;
    console.log(current_page);

}

function getEntryText(fileName) {

    var postText;
    var client = new XMLHttpRequest();
    client.open('GET', 'https://lexleesch.com/entries/' + fileName, false);
    client.onreadystatechange = function() {
        if (client.readyState == 4 && client.status == 200) {
            postText = client.responseText;
        }
    }
    client.send();
    return postText;

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

    var matchFound = false;
    var btn_pagenum;
    var btn_number;
    for (var i = 1; i <= 9; i++) {

        btn_pagenum = document.getElementById("page" + i);
        btn_number = Number(btn_pagenum.textContent);


        if(btn_number == current_page){
            matchFound = true;
            if (i > 5) {
                var current_page_temp = current_page;
                var num_to_shift = i - 5;
                while(current_page_temp + 4 > numPages()){
                    current_page_temp--;
                    num_to_shift--;
                }
                console.log(current_page_temp + " " + num_to_shift);
                shiftPageButtons(num_to_shift);        
            }
            else if (i < 5){
                shiftPageButtons(- (btn_number - i));
            }

        }


    }

    if (!matchFound){
        btn_pagenum = document.getElementById("page1");
        btn_number = Number(btn_pagenum.textContent);
        shiftPageButtons(- (btn_number - 1));
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

function shiftPageButtons(shiftNumber) {

    for (var i = 1; i <= 9; i++) {

        var btn_pagenum = document.getElementById("page" + i);
        var btn_number = Number(btn_pagenum.textContent);
        btn_pagenum.textContent = btn_number + shiftNumber;

    }

}

function search() {

    entries = allEntries;
    var searchtext = document.getElementById("searchtext").value;

    if(searchtext == '' || searchtext == 'Search here...'){
        changePage(1);
        return;
    }

    var newEntries = [];
    for (var i = 0; i < entries.length; i++){

        var entryText = getEntryText(entries[i]);
        var searchResults = entryText.toLowerCase().search(searchtext.toLowerCase());
        if(searchResults > 0){
            newEntries.push(entries[i]);
        }

    }

    if(newEntries.length == 0){
        newEntries.push("NoResults.html");
    }

    entries = newEntries;
    changePage(1);

}

function loadCategory(category) {

    entries = allEntries;

    if(category == '' || category == 'Everything'){
        changePage(1);
        return;
    }

    var newEntries = [];
    for (var i = 0; i < entries.length; i++){

        var entryText = getEntryText(entries[i]);
        var entryTag = entryText.match("rel=\"category tag\">(.*)</a>")[1];
        if(entryTag === category)
            newEntries.push(entries[i]);

    }

    if(newEntries.length == 0){
        newEntries.push("NoResults.html");
    }

    entries = newEntries;
    changePage(1);

}

window.onload = function() {

    if(!devMode)
        changePage(1);

};

var entries = [
    "ThisWebsite.html",
    "PicoBomber.html"
];
var allEntries = entries;