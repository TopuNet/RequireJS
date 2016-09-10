


define(["app/UserControl", "lib/jquery.min"], function() {
    var page_name = $("#script_page").attr("page");
    switch (page_name) {
        case "index":
            require(["app/index"], function($obj) {
                $obj.init();
            });
            break;
        case "contact":
            require(["app/contact"], function($obj) {
                $obj.init();
            });
            break;
    }
});
