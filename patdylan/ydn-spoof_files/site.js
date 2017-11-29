/* Initialize a global searchButton object to toggle CSS and visibility
for the Custom Google Search button */
var searchButton = {
  // When switchStatus is true, then the css is white style
  // When false, css is blue style.
  switchStatus: false,
  isVisible: false,
  switchOn: function() {
    $("#nav-search").css("background-color", "white");
    $("#nav-search").css("color", "#2882C8");
    $("#gs_tti50").css("background", "none");
    $("#gsc-i-id1").css("background", "none");
    searchButton.switchStatus = true;
  },
  switchOff: function() {
    $("#nav-search").css("background-color", "rgba(0, 0, 0, 0)");
    $("#nav-search").css("color", "white");
    searchButton.switchStatus = false;
  },
  overrideGoogleStyle: function() {
    $(".gsst_a").style = "display: none;";
    $("#gsc-i-id1").css("background", "none");
  },
  displayForm: function() {
    if (searchButton.isVisible) {
      return;
    } else {
      $(".search-box").toggle();
      searchButton.switchOn();
      $("#gs_tti50").css("background", "none");
      $("#gsc-i-id1").css("background", "none");
      $("#gs_id50").css("height", "100%");
      searchButton.isVisible = true;
    }
  },
  hideForm: function() {
    if (searchButton.isVisible) {
      $(".search-box").toggle();
      searchButton.switchOff();
      searchButton.isVisible = false;
      return;
    } else {
      return;
    }
  }
};

// Attach these functions when document is ready
$(document).ready(function() {
  $(".menu-link").bigSlide();
  $("#mobile-xc").bigSlideXC();
  $(".first-row").click(function() {
    $("#nav-search-left").toggle();
  });

  $(".popup").click(function() {
    var width = 575,
      height = 400,
      left = ($(window).width() - width) / 2,
      top = ($(window).height() - height) / 2,
      url = this.href,
      opts =
        "status=1" +
        ",width=" +
        width +
        ",height=" +
        height +
        ",top=" +
        top +
        ",left=" +
        left;

    window.open(url, "twitter", opts);

    return false;
  });

  // When someone clicks outside of the search box, hide the search box.
  $(document).click(function(event) {
    if (searchButton.isVisible) {
      var parents = $(event.target).parents();
      for (var i = 0; i < parents.length; i++) {
        if (parents[i].id === "site-navigation") {
          return;
        }
      }
      searchButton.hideForm();
    }
  });

  $("#nav-search").hover(
    function() {
      // When mouse starts hovering.
      searchButton.switchOn();
      // Form is pinned after you hover over the search button.
      // Only disappears when you click outside the area.
      searchButton.displayForm();
    },
    function() {
      // When mouse stops hovering.
      if (searchButton.isVisible) {
        // If the display form is visible, we don't want to remove
        // the white styling.
        return;
      } else {
        searchButton.switchOff();
      }
    }
  );

  // When you click on the search button, it displays the search box.
  $("#nav-search").click(function() {
    searchButton.displayForm();
  });
});
