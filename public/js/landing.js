$(document).ready(function () {
    $(document).addClass("info");
    $("#logInButton").on("click", function (e) {
        e.preventDefault()
        $('#logInModal').modal('toggle');
    })

    $("#registerButton").on("click", function (e) {
        e.preventDefault()
        $('#registerModal').modal('toggle');
    })

    $(".tab").mouseover(function () {
        $(this).css("background-color", "gray")
    })

    $(".tab").mouseleave(function () {
        $(this).css("background-color", "darkgray")
    })

    $("#search").on("click", function (e) {
        e.preventDefault()
        $(".results-wrapper").empty()
        var val = $("#searchField").val()
        $.get("/api/publicSearch?q=" + val, function (res) {
            for (i = 0; i < res.length; i++) {
                var result = createResult(i, res[i])
                $(".results-wrapper").append(result)
                $("#info" + i).hide()
                $("#description" + i).show()
            }
            console.log(res)
        })
    })
})

const createResult = function (id, data) {
    //this cant be the best way to do this...
    return (
        "<div class='result' id='result" + id + "'>" +
        "<div class='result-header'><strong>" + data.title + "</strong></div>" +
        "<div class='result-content' id='content" + id + "'>" +
        "<div class='result-description' id='description" + id + "'>" + data.description + "</div>" +
        "<div class='result-info'>" +
        "<table class='table table-bordered information-table' id='info" + id + "'>" +
        "<tbody>" +
        "<tr>" +
        "<td class='result-company-logo'><img src='https://logo.clearbit.com/" + data.company.url + "' class='result-logo-img'/></td>" +
        "<td class='result-company-name'><strong>Company Name:</strong><br/>" + data.company.name + "</td>" +
        "<td class='result-post-date'><strong>Date Posted:</strong><br/>" + data.post_date + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='result-category-name'><strong>Category:</strong><br/>" + data.category.name + "</td>" +
        "<td class='result-perks'><strong>Perks:</strong><br/>" + data.perks + "</td>" +
        "<td class='result-type-name'><strong>Hours:</strong><br/>" + data.type.name + "</td>" +
        "</tr>" +
        "<tr>" +
        "<td class='result-relocation-assistance'><strong>Relocation Assistance:</strong><br/>" + data.relocation_assistance + "</td>" +
        "<td class='result-telecommuting'><strong>Telecommute:</strong><br/>" + data.telecommuting + "</td>" +
        "<td class='result-url'><strong>Job Page:</strong><br/><a class='jobPage' href='" + data.url + "'>Click Here</a></td>" +
        "</tr>" +
        "</tbody>" +
        "</table>" +
        "</div>" +
        "</div>" +
        "<div class='result-expand' data='" + id + "' toggle='true'>" +
        "<button class='btn btn-outline-secondary arrow-down'>" +
        "<img src='/assets/chevron-down.png' />" +
        "</button>" +
        "</div>" +
        "<div class='button-group'>" +
        "<button type='button' class='btn btn-outline-danger button info' toggle='true' data='" + id + "'>Information</button>" +
        "<button type='button' class='btn btn-outline-success button save'>Save</button>" +
        "<button type='button' class='btn btn-outline-primary button apply' data='" + data.apply_url + "'>Apply</button>" +
        "</div>" +
        "</div>"
    )
}

$(document.body).on('click', '.info', function (e) {
    e.preventDefault()
    var id = $(this).attr("data")
    var toggle = $(this).attr("toggle")
    if (toggle == "true") {
        $(this).html("Description")
        $("#description" + id).hide()
        $("#info" + id).show()
        $(this).attr("toggle", "false")
    } else {
        $(this).html("Information")
        $("#info" + id).hide()
        $("#description" + id).show()
        $(this).attr("toggle", "true")
    }
})

$(document.body).on('click', '.apply', function (e) {
    e.preventDefault()
    var data = $(this).attr("data")
    window.open(data)
})

$(document.body).on('click', '.save', function (e) {
    e.preventDefault()
    $('#logInModal').modal('toggle');
})

$(document.body).on('click', '.jobPage', function (e) {
    e.preventDefault()
    var href = $(this).attr("href")
    window.open(href)
})

$(document.body).on('click', '.result-expand', function (e) {
    e.preventDefault()
    var id = $(this).attr("data")
    var toggle = $(this).attr("toggle")
    console.log(toggle)
    if (toggle == "true") {
        $("#content" + id).css("height", "auto")
        $(this).html("<button class='btn btn-outline-secondary arrow-down'>" +
            "<img src='/assets/chevron-up.png' />" +
            "</button>")
        $(this).attr("toggle", "false")
    } else {
        $("#content" + id).css("height", "320px")
        $(this).html("<button class='btn btn-outline-secondary arrow-down'>" +
            "<img src='/assets/chevron-down.png' />" +
            "</button>")
        $('html, body').animate({
            scrollTop: $("#result"+id).offset().top
        }, 200);
        $(this).attr("toggle", "true")
    }
})