document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    var mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('active');
        });
    }

    var statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        var animated = false;
        function animateStats() {
            if (animated) return;
            var statsSection = document.querySelector('.stats-section');
            if (!statsSection) return;
            var rect = statsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                animated = true;
                statNumbers.forEach(function (el) {
                    var text = el.textContent.trim();
                    var match = text.match(/^(\d+)/);
                    if (!match) return;
                    var target = parseInt(match[1], 10);
                    var suffix = text.replace(match[1], '');
                    var duration = 1500;
                    var start = performance.now();
                    function step(now) {
                        var progress = Math.min((now - start) / duration, 1);
                        var eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(target * eased) + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = text;
                        }
                    }
                    requestAnimationFrame(step);
                });
            }
        }
        window.addEventListener('scroll', animateStats);
        animateStats();
    }
});
