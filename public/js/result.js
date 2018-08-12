function create(id, data, saved) {
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
    var string =
        "<div class='result' id='result" + id + "'>" +
        "<div class='result-header'><strong>" + data.title + "</strong></div>" +
        "<div class='result-content' id='content" + id + "'>" +
        "<div class='result-description' id='description" + id + "'>" + data.description + "</div>" +
        "<div class='result-info' id='info" + id + "'>" +
        "<div class='result-company-logo'><img src='https://logo.clearbit.com/" + data.company.url + "' class='result-logo-img' onerror='this.src=`/assets/logo-missing.png`'/></div>" +
        "<div class='result-company-name'><strong>Company Name:</strong><br/>" + data.company.name + "</div>" +
        "<div class='result-post-date'><strong>Date Posted:</strong><br/>" + data.post_date + "</div>" +
        "<div class='result-category-name'><strong>Category:</strong><br/>" + data.category.name + "</div>" +
        "<div class='result-perks'><strong>Perks:</strong><br/>" + data.perks + "</div>" +
        "<div class='result-type-name'><strong>Hours:</strong><br/>" + data.type.name + "</div>" +
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

    } else {
        return (string +
            "<div class='button-group'>" +
            "<button type='button' class='btn btn-outline-danger button info' toggle='true' id='info" + id + "'>Information</button>" +
            "<button type='button' class='btn btn-outline-success button save'>Save</button>" +
            "<button type='button' class='btn btn-outline-primary button apply' data='" + data.apply_url + "'>Apply</button>" +
            "</div>" +
            "</div>"
        )
    }
}