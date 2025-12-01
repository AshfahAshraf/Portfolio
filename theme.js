$(document).ready(function () {

    // Set initial theme
    if (localStorage.getItem("theme") === "light") {
        $("body").addClass("light-mode");
        $("#themeToggle i").removeClass("fa-sun").addClass("fa-moon");
    }

    // Toggle Theme
    $("#themeToggle").click(function () {

        $("body").toggleClass("light-mode");

        if ($("body").hasClass("light-mode")) {
            $("#themeToggle i").removeClass("fa-sun").addClass("fa-moon");
            localStorage.setItem("theme", "light");
        } else {
            $("#themeToggle i").removeClass("fa-moon").addClass("fa-sun");
            localStorage.setItem("theme", "dark");
        }
    });
});
