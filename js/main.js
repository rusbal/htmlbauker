var userAgent = window.navigator.userAgent;
if (userAgent.indexOf("Android") >= 0) {
	var androidversion = parseFloat(userAgent.slice(userAgent.indexOf("Android") + 8));
}
$(document).ready(function() {
	startup();
	$('.slick-slide #map2').height($('.slick-slide:first-child img').height());
	$('.fancybox-media').fancybox({
		openEffect  : 'none',
		closeEffect : 'none',
		helpers : {
			media : {}
		}
	});
	$('.fancyboxImg').fancybox({});

	$(".fancy-ajax").fancybox({
		fitToView	: true,
		width		: '100%',
		height		: '70%',
		autoSize	: true,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		cache: false
	});

    $('.mke-arrow').click(function() {
        $('html, body').animate({
            scrollTop: $(".greySec").offset().top
        }, 2000);
    });
});
$(window).resize(function() {
	resizeHero();
	$('.slick-slide #map2').height($('.slick-slide:first-child img').height());
});


function startup() {
	closeNavMobile();
	startFullWidthSlider();
	resizeHero();
	//immotypeswitch();
	paralaxI();
	chiudiNavMobile();

    $(".wohnungsinfo-btn").click( function() {
        _gaq.push(['_trackEvent', 'Clicks', 'Infos', 'User clicked the "Wohnungsinfos Button"']);
    });

    $(".wohnungsgrundriss-btn").click( function() {
        _gaq.push(['_trackEvent', 'Clicks', 'Grundriss', 'User clicked the "Wohnungsgrundriss Button"']);
    });

	$('.slider-for').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		asNavFor: '.slider-nav'
	});
	$('.slider-nav').slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		asNavFor: '.slider-for',
		dots: false,
		centerMode: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					dots: false,
					centerMode: false
				}
			}
		]
	});


	$('.hover').hover(function() {
		$(this).addClass('flip');
	}, function() {
		$(this).removeClass('flip');
	});
	$('.res-slider').slider().on('slideStop', function(ev) {
		$('.res-slider-img img').hide().removeClass('active');
		$('.res-slider-img img.res-' + ev.value).fadeIn().addClass('active');
		$('.res-lista div').removeClass('active');
		$('.res-lista div.ico-' + ev.value).addClass('active');
	});
}


function chiudiNavMobile() {
	$('.navbar ul li a').click(function() {
		$('.btn-navbar').addClass('collapsed');
		$('.navbar-collapse').removeClass('in').addClass('collapse').css('height', '0');
	});
}

function immotypeswitch() {
	$('.immotypeswitch').click(function() {
		var id = $(this).attr('data-id');
		$('.immotypebox').hide();
		$('.immotypebox[data-id=' + id + ']').fadeIn();
	});
}


function closeNavMobile() {
	$('.navbar ul li a').click(function() {
		$('.btn-navbar').addClass('collapsed');
		$('.navbar-collapse').removeClass('in').addClass('collapse').css('height', '0');
	});
}

function startFullWidthSlider() {
	$('a.lead-link').bind('click', function(e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: $(this.hash).offset().top - 60
		}, 1500);
	});
	if ($('#full-width-slider').length) {
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		$('#full-width-slider').css({
			'height': windowHeight,
			'width': windowWidth
		});
		if ($('body').hasClass("home")) {
			var transitionEffekt = 'move';
		} else {
			var transitionEffekt = 'fade';
		}
		$('#full-width-slider').royalSlider({
			arrowsNav: true,
			loop: true,
			keyboardNavEnabled: true,
			controlsInside: true,
			imageScaleMode: 'fill',
			controlNavigation: 'bullets',
			thumbsFitInViewport: false,
			navigateByClick: false,
			startSlideId: 0,
			numImagesToPreload: 2,
			autoPlay: {
				// autoplay options go gere
				enabled: true,
				pauseOnHover: true,
				delay: 8000
			},
			height: windowHeight,
			width: windowWidth,
			transitionType: transitionEffekt,
			globalCaption: false,
			slidesSpacing: 0,
			randomizeSlides: false,
			fadeinLoadedSlide: true,
			addActiveClass: true
		});
		$('#full-width-slider').css({
			'width': '100%'
		});
		var slider = $(".royalSlider").data('royalSlider');
		slider.ev.on('rsAfterContentSet', function(e, slideObject) {
			paralaxIRs();
		});
	}
}

