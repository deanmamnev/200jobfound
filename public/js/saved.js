
$(document).ready(function () {

    $(document).ready(function () {
        $.get("/api/auth").then(function (res) {
            if (!res) {
                window.location.replace("/")
            } else {
                $.get("/api/saved", function (res) {
                    $(".results-wrapper").empty()
                    for (i = 0; i < res.length; i++) {
                        var result = createResult(res[i].id, res[i], true)
                        $(".results-wrapper").append(result)
                    }
                    $('.result-description *').removeAttr('style');
                    $(".result-info").hide()
                })
            }
        })
    })

    $("#searchButton").on("click", function(e) {
        e.preventDefault()
        window.location.replace("/search")
    })

    $("#searchButton").mouseover(function () {
        $(this).css("background-color", "rgb(60, 60, 60)")
    })

    $("#searchButton").mouseleave(function () {
        $(this).css("background-color", "rgb(30, 30, 30)")
    })

    $("#logOutButton").mouseover(function () {
        $(this).css("background-color", "rgb(60, 60, 60)")
    })

    $("#logOutButton").mouseleave(function () {
        $(this).css("background-color", "rgb(30, 30, 30)")
    })

    $("#logOutButton").on("click", function (e) {
        e.preventDefault()
        $.get("/api/logout").then(function () {
            window.location.replace("/")
        })
    })

    $(document.body).on('click', '.tasks', function (e) {
        e.preventDefault()
        var id = $(this).attr("data")
        $('#tasksModal').attr('job', id);
        $('#tasksModal').modal('toggle');
        $("#tasks").empty()
        $.get("/api/tasks?job=" + id, function (res) {
            for (i = 0; i < res.length; i++) {
                var task = createTask(res[i])
                $("#tasks").append(task)
            }
        })
    })
    $(document.body).on('click', '.removeTask', function (e) {
        var id = $(this).attr("task")
        var job = $(this).attr("job")
        $.ajax({
            url: '/api/tasks?id=' + id,
            method: 'DELETE',
            success: function (res) {
                $.get("/api/tasks?job=" + job, function (res) {
                    $("#tasks").empty()
                    for (i = 0; i < res.length; i++) {
                        var task = createTask(res[i])
                        $("#tasks").append(task)
                    }
                })
            },
        });
    })
    $(document.body).on('click', '.info', function (e) {
        e.preventDefault()
        var id = $(this).attr("id").replace(/\D/g, '');
        var toggle = $(this).attr("toggle")
        $("#content" + id).css("max-height", "320px")
        $("#expand" + id).html("<button class='btn btn-outline-secondary arrow-down'>" +
            "<img src='/assets/chevron-down.png' />" +
            "</button>")
        if ($(window).scrollTop() > $("#result" + id).offset().top) {
            $('html, body').animate({
                scrollTop: $("#result" + id).offset().top
            }, 200);
        }
        $("#expand" + id).attr("toggle", "true")
        if (toggle == "true") {
            $(this).html("Description")
            $("#description" + id).hide()
            $("#info" + id).css("display", "flex")
            $(this).attr("toggle", "false")
        } else {
            $(this).html("Information")
            $("#info" + id).css("display", "none")
            $("#description" + id).show()
            $(this).attr("toggle", "true")
        }
    })

    $(document.body).on('click', '.apply', function (e) {
        e.preventDefault()
        var data = $(this).attr("data")
        window.open(data)
    })

    $(document.body).on('click', '.delete', function (e) {
        e.preventDefault()
        var id = $(this).attr("data")
        $("#result" + id).animate({ height: 0, opacity: 0 }, 'slow')
        $.ajax({
            url: '/api/saved?id=' + id,
            method: 'DELETE',
            success: function (res) {
                $.get("/api/saved", function (res) {
                    $(".results-wrapper").empty()
                    for (i = 0; i < res.length; i++) {
                        var result = createResult(res[i].id, res[i], true)
                        $(".results-wrapper").append(result)
                    }
                    $('.result-description *').removeAttr('style');
                    $(".result-info").hide()
                })
            },
        });
    })

    $(document.body).on('click', '.jobPage', function (e) {
        e.preventDefault()
        var href = $(this).attr("href")
        window.open(href)
    })

    $(document.body).on('click', '.businessPage', function (e) {
        e.preventDefault()
        var href = $(this).attr("href")
        window.open(href)
    })

    $("#task").on('click', function (e) {
        e.preventDefault()
        var task = $("#taskField").val()
        var job = $('#tasksModal').attr('job')
        $.post("/api/tasks?task=" + task + "&job=" + job).then(function () {
            $.get("/api/tasks?job=" + job).then(function (res) {
                $("#tasks").empty()
                for (i = 0; i < res.length; i++) {
                    var task = createTask(res[i])
                    $("#tasks").append(task)
                }
            })
        })
    })

    $(document.body).on('click', '.tickbox', function (e) {
        e.preventDefault()
        var tick
        var task = $(this).attr('data')
        if ($(this).attr('toggle') == 'true') {
            tick = 0
        } else {
            tick = 1
        }
        var id = $(this).attr("job")
        $(this).attr("src", "/assets/ticking.png")
        console.log("!")
        $.post("/api/tick?task=" + task + "&tick=" + tick).then(function (res) {
            $.get("/api/tasks?job=" + id, function (res) {
                $("#tasks").empty()
                for (i = 0; i < res.length; i++) {
                    var task = createTask(res[i])
                    $("#tasks").append(task)
                }
            })
        })
    })

    $(document.body).on('click', '.result-expand', function (e) {
        e.preventDefault()
        var id = $(this).attr("id").replace(/\D/g, '');
        var toggle = $(this).attr("toggle")
        console.log(toggle)
        if (toggle == "true") {
            $("#content" + id).css("max-height", "100%")
            $("#content" + id).css("height", "auto")
            $(this).html("<button class='btn btn-outline-secondary arrow-down'>" +
                "<img src='/assets/chevron-up.png' />" +
                "</button>")
            $(this).attr("toggle", "false")
        } else {
            $("#content" + id).css("max-height", "320px")
            // $("#content" + id).css("height", "auto")
            $(this).html("<button class='btn btn-outline-secondary arrow-down'>" +
                "<img src='/assets/chevron-down.png' />" +
                "</button>")
            if ($(window).scrollTop() > $("#result" + id).offset().top) {
                $('html, body').animate({
                    scrollTop: $("#result" + id).offset().top
                }, 200);
            }
            $(this).attr("toggle", "true")
        }
    })
})

