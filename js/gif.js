var length_bgs = gif_bgs.length;
var gif_all_center = gif_center.concat(gif_cities);
var length_center = gif_all_center.length;
var length_text = text_random.length;

var text_fonts = ["Helvetica Neue, Helvetica, Arial, sans-serif", "Georgia, serif", "Courier New, monospace", "Impact, fantasy", "Palatino, Book Antiqua, serif", "Trebuchet MS, sans-serif", "Arial Black, sans-serif", "Comic Sans MS, cursive"];
var text_weights = ["100", "300", "400", "700", "900"];
var text_styles = ["normal", "italic"];

var BG_INTERVAL = 40000;
var FASTLYFASTDFASASTDDSF = 2000;
var spawnedImages = 0;
var totalSpawned = 0;
var videoSpawned = false;

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

var imgDeck = shuffle(gif_all_center);
var imgIdx = 0;
function nextImg() {
  if (imgIdx >= imgDeck.length) { imgDeck = shuffle(gif_all_center); imgIdx = 0; }
  return imgDeck[imgIdx++];
}

var txtDeck = shuffle(text_random);
var txtIdx = 0;
function nextTxt() {
  if (txtIdx >= txtDeck.length) { txtDeck = shuffle(text_random); txtIdx = 0; }
  return txtDeck[txtIdx++];
}

function spawnInViewport() {
  var scrollTop = $(window).scrollTop();
  var winHeight = $(window).height();
  var $center = $("#center");

  var minHeight = scrollTop + winHeight + FASTLYFASTDFASASTDDSF;
  if ($center.height() < minHeight) {
    $center.css("height", minHeight + "px");
  }

  var $imgs = $center.find("img");
  if ($imgs.length >= 1000) {
    $imgs.eq(Math.floor(Math.random() * $imgs.length / 2)).remove();
  }

  if (!videoSpawned && Math.random() < 0.05) {
    videoSpawned = true;
    $("<video>").attr({ src: "src/put_that_there.mp4", loop: "", controls: "" }).css({
      position: "absolute",
      top: (scrollTop + Math.random() * winHeight) + "px",
      left: (Math.random() * 100) + "%",
      transform: "translate(-50%, 0)",
      zIndex: Math.floor(Math.random() * 11) + 90,
      maxWidth: "400px"
    }).appendTo($center);
  }

  var shouldSpawn = Math.random() < length_center / 20;
  
  if($imgs.length <= 1000) {
    var count = Math.floor(Math.random() * length_center / 5) + 1;
    spawnedImages += count;
    totalSpawned += count;

    for (var i = 0; i < count; i++) {
      $("<img>").attr("src", nextImg()).css({
        position: "absolute",
        top: (scrollTop + Math.random() * winHeight) + "px",
        left: (Math.random() * 100) + "%",
        transform: "translate(-50%, 0)",
        zIndex: Math.floor(Math.random() * 100)
      }).appendTo($center);
    }

    if (length_text > 0 && Math.random() < 0.5) {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      $("<div>").text(nextTxt()).css({
        position: "absolute",
        top: (scrollTop + Math.random() * winHeight) + "px",
        left: (Math.random() * 100) + "%",
        transform: "translate(-50%, 0)",
        zIndex: Math.floor(Math.random() * 100),
        color: "rgb(" + r + "," + g + "," + b + ")",
        fontFamily: text_fonts[Math.floor(Math.random() * text_fonts.length)],
        fontWeight: text_weights[Math.floor(Math.random() * text_weights.length)],
        fontStyle: text_styles[Math.floor(Math.random() * text_styles.length)],
        fontSize: (Math.floor(Math.random() * 60) + 12) + "px",
        whiteSpace: "nowrap"
      }).appendTo($center);
    }
  }
}

function changeBg() {
  $("#background").css("background-image", "url(" + gif_bgs[Math.floor(Math.random() * length_bgs)] + ")");
}

function onScroll() {
  var $center = $("#center");
  var vid = $center.find("video")[0];
  if (vid) {
    vid.muted = false;
    vid.play();
  }

  var $imgs = $center.find("img");
  if ($imgs.length >= 50) {
    $imgs.eq(50).remove();
  }
  spawnInViewport();
}
function init() {
  changeBg();
  $("#center").css("height", ($(window).height() + FASTLYFASTDFASASTDDSF) + "px");
  spawnInViewport();
  setInterval(changeBg, BG_INTERVAL);
  $(window).on("scroll", onScroll);
}

$(document).ready(init);
