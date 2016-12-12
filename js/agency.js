// Agency Theme JavaScript

(function($) {
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function(){
            $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery); // End of use strict


    $(document).ready(function() {
// loading google API

      function loadAPIClientInterfaces() {
        gapi.client.load('youtube', 'v3', function() {
          handleAPILoaded();
        });
      }
      GET https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true
      $('#submitBtn').on('click', function(){
        $('#searchResults').empty();

        let searchText = $('#searchBox').val();
        let $query = $.getJSON('https://www.googleapis.com/youtube/v3/search' + searchText);

        $query.done((data) => {
          if ($query.status !== 200) {
              return;
          }
          // console.log(data);
          let results = data.Search;

          // Function to take JSON object and populate the HTML DOM
          breakDownSearchResults(results)

          $query.fail(function(err) {
            console.log(err);
          });
        })
      })

    // Iterate over results; create container Div; append to DOM
      const breakDownSearchResults = function(array) {

        // FOR LOOP example of populating the DOM with JSON elements

        // for (var i = 0; i < array.length; i++) {
        //   console.log(array[i]);
        //   let newResult = document.createElement( 'div' )
        //   $(newResult).addClass('result')
        //
        //   $('#searchResults').append("<h6>"+ array[i]["Title"] +"</h6>");
        //   $('#searchResults').append("<h6>"+ array[i]["Year"] +"</h6>");
        //   $('#searchResults').append("<img src='"+ array[i]["Poster"] + " ' />");
        // }

        // Higher Order Function that Creates each result container Div and Appends it to the DOM
        // Then calls populateResultDivs function to populate the individual result divs
        array.forEach( (result) => {
          let newResult = document.createElement( "div" )
          $(newResult).addClass("result")
          $("#searchResults").append( populateResultDivs(result, newResult))
          // console.log(result);
        })
      }

    // Populate result div with result specific info
      const populateResultDivs = function (obj, containerDiv) { // obj = data.Search[0].Title
        let title = obj.snippet.title     //using notation from google
        let poster = obj.snippet.thumbnails.(medium);    //....jpg

        $(containerDiv).append("<h4>" + title + "</h4>");
        $(containerDiv).append("<img class='poster' src='" + poster + "' alt='title' />");
        return containerDiv
      }



};
