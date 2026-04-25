$(document).ready(function () {
    
    // --- PRELOADER HANDLING ---
    function hidePreloader() {
        const preloader = $("#preloader");
        if (preloader.length && preloader.css("visibility") !== "hidden") {
            preloader.css({
                "opacity": "0",
                "visibility": "hidden"
            });
            startHeroAnimation();
        }
    }

    // Hide preloader when everything is loaded
    $(window).on('load', function() {
        hidePreloader();
    });

    // Safety fallback: hide preloader after 3 seconds anyway
    setTimeout(hidePreloader, 3000);

    // Looping typewriter for hero heading
    function startHeroAnimation() {
        const heading = document.getElementById('hero-heading');
        const lead = document.querySelector('.hero .lead');
        const skillsText = document.querySelector('.hero .skills-text');
        const heroBtns = document.querySelector('.hero .delay-3');

        if (!heading) return;

        const line1 = "Hi, I'm ";
        const line2 = "Ashfah Ashraf"; // violet part
        const fullText = line1 + line2;

        // Build DOM structure once
        heading.innerHTML = '';
        heading.style.opacity = '1';

        let plainNode = document.createTextNode('');
        let violetSpan = document.createElement('span');
        violetSpan.className = 'text-violet';
        let violetNode = document.createTextNode('');
        let cursor = document.createElement('span');
        cursor.className = 'type-cursor';
        cursor.textContent = '|';

        violetSpan.appendChild(violetNode);
        heading.appendChild(plainNode);
        heading.appendChild(violetSpan);
        heading.appendChild(cursor);

        let isFirstRun = true;

        function typeLoop() {
            let idx = 0;

            // --- TYPING phase ---
            function type() {
                if (idx < line1.length) {
                    plainNode.textContent = line1.slice(0, idx + 1);
                } else {
                    violetNode.textContent = line2.slice(0, idx - line1.length + 1);
                }
                idx++;

                if (idx <= fullText.length) {
                    setTimeout(type, 70);
                } else {
                    // Fully typed — on first run, fade in the rest
                    if (isFirstRun) {
                        isFirstRun = false;
                        fadeIn(lead, 200);
                        fadeIn(skillsText, 600);
                        fadeIn(heroBtns, 1000);
                    }
                    // Wait 1s then erase
                    setTimeout(erase, 1000);
                }
            }

            // --- ERASING phase ---
            function erase() {
                let len = fullText.length;

                function del() {
                    if (len > 0) {
                        len--;
                        if (len >= line1.length) {
                            violetNode.textContent = line2.slice(0, len - line1.length);
                        } else {
                            violetNode.textContent = '';
                            plainNode.textContent = line1.slice(0, len);
                        }
                        setTimeout(del, 70); // same speed as typing
                    } else {
                        // Wait 500ms then type again
                        setTimeout(typeLoop, 500);
                    }
                }
                del();
            }

            type();
        }

        typeLoop();
    }

    function fadeIn(el, delay) {
        if (!el) return;
        setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, delay);
    }

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

    // --- NAVBAR SCROLL EFFECT ---
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // --- SCROLL REVEAL ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = $(entry.target);
            if (entry.isIntersecting) {
                el.addClass("show");
                
                // Clear any existing timeout
                if (el.data('timeout')) clearTimeout(el.data('timeout'));
                
                // Remove transition delay after animation finishes
                let to = setTimeout(() => { 
                    el.css("transition-delay", "0s"); 
                }, 1500);
                el.data('timeout', to);
                
            } else {
                // When element leaves the screen: Hide it again!
                // (Only if not hero section)
                if (!el.closest('.hero').length) {
                    if (el.data('timeout')) clearTimeout(el.data('timeout'));
                    el.removeClass("show");
                }
            }
        });
    }, { threshold: 0.1 });

    // Automatically add scroll-hidden and observe relevant elements
    $(".project-row, .timeline-item, .contact-animate, .about-animate, .scroll-hidden").each(function() {
        $(this).addClass("scroll-hidden");
        if (!$(this).css("transition-delay") || $(this).css("transition-delay") === "0s") {
            $(this).css("transition-delay", "0.2s");
        }
        observer.observe(this);
    });

    $(".skill-pill").each(function() {
        let index = $(this).index();
        $(this).addClass("scroll-hidden"); 
        $(this).css("transition-delay", (index * 0.1) + "s");
        observer.observe(this);
    });

    // Observe specific headings if they have the class
    $(".education-section h2, .skills-section h2, .contact-section h2, .skills-wrapper").each(function() {
        $(this).addClass("scroll-hidden");
        observer.observe(this);
    });

    // --- CONTACT FORM AJAX HANDLING ---
    $("#contactForm").on("submit", function (e) {
        e.preventDefault();
        
        let form = $(this);
        let btn = $("#submitBtn");
        let responseDiv = $("#formResponse");
        let responseMsg = responseDiv.find("p");
        
        // Show loading state
        btn.prop("disabled", true).text("Sending...");
        
        $.ajax({
            url: form.attr("action"),
            method: "POST",
            data: form.serialize(),
            headers: {
                "X-CSRFToken": $("[name=csrfmiddlewaretoken]").val()
            },
            dataType: "json",
            success: function (response) {
                responseDiv.removeClass("d-none").removeClass("text-danger").addClass("text-success");
                responseMsg.text("✔ " + response.message);
                form.trigger("reset");
                btn.prop("disabled", false).text("Send Message");
                
                setTimeout(() => { responseDiv.addClass("d-none"); }, 5000);
            },
            error: function (xhr) {
                responseDiv.removeClass("d-none").removeClass("text-success").addClass("text-danger");
                let errorMsg = xhr.responseJSON ? xhr.responseJSON.message : "✖ Error! Please try again.";
                responseMsg.text(errorMsg);
                btn.prop("disabled", false).text("Send Message");
            }
        });
    });

});
