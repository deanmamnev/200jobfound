$(document).ready(function () {
    $.get("/api/auth").then(function(res) {
        if (res) {
            window.location.replace("/search")
        } else {
            window.location.replace("/")
        }
    })
})