//------------------------------------------------------------------------------

function createResult(id, data, saved) {
    if (data.perks === null || data.perks == "") {
        data.perks = "[None Listed]"
    }
    if (data.telecommuting) {
        data.telecommuting = "true"
    } else {
        data.telecommuting = "false"
    }
    if (data.relocation_assistance) {
        data.relocation_assistance = "true"
    } else {
        data.relocation_assistance = "false"
    }
    if (!data.company_url) {
        company = "404<br/>Company Logo Not Found"
    }
    if (!data.company_name) {
        data.company_name = "[Not Listed]"
    }
    if (!data.category_name) {
        data.category_name = "[Not Listed]"
    }
    if (!data.type_name) {
        data.type_name = "[Not Listed]"
    }
    if (data.company_url) {
        company = "<img src='https://logo.clearbit.com/" + data.company_url + "' class='result-logo-img' onerror='replaceLogo(this)'/>"
    }
    var string =
        "<div class='result' id='result" + id + "'>" +
        "<div class='result-header'><strong>" + data.title + "</strong></div>" +
        "<div class='result-content' id='content" + id + "'>" +
        "<div class='result-description' id='description" + id + "'>" + data.description + "</div>" +
        "<div class='result-info' id='info" + id + "'>" +
        "<div class='result-company-logo'>" + company + "</div>" +
        "<div class='result-company-name'><strong>Company Name:</strong><br/><a class='businessPage' href='" + data.company_url + "'>" + data.company_name + "</a></div>" +
        "<div class='result-post-date'><strong>Date Posted:</strong><br/>" + data.post_date + "</div>" +
        "<div class='result-category-name'><strong>Category:</strong><br/>" + data.category_name + "</div>" +
        "<div class='result-perks'><strong>Perks:</strong><br/>" + data.perks + "</div>" +
        "<div class='result-type-name'><strong>Hours:</strong><br/>" + data.type_name + "</div>" +
        "<div class='result-relocation-assistance'><strong>Relocation Assistance:</strong><br/>" + data.relocation_assistance + "</div>" +
        "<div class='result-telecommuting'><strong>Telecommute:</strong><br/>" + data.telecommuting + "</div>" +
        "<div class='result-url'><strong>Job Page:</strong><br/><a class='jobPage' href='" + data.url + "'>Click Here</a></div>" +
        "</div>" +
        "</div>" +
        "<div class='result-expand' id='expand" + id + "' toggle='true'>" +
        "<button class='btn btn-outline-secondary arrow-down'>" +
        "<img src='/assets/chevron-down.png' />" +
        "</button>" +
        "</div>"
    if (saved) {
        return (string +
            "<div class='button-group'>" +
            "<button type='button' class='btn btn-outline-light button info' toggle='true' id='info" + id + "'>Information</button>" +
            "<button type='button' class='btn btn-outline-warning button tasks' data='" + id + "'>Tasks</button>" +
            "<button type='button' class='btn btn-outline-danger button delete'>Delete</button>" +
            "<button type='button' class='btn btn-outline-primary button apply' data='" + data.apply_url + "'>Apply</button>" +
            "</div>" +
            "</div>"
        )
    } else {
        return (string +
            "<div class='button-group'>" +
            "<button type='button' class='btn btn-outline-light button info' toggle='true' id='info" + id + "'>Information</button>" +
            "<button type='button' class='btn btn-outline-success button save' data='" + id + "'>Save</button>" +
            "<button type='button' class='btn btn-outline-primary button apply' data='" + data.apply_url + "'>Apply</button>" +
            "</div>" +
            "</div>"
        )
    }
}
function replaceLogo(ele) {
    $(ele).parent().append("404<br/>Company Logo Not Found")
    $(ele.remove())
}


function createTask(data) {
    var ticked
    if (data.ticked) {
        ticked = ""
    } else {
        ticked = "un"
    }
    return (
        "<tr><td><img class='tickbox' job='" + data.job + "' toggle='" + data.ticked + "' data='" + data.id + "' src='/assets/" + ticked + "ticked.png'></td>" +
        "<td>" + data.task + "</td>" +
        "<td><img class='removeTask' job='" + data.job + "' task='" + data.id + "' src='/assets/remove.png'/></td></tr>"
    )
}