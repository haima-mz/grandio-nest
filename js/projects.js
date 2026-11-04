/* Grandio Interiors - project detail panel.
   Each project is one entry below. Edit text, info and gallery per project here.
   Text and info fields were taken from the matching grandiointeriors.com/portfolio/ pages. */
(function ($) {
  'use strict';

  // Shared copy used on the source site for every project page.
  var base = {
    about: [
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\u2019t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\u2019t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.'
    ],
    info: [
      ['Location', 'London, UK'],
      ['Style', 'Clean & Modern'],
      ['Service', 'Interior Redesign'],
      ['Space Type', 'Residential'],
      ['Status', 'Completed']
    ],
    brief: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\u2019t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\u2019t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
    result: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
    points: [
      'Nam libero tempore cum soluta nobis est eligendi optio',
      'Temporibus autem aut officiis debitis rerum',
      'Culpa qui officia deserunt mollitia animi laborum dolorum fuga',
      'Sed quia consequntur magni dolores eos qui ratione',
      'Vero eos et accusamus et iusto odio dignissimos'
    ]
  };

  // n = image number in img/portfolio (01..08); gallery = other image numbers.
  var list = [
    { slug: 'magna-park-house',      name: 'Magna Park House',      cat: 'Residential', n: 1, gallery: [2, 3, 4, 5] },
    { slug: 'richmond-penthouse',    name: 'Richmond Penthouse',    cat: 'Residential', n: 2, gallery: [3, 4, 5, 6] },
    { slug: 'chiswick-family-home',  name: 'Chiswick Family Home',  cat: 'Residential', n: 3, gallery: [4, 5, 6, 7] },
    { slug: 'high-street-apartment', name: 'High Street Apartment', cat: 'Residential', n: 4, gallery: [5, 6, 7, 8] },
    { slug: 'oxted-home-extension',  name: 'Oxted Home Extension',  cat: 'Residential', n: 5, gallery: [6, 7, 8, 1] },
    { slug: 'chai-coffee-bar',       name: 'Chai Coffee Bar',       cat: 'Hospitality', n: 6, gallery: [7, 8, 1, 2] },
    { slug: 'tagaree-group',         name: 'Tagaree Group',         cat: 'Commercial',  n: 7, gallery: [8, 1, 2, 3] },
    { slug: 'hotel-lavang-house',    name: 'Hotel Lavang House',    cat: 'Hospitality', n: 8, gallery: [1, 2, 3, 4] }
  ].map(function (p) { return $.extend({}, base, p); });

  var $panel = $('#project-detail'), $content = $('#pd-content'), $body = $('body'), lastFocus = null;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  function render(i) {
    var p = list[i], prev = list[(i + list.length - 1) % list.length], next = list[(i + 1) % list.length];
    var html = '' +
      '<div class="pd-hero" style="background-image:url(img/portfolio/' + pad(p.n) + '-large.jpg)">' +
        '<div class="pd-hero-overlay"><div class="container">' +
          '<span class="pd-kicker">' + p.cat + '</span>' +
          '<h1 id="pd-title">' + p.name + '</h1>' +
        '</div></div>' +
      '</div>' +
      '<div class="container pd-body">' +
        '<div class="row">' +
          '<div class="col-md-7"><h3>About the project</h3>' +
            p.about.map(function (t) { return '<p>' + t + '</p>'; }).join('') + '</div>' +
          '<div class="col-md-5"><h3>Information</h3><table class="pd-info"><tbody>' +
            p.info.map(function (r) { return '<tr><th>' + r[0] + ':</th><td>' + r[1] + '</td></tr>'; }).join('') +
          '</tbody></table></div>' +
        '</div>' +
        '<div class="row pd-gallery">' +
          p.gallery.map(function (g) {
            return '<div class="col-xs-6 col-md-3"><a href="img/portfolio/' + pad(g) + '-large.jpg" title="' + p.name + '" data-lightbox-gallery="pd">' +
                   '<img src="img/portfolio/' + pad(g) + '-small.jpg" class="img-responsive" alt="' + p.name + '"></a></div>';
          }).join('') +
        '</div>' +
        '<div class="row">' +
          '<div class="col-md-6"><h3>The Brief</h3><p>' + p.brief + '</p></div>' +
          '<div class="col-md-6"><h3>The Result</h3><p>' + p.result + '</p>' +
            '<ul class="pd-points">' + p.points.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
        '</div>' +
      '</div>' +
      '<div class="pd-cta text-center"><div class="container">' +
        '<h2>Get in touch to planning your place today.</h2>' +
        '<a class="btn btn-custom btn-lg" href="https://wa.me/919961616509" rel="noopener">Schedule a Chat</a>' +
      '</div></div>' +
      '<div class="container pd-nav">' +
        '<a href="#" data-go="' + prev.slug + '">&larr; Previous Project<span>' + prev.name + '</span></a>' +
        '<a href="#" data-go="' + next.slug + '" class="pd-next">Next Project &rarr;<span>' + next.name + '</span></a>' +
      '</div>';
    $content.html(html);
    $content.find('.pd-gallery a').nivoLightbox({ effect: 'slideDown', keyboardNav: true });
    $panel.scrollTop(0);
  }

  function indexOf(slug) {
    for (var i = 0; i < list.length; i++) { if (list[i].slug === slug) { return i; } }
    return -1;
  }

  function open(slug) {
    var i = indexOf(slug); if (i < 0) { return; }
    if (!$panel.hasClass('is-open')) { lastFocus = document.activeElement; }
    render(i);
    $panel.addClass('is-open').attr('aria-hidden', 'false');
    $body.addClass('pd-lock');
    $panel.find('.pd-close').trigger('focus');
  }

  function close() {
    $panel.removeClass('is-open').attr('aria-hidden', 'true');
    $body.removeClass('pd-lock');
    if (lastFocus) { $(lastFocus).trigger('focus'); }
  }

  $(document).on('click', 'a[data-project]', function (e) { e.preventDefault(); open($(this).data('project')); });
  $(document).on('click', '#project-detail [data-go]', function (e) { e.preventDefault(); open($(this).data('go')); });
  $panel.on('click', '.pd-close', close);
  $(document).on('keydown', function (e) { if (e.key === 'Escape' && $panel.hasClass('is-open') && !$('.nivo-lightbox-overlay.nivo-lightbox-open').length) { close(); } });
})(jQuery);
