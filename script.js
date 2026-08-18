document.addEventListener('DOMContentLoaded', function () {

    // --- Stat counter animation ---
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

    // --- Open Charge Map: live network stats ---
    var totalEl = document.getElementById('totalChargers');
    var fastEl = document.getElementById('fastChargers');
    var opsEl = document.getElementById('networkOperators');
    if (totalEl && fastEl && opsEl) {
        fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=GB&latitude=54.5&longitude=-2&distance=500&distanceunit=Miles&maxresults=500&compact=true&verbose=false&key=')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                totalEl.textContent = data.length;
                var fastCount = 0;
                var operators = {};
                data.forEach(function (poi) {
                    if (poi.Connections) {
                        poi.Connections.forEach(function (c) {
                            if (c.PowerKW && c.PowerKW >= 50) fastCount++;
                        });
                    }
                    if (poi.OperatorInfo && poi.OperatorInfo.Title) {
                        operators[poi.OperatorInfo.Title] = true;
                    }
                });
                fastEl.textContent = fastCount;
                opsEl.textContent = Object.keys(operators).length;
            })
            .catch(function () {
                totalEl.textContent = 'N/A';
                fastEl.textContent = 'N/A';
                opsEl.textContent = 'N/A';
            });
    }

    // --- Site search across pages ---
    window.handleSearch = function (e) {
        e.preventDefault();
        var input = e.target.querySelector('input[type="search"]');
        if (!input) return false;
        var q = input.value.trim().toLowerCase();
        if (!q) return false;

        var pages = [
            { title: 'Home', url: 'index.html', keywords: 'electric vehicle ev charging terracharge sustainable future insights gateway' },
            { title: 'Services', url: 'services.html', keywords: 'installation repair maintenance charging port battery diagnostics motor drivetrain quote booking certified electrician' },
            { title: 'Level 1 & 2 Installations', url: 'level-installations.html', keywords: 'home charging level 1 level 2 wallbox installation electrician 240v 120v outlet' },
            { title: 'Charger Locator Map', url: 'charger-locator.html', keywords: 'charger map locator public charging station nearby open charge map' },
            { title: 'FAQ', url: 'faq.html', keywords: 'frequently asked questions support contact email help incentives environment' },
            { title: 'Blog', url: 'blog.html', keywords: 'news tips stories electric cars charging guide community' },
            { title: 'Support', url: 'support.html', keywords: 'contact help email form message support team' },
            { title: 'All About Electric Cars', url: 'electric-cars.html', keywords: 'bev phev hev fcev battery electric plug-in hybrid fuel cell types benefits maintenance future myths environmental impact' },
            { title: 'EV Battery Basics', url: 'ev-battery-basics.html', keywords: 'lithium-ion battery lifespan care charging degradation recycling solid-state capacity range' },
            { title: 'EV Charging Guide', url: 'ev-charging-guide.html', keywords: 'level 1 level 2 dc fast charging speed connector type 2 ccs chademo cost tips home public' },
            { title: 'EV Incentives', url: 'ev-incentives.html', keywords: 'grant tax credit rebate uk government £3750 £1500 eligibility sustainability funding' },
            { title: 'EV Compare', url: 'ev-compare.html', keywords: 'compare tesla nissan hyundai volkswagen model range price seats filter' },
            { title: 'Community Stories', url: 'community-stories.html', keywords: 'share story owner experience journey tips challenges submit' }
        ];

        var results = pages.filter(function (p) {
            return p.title.toLowerCase().indexOf(q) >= 0 || p.keywords.indexOf(q) >= 0;
        });

        if (results.length === 1) {
            window.location.href = results[0].url;
        } else if (results.length > 1) {
            window.location.href = results[0].url;
        } else {
            window.location.href = '404.html';
        }
        return false;
    };
});
