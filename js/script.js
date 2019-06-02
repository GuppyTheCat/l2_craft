$.ajaxSetup({
    async: false
});

var resources, craftable_resources, crafted_item;
$.getJSON("../l2_craft/json/recipes_resources.json", function(res_data) {
    resources = res_data.resources;
});
$.getJSON("../l2_craft/json/craftable_resources.json", function(craft_res_data) {
    craftable_resources = craft_res_data.resources;
});

$.ajaxSetup({
    async: true
});

$(document).on('click', '.item-link', function() {
    crafted_item = $(this).text();
    $(".item-list").toggleClass("hide");
    $(".item-recipe").toggleClass("hide");

    $.getJSON("../l2_craft/json/recipes_items.json", function(data) {
        var content = "";
        var items = data.items;
        var i, j;

        for (i = 0; i < items.length; i++) {
            var regex = new RegExp(crafted_item, 'gi')
            if (regex.test(items[i][0])) {
                break;
            };
        };
        content += "<img src='" + items[i][2] + "'/>" + items[i][0] + "<br><br>";
        for (j = 0; j < items[i][1].length; j++) {
            var craft_res_pos = check_craftable(items[i][1][j][0]);
            if (craft_res_pos == -1) {
                content += items[i][1][j][0] + " - " + items[i][1][j][1] + " шт.<br>";
            } else {
                content += "<div class='craftable_res'>" + items[i][1][j][0] + ' - ' + items[i][1][j][1] +
                    " шт. <button class='btn default show_btn font-weight-bold'>+</button><br>";
                content += "<div class='hide'>";
                for (var l = 0; l < resources[craft_res_pos][1].length; l++) {
                    content += "&nbsp;&nbsp;&nbsp;&nbsp;" + resources[craft_res_pos][1][l][0] + " " +
                        (resources[craft_res_pos][1][l][1] * Math.ceil(items[i][1][j][1] / resources[craft_res_pos][2])) + " шт.<br>";
                };
                content += "</div></div>";
            };
        };
        $(".item-recipe").append(content);




        /*var result = "";*/
        var arr = items[i][1].slice();
        for (j = 0; j < items[i][1].length; j++) {
            var craft_res_pos = check_craftable(items[i][1][j][0]);
            if (craft_res_pos == -1) {
                /*result += items[i][1][j][0] + " - " + items[i][1][j][1] + " шт.\n";*/
            } else {
                /*result += items[i][1][j][0] + " - " + items[i][1][j][1] + " шт.\n";
                result += bubble(i, j, craft_res_pos);*/
                arr[j].push(bubble_arr(i, j, craft_res_pos));
            }
        };

        /*function bubble(i, j, craft_res_pos) {
            var res = "";
            for (var l = 0; l < resources[craft_res_pos][1].length; l++) {
                res += "\t" + resources[craft_res_pos][1][l][0] + " " +
                    (resources[craft_res_pos][1][l][1] * Math.ceil(items[i][1][j][1] / resources[craft_res_pos][2])) + " шт.\n";
            };
            return res;
        }*/

        function bubble_arr(i, j, craft_res_pos) {
            var res = [];
            for (var l = 0; l < resources[craft_res_pos][1].length; l++) {
                var bubble_arr_res = resources[craft_res_pos][1][l][0];
                var bubble_arr_res_quant = resources[craft_res_pos][1][l][1] * Math.ceil(items[i][1][j][1] / resources[craft_res_pos][2]);
                var bubble_craft_res_pos = check_craftable(bubble_arr_res);
                if (bubble_craft_res_pos == -1) {
                    res.push([bubble_arr_res, bubble_arr_res_quant]);
                } else {
                    res.push([bubble_arr_res, bubble_arr_res_quant, bubble_arr(i, j, bubble_craft_res_pos)]);
                }
            };
            return res;
        }
        console.log(arr);





        function check_craftable(resource) {
            for (var z = 0; z < craftable_resources.length; z++) {
                if (resource == craftable_resources[z]) {
                    return z;
                };
            };
            return -1;
        };
    });
});

$(document).on('click', '.show_btn', function() {
    $(this).parent().children(".craftable_res > div").toggleClass("hide");
});



/*$.getJSON("../l2_craft/json/recipes_items.json", function(data) {
    var content = "";
    var items = data.items;
    var i, j;
    for (i = 0; i < items.length; i++) {
        content += "Предмет: " + items[i][0] + "<br><br>";
        for (j = 0; j < items[i][1].length; j++) {
            var craft_res_pos = check_craftable(items[i][1][j][0]);
            if (craft_res_pos == -1) {
                content += items[i][1][j][0] + " - " + items[i][1][j][1] + " шт.<br>";
            } else {
                content += "<div class='craftable_res'>" + items[i][1][j][0] + ' - ' + items[i][1][j][1] +
                    " шт. <button class='btn default show_btn font-weight-bold'>+</button><br>";
                content += "<div class='hide'>";
                for (var l = 0; l < resources[craft_res_pos][1].length; l++) {
                    content += "&nbsp;&nbsp;&nbsp;&nbsp;" + resources[craft_res_pos][1][l][0] + " " +
                        (resources[craft_res_pos][1][l][1] * Math.ceil(items[i][1][j][1]/resources[craft_res_pos][2])) + " шт.<br>";
                };
                content += "</div></div>";
            };
        };
        content += "<hr>";
    };
    $(".item-recipe").append(content);

    function check_craftable(resource) {
        for (var z = 0; z < craftable_resources.length; z++) {
            if (resource == craftable_resources[z]) {
                return z;
            };
        };
        return -1;
    };
});*/