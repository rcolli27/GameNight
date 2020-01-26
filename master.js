window.onload = function() {
    var updateButtons = document.getElementsByClassName("update-button");
    var deleteButtons = document.getElementsByClassName("delete-button");
    for (var i = 0; i < updateButtons.length; i++) {
        updateButtons[i].onclick = function () { window.location.href = "connection.html"; }
    }
    for (var i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].onclick = function () { window.location.href = "savedConnections.html"; }
    }
}