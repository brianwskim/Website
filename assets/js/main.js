/*
    Prologue by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    var    $window = $(window),
        $body = $('body'),
        $nav = $('#nav');

    // Breakpoints.
        breakpoints({
            wide:      [ '961px',  '1880px' ],
            normal:    [ '961px',  '1620px' ],
            narrow:    [ '961px',  '1320px' ],
            narrower:  [ '737px',  '960px'  ],
            mobile:    [ null,     '736px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Nav.
        var $nav_a = $nav.find('a');

        $nav_a
            .addClass('scrolly')
            .on('click', function(e) {

                var $this = $(this);

                // External link? Bail.
                    if ($this.attr('href').charAt(0) != '#')
                        return;

                // Prevent default.
                    e.preventDefault();

                // Deactivate all links.
                    $nav_a.removeClass('active');

                // Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
                    $this
                        .addClass('active')
                        .addClass('active-locked');

            })
            .each(function() {

                var    $this = $(this),
                    id = $this.attr('href'),
                    $section = $(id);

                // No section for this link? Bail.
                    if ($section.length < 1)
                        return;

                // Scrollex.
                    $section.scrollex({
                        mode: 'middle',
                        top: '-10vh',
                        bottom: '-10vh',
                        initialize: function() {

                            // Deactivate section.
                                $section.addClass('inactive');

                        },
                        enter: function() {

                            // Activate section.
                                $section.removeClass('inactive');

                            // No locked links? Deactivate all links and activate this section's one.
                                if ($nav_a.filter('.active-locked').length == 0) {

                                    $nav_a.removeClass('active');
                                    $this.addClass('active');

                                }

                            // Otherwise, if this section's link is the one that's locked, unlock it.
                                else if ($this.hasClass('active-locked'))
                                    $this.removeClass('active-locked');

                        }
                    });

            });

    // Scrolly.
        $('.scrolly').scrolly();

    // Blog popup.
        var blogPopupScrollTop = 0;

        function openBlogPopup() {
            blogPopupScrollTop = window.scrollY || window.pageYOffset;
            document.body.classList.add('blog-popup-active');
            document.body.style.top = '-' + blogPopupScrollTop + 'px';
            $('#blog-popup').addClass('active');
        }

        function closeBlogPopup() {
            document.body.classList.remove('blog-popup-active');
            $('#blog-popup').removeClass('active');
            document.body.style.top = '';
            window.scrollTo(0, blogPopupScrollTop);
        }

        $(document).on('click', '#blog-link, #open-blog-popup', function(e) {
            e.preventDefault();
            openBlogPopup();
        });

        $(document).on('click', '#blog-popup-close, #blog-popup-overlay', function() {
            closeBlogPopup();
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'Escape' && $('#blog-popup').hasClass('active')) {
                closeBlogPopup();
            }
        });

    // Header (narrower + mobile).

        // Toggle.
            $(
                '<div id="headerToggle">' +
                    '<a href="#header" class="toggle"></a>' +
                '</div>'
            )
                .appendTo($body);

        // Header.
            $('#header')
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'header-visible'
                });

    // Contact form handler: validate email and open mailto to briankim.wk@gmail.com
        $(document).on('submit', '#contact-form', function(e) {
            e.preventDefault();
            var $email = $('#contact-email');
            var emailVal = $.trim($email.val());
            if (!emailVal) {
                $('#email-error').text('Email is required.').css('color', '#c00').show();
                $email.focus();
                return;
            }
            $('#email-error').hide();

            var name = $.trim($('#contact-name').val());
            var message = $.trim($('#contact-message').val());
            var subject = 'Website message from ' + (name || 'Anonymous');
            var body = 'Name: ' + (name || '') + '\n\n' + (message || '');
            var mailto = 'mailto:briankim.wk@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            window.location.href = mailto;
        });

})(jQuery);
