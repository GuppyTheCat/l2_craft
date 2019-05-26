$.ajaxSetup({
    async: false
});

var resources, craftable_resources;
$.getJSON("../l2_craft/json/recipes_resources.json", function(res_data) {
    resources = res_data.resources;
});
$.getJSON("../l2_craft/json/craftable_resources.json", function(craft_res_data) {
    craftable_resources = craft_res_data.resources;
});

$.ajaxSetup({
    async: true
});

$.getJSON("../l2_craft/json/recipes_armor.json", function(data) {
    var content = "";
    var armor = data.armor;
    var i, j;
    for (i = 0; i < armor.length; i++) {
        content += "Предмет: " + armor[i][0] + "<br><br>";
        for (j = 0; j < armor[i][1].length; j++) {
            var craft_res_pos = check_craftable(armor[i][1][j][0]);
            if (craft_res_pos == -1) {
                content += armor[i][1][j][0] + " - " + armor[i][1][j][1] + " шт.<br>";
            } else {
                content += "<div class='craftable_res'>" + armor[i][1][j][0] + ' - ' + armor[i][1][j][1] +
                    " шт. <button class='btn default show_btn font-weight-bold'>+</button><br>";
                content += "<div class='hide'>";
                for (var l = 0; l < resources[craft_res_pos][1].length; l++) {
                    content += "&nbsp;&nbsp;&nbsp;&nbsp;" + resources[craft_res_pos][1][l][0] + " " +
                        (resources[craft_res_pos][1][l][1] * armor[i][1][j][1]) + " шт.<br>";
                };
                content += "</div></div>";
            };
        };
        content += "<hr>";
    };
    $("#info").append(content);

    function check_craftable(resource) {
        for (var z = 0; z < craftable_resources.length; z++) {
            if (resource == craftable_resources[z]) {
                return z;
            };
        };
        return -1;
    };
});

$(document).on('click', '.show_btn', function() {
    $(this).parent().children(".craftable_res > div").toggleClass("hide")
});


/*$.getJSON("../l2_craft/json/recipes_armor.json", function(data) {
        var content = "";
        var armor = data.armor;
        var i, j;
        for (i = 0; i < armor.length; i++) {
            content += "Предмет: " + armor[i][0] + "<br><br>";
            for (j = 0; j < armor[i][1].length; j++) {
                content += armor[i][1][j][0] + " - " + armor[i][1][j][1] + " шт.<br>";
                for (var k = 0; k < resources.length; k++) {
                    if (resources[k][0] == armor[i][1][j][0]) {
                        content += "<div class='hide'>";
                        for (var l = 0; l < resources[k][1].length; l++) {
                            content += "&nbsp;&nbsp;&nbsp;&nbsp;" + resources[k][1][l][0] + " " +
                                (resources[k][1][l][1] * armor[i][1][j][1]) + " шт.<br>";
                        };
                        content += "</div>";
                    };
                };
            };
            content += "<hr>";
        };
        $("#info").append(content);

        function check_craftable(resource) {
            for (var z = 0; z < craftable_resources.length; z++) {
                if (resource == craftable_resources[z]) {
                    return true;
                };
            };
            return false;
        };
});*/