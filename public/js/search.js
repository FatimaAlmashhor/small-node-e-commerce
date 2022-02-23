function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function () {
        let select = document.getElementById("tableForm");
        console.log(select);
    }
    xhttp.open("GET", "notFound.ejs", true);
    xhttp.send();
}