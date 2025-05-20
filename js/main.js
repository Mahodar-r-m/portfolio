;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());

document.getElementById('footer-year').textContent = new Date().getFullYear();

// API to get Medium articles
// https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mahodar.majgaonkar
// Ref: https://stackoverflow.com/a/59308448

// Fetch medium articles
$.ajax({
	url: `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mahodar.majgaonkar`,
	method: 'get',
	success: function (response) {
		console.log(response.status);
		if (response.status == 'ok') {
			console.log('inside ok');
			var allMediumPosts = ``
			var sectionTitle = response.feed.title; // Fetching medium section title
			$('#mediumTitle').html(sectionTitle) // Displaying medium section title
			var allMediumPostsData = response.items // Fetching all articles on medium
			// console.log(response.items.length);
			allMediumPostsData.forEach(story => {
				// console.log('Story');
				// var options = { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' };
				// var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'long' };
				var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
				let pubDate = new Date(story.pubDate).toLocaleTimeString('en-IN', options)

				$('#blog_1 .posted_on').html(pubDate.split('at')[0])
				$('#blog_1 .blog-title').html(story.title)
				$('#blog_1 .blog-bg').css('background-image',`url(${story.thumbnail})`)
				$('#blog_1 .link').attr('href',story.link)
				// document.write(story.description)
				var blog_intro = `I walked down the street, my eyes scanning the array of man-made objects that surrounded me. There weren’t many natural things to see, except for the sky, which had turned gray.`
				$('#blog_1 .blog-description').html(blog_intro)
				
				// storyHTMLBox = `
				// <div class="col-md-4">
				// 	<div class="fh5co-blog animate-box">
				// 		<a href="#" class="blog-bg" style="background-image: url(images/portfolio-1.jpg);"></a>
				// 		<div class="blog-text">
				// 			<span class="posted_on">${pubDate}</span>
				// 			<h3><a href="#">${story.title}</a></h3>
				// 			<p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
				// 			<ul class="stuff">
				// 				<li><i class="icon-heart2"></i>249</li>
				// 				<li><i class="icon-eye2"></i>308</li>
				// 				<li><a href="${story.link}" target="_blank">Read More<i class="icon-arrow-right22"></i></a></li>
				// 			</ul>
				// 		</div> 
				// 	</div>
				// </div>`
				// allMediumPosts += storyHTMLBox
			});
			// console.log(allMediumPosts);
			// $('#allMediumPosts').html(allMediumPosts)

			// // Get HTML head element
			// var head = document.getElementsByTagName('HEAD')[0];
			// // Create new link Element
			// var link = document.createElement('link');
			// // set the attributes for link element
			// link.rel = 'stylesheet';
			// link.type = 'text/css';
			// link.href = '../css/style.css';
			// // Append link element to HTML head
			// head.appendChild(link);
		}
	}
})

// Fetch instagram data
// const axios = require('axios');

// const options = {
//   method: 'GET',
//   url: 'https://instagram28.p.rapidapi.com/media_info_v2',
//   params: {
//     short_code: 'CA_ifcxMjFR'
//   },
//   headers: {
//     'X-RapidAPI-Key': '6744ea41b9mshbec1c2880f169a6p1901cdjsn9359f6ba702a',
//     'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
//   }
// };

// // Get instagram user info
// $.ajax({
// 	url: `https://instagram28.p.rapidapi.com/user_info`,
// 	method: 'get',
// 	data: jQuery.param({user_name: 'mahodar.majgaonkar'}),
// 	// params: {
// 	// 	short_code: 'CA_ifcxMjFR'
// 	// },
// 	headers: {
// 		'X-RapidAPI-Key': '6744ea41b9mshbec1c2880f169a6p1901cdjsn9359f6ba702a',
// 		'X-RapidAPI-Host': 'instagram28.p.rapidapi.com'
// 	},
// 	success: function (response) {
// 		console.log(response);
// 	}
// })
