import $ from "jquery";

$(function() {

    //$(".panelContent").children(".panelPage:first").show();
    
    $(".nextButton").on("click", function() {
        let current = $(this).siblings(".panelContent").children(".panelPage:visible");
        let next = current.next(".panelPage");
        console.log(current, next);
        if (next.length) {
            current.hide();
            next.css("display", "flex");
        }
        else {
            console.log("error");
        }
    });
    
    $(".prevButton").on("click", function() {
    let current = $(this).siblings(".panelContent").find(".panelPage:visible");
    let previous = current.prev(".panelPage");
    if (previous.length) {
        current.hide();
        previous.css("display", "flex");
    }
    });

    $(".panelContent").each(function() {
        $(this).children(".panelPage").hide();  
        $(this).children(".panelPage:first").show();  
    });

});