function resizeHero() {
	var windowHeight = $(window).height();
	$('#full-width-slider').css({
		'height': windowHeight
	});
	if ($(window).width() >= 768) {
		$('#map_canvas, .mappa-overlay').css({
			'min-height': windowHeight
		});
		$('.royalSlider .rsImg').each(function() {
			var element = $(this);
			this.src = this.src.replace("-960x650.jpg", ".jpg");
		});
	} else {
		$('#map_canvas').css({
			'min-height': '300px'
		});
	}
}

function paralaxI() {
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return; // non attivare
	} else {
		var $window = $(window);
		$('section[data-type="background"]').each(function() {
			$(this).css('background-attachment', 'fixed').css('background-position', '50% -800px');
			var $bgobj = $(this); // assigning the object
			$(window).scroll(function() {
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!
				var yPos = -(($window.scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));
				var coords = '50% ' + yPos.toFixed(0) + 'px';
				// Move the background
				$bgobj.css({
					backgroundPosition: coords
				});
			});
		});
		document.createElement("article");
		document.createElement("section");
	}
}

function paralaxIRs() {
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return;
	} else {
		
		var $window = $(window);
		
					
		function scrollHandler() {		
			var $bgobj = $('.rsActiveSlide img.rsMainSlideImage, #map_canvas');
            if ($bgobj.length) {
                var yPos = (($window.scrollTop() - $bgobj.offset().top + parseInt($bgobj.css('margin-top'), 10)) / 1.4);
				
              if ($(window).scrollTop() + $(window).height() > $(document).height()) return;
              $bgobj.css({ top: yPos + 'px' });
			}		
		}

		$(window).on('scroll', function() {
			window.requestAnimationFrame(scrollHandler);
	   	});
	   	
	}
}
$(document).ready(function() {
	// process the form
	$(document).on('submit', 'form', function(event) {

		$('.form-group').removeClass('has-error'); // remove the error class
		$('.help-block').remove(); // remove the error text

		// get the form data
		// there are many ways to get this data using jQuery (you can use the class or id also)
		var formData = {
			'anrede'              : $('select[name=anrede]').val(),
			'vorname'              : $('input[name=vorname]').val(),
			'nachname'              : $('input[name=nachname]').val(),
			'email'             : $('input[name=email]').val(),
			'telefon'    : $('input[name=telefon]').val(),
			'bkid'    : $('input[name=bkid]').val(),
			'type'    : $('input[name=type]').val(),
			'strasse'    : $('input[name=strasse]').val(),
			'hausnummer'    : $('input[name=hausnummer]').val(),
			'plz'    : $('input[name=plz]').val(),
			'ort'    : $('input[name=ort]').val(),
			'land'    : $('select[name=land]').val()
		};

		var type=$('input[name=type]').val();

		// process the form
		$.ajax({
			type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
			url         : '/contact_progress.php', // the url where we want to POST
			data        : formData, // our data object
			dataType    : 'json', // what type of data do we expect back from the server
			encode          : true
		})
			// using the done promise callback
			.done(function(data) {

				if ( ! data.success && type == 'grundriss') {

					if (data.errors.vorname) {
						$('.vorname-group').addClass('has-error'); // add the error class to show red input
						$('.vorname-group').append('<div class="help-block">' + data.errors.vorname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.nachname) {
						$('.nachname-group').addClass('has-error'); // add the error class to show red input
						$('.nachname-group').append('<div class="help-block">' + data.errors.nachname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.email) {
						$('.email-group').addClass('has-error'); // add the error class to show red input
						$('.email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					if (data.errors.telefon) {
						$('.telefon-group').addClass('has-error'); // add the error class to show red input
						$('.telefon-group').append('<div class="help-block">' + data.errors.telefon + '</div>'); // add the actual error message under our input
					}
				} else if(! data.success && type == 'infos') {

					if (data.errors.anrede) {
						$('.anrede-group').addClass('has-error'); // add the error class to show red input
						$('.anrede-group').append('<div class="help-block">' + data.errors.anrede + '</div>'); // add the actual error message under our input
					}

					if (data.errors.vorname) {
						$('.vorname-group').addClass('has-error'); // add the error class to show red input
						$('.vorname-group').append('<div class="help-block">' + data.errors.vorname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.nachname) {
						$('.nachname-group').addClass('has-error'); // add the error class to show red input
						$('.nachname-group').append('<div class="help-block">' + data.errors.nachname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.email) {
						$('.email-group').addClass('has-error'); // add the error class to show red input
						$('.email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					if (data.errors.telefon) {
						$('.telefon-group').addClass('has-error'); // add the error class to show red input
						$('.telefon-group').append('<div class="help-block">' + data.errors.telefon + '</div>'); // add the actual error message under our input
					}

					if (data.errors.strasse) {
						$('.strasse-group').addClass('has-error'); // add the error class to show red input
						$('.strasse-group').append('<div class="help-block">' + data.errors.strasse + '</div>'); // add the actual error message under our input
					}

					if (data.errors.hausnummer) {
						$('.hausnummer-group').addClass('has-error'); // add the error class to show red input
						$('.hausnummer-group').append('<div class="help-block">' + data.errors.hausnummer + '</div>'); // add the actual error message under our input
					}

					if (data.errors.plz) {
						$('.plz-group').addClass('has-error'); // add the error class to show red input
						$('.plz-group').append('<div class="help-block">' + data.errors.plz + '</div>'); // add the actual error message under our input
					}

					if (data.errors.land) {
						$('.land-group').addClass('has-error'); // add the error class to show red input
						$('.land-group').append('<div class="help-block">' + data.errors.land + '</div>'); // add the actual error message under our input
					}

					if (data.errors.ort) {
						$('.ort-group').addClass('has-error'); // add the error class to show red input
						$('.ort-group').append('<div class="help-block">' + data.errors.ort + '</div>'); // add the actual error message under our input
					}

				} else if(! data.success && type == 'kontakt') {

					if (data.errors.anrede) {
						$('.anrede-group').addClass('has-error'); // add the error class to show red input
						$('.anrede-group').append('<div class="help-block">' + data.errors.anrede + '</div>'); // add the actual error message under our input
					}

					if (data.errors.vorname) {
						$('.vorname-group').addClass('has-error'); // add the error class to show red input
						$('.vorname-group').append('<div class="help-block">' + data.errors.vorname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.nachname) {
						$('.nachname-group').addClass('has-error'); // add the error class to show red input
						$('.nachname-group').append('<div class="help-block">' + data.errors.nachname + '</div>'); // add the actual error message under our input
					}

					if (data.errors.email) {
						$('.email-group').addClass('has-error'); // add the error class to show red input
						$('.email-group').append('<div class="help-block">' + data.errors.email + '</div>'); // add the actual error message under our input
					}

					if (data.errors.telefon) {
						$('.telefon-group').addClass('has-error'); // add the error class to show red input
						$('.telefon-group').append('<div class="help-block">' + data.errors.telefon + '</div>'); // add the actual error message under our input
					}

					if (data.errors.strasse) {
						$('.strasse-group').addClass('has-error'); // add the error class to show red input
						$('.strasse-group').append('<div class="help-block">' + data.errors.strasse + '</div>'); // add the actual error message under our input
					}

					if (data.errors.hausnummer) {
						$('.hausnummer-group').addClass('has-error'); // add the error class to show red input
						$('.hausnummer-group').append('<div class="help-block">' + data.errors.hausnummer + '</div>'); // add the actual error message under our input
					}

					if (data.errors.plz) {
						$('.plz-group').addClass('has-error'); // add the error class to show red input
						$('.plz-group').append('<div class="help-block">' + data.errors.plz + '</div>'); // add the actual error message under our input
					}

					if (data.errors.land) {
						$('.land-group').addClass('has-error'); // add the error class to show red input
						$('.land-group').append('<div class="help-block">' + data.errors.land + '</div>'); // add the actual error message under our input
					}

					if (data.errors.ort) {
						$('.ort-group').addClass('has-error'); // add the error class to show red input
						$('.ort-group').append('<div class="help-block">' + data.errors.ort + '</div>'); // add the actual error message under our input
					}

				}

				if(data.success && type == 'infos') {
					$('form').prepend('<div class="alert alert-success">' + data.message + '</div>');
					if(data.expose != false) {
						window.location.href = '/download_bk.php?bkid='+data.expose;
					}
				}

				if(data.success && type == 'grundriss') {
					$('form').prepend('<div class="alert alert-success">' + data.message + '</div>');
					if(data.grundriss != false) {
						window.location.href = '/download_grundriss_bk.php?bkid='+data.grundriss;
					}
				}

				if(data.success && type == 'kontakt') {
					$('form').prepend('<div class="alert alert-success">' + data.message + '</div>');
				}

				if(data.success) {
					setTimeout(function() {
						$.fancybox.close();
					}, 2000);
				}
			});

		// stop the form from submitting the normal way and refreshing the page
		event.preventDefault();
	});
});

