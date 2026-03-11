var src_links = [
  "src/AQMmqKAnZFuNHUwAlkvQW6BCvYVnP9giv4wOo5TsXIBq9oHvtOL2XlnhuEEMRufM63ojufKid9QLB8ELto44kRqy.mp4",
  "src/CAN_YOU_MEET_ME_HALFWAY.mp4",
  "src/RAAAAUUUUUHG_RAAUUUHG_RAUHG.mp4",
  "src/anarchs.mp4",
  "src/awawa.mp4",
  "src/ballbounce.mp4",
  "src/cat.mp4",
  "src/doyoureceivemyecho.mp4",
  "src/fall.mp4",
  "src/finalnights.mp4",
  "src/nightcore.mp4",
  "src/nyan.mp4",
  "src/put_that_there.mp4",
  "src/sanfran.mp4",
  "src/seal.mp4",
  "src/staked.mp4",
  "src/thorn_voicemail.ogg",
  "src/xeonpr.mp4"
];
var all_the_stuff = gif_bgs.concat(gif_center).concat(gif_cities).concat(gif_yyyyyyy);
var length_center = all_the_stuff.length;
var text_seen = {};
var text_all = [];
var text_src = text_random.concat(text_yyyyyyy);
for (var i = 0; i < text_src.length; i++) {
  if (!text_seen[text_src[i]]) {
    text_seen[text_src[i]] = true;
    text_all.push(text_src[i]);
  }
}

var text_fonts = ["Helvetica Neue, Helvetica, Arial, sans-serif", "Georgia, serif", "Courier New, monospace", "Impact, fantasy", "Palatino, Book Antiqua, serif", "Trebuchet MS, sans-serif", "Arial Black, sans-serif", "Comic Sans MS, cursive"];
var text_weights = ["100", "300", "400", "700", "900"];
var text_styles = ["normal", "italic"];

var BG_INTERVAL = 40000;
var FASTLYFASTDFASASTDDSF = 2000;
var spawnedImages = 0;
var totalSpawned = 0;
var spawnedText = 0;
var MAX_TEXT = 100;
var MAX_IMAGES = 500;
var videoSpawned = false;

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function speeeeen(arr) {
  var deck = shuffle(arr), index = 0;
  return function() {
    if (index >= deck.length) { deck = shuffle(arr); index = 0; }
    return deck[index++];
  };
}

var nextLink = speeeeen(src_links);
var nextImg = speeeeen(all_the_stuff);
var nextTxt = speeeeen(text_all);

function spawnInViewport() {
  var $center = $("#center");
  var totalHeight = $center.height();

  var $imgs = $center.find("img");
  if ($imgs.length >= 1000) {
    $imgs.eq(Math.floor(Math.random() * $imgs.length / 2)).remove();
  }

  if (!videoSpawned && Math.random() < 0.05) {
    videoSpawned = true;
    $("<video>").attr({ src: Math.random() < 0.5 ? "src/put_that_there.mp4" : "src/ballbounce.mp4", loop: "", controls: "" }).css({
      position: "absolute",
      top: (Math.random() * totalHeight) + "px",
      left: (Math.random() * 100) + "%",
      transform: "translate(-50%, 0)",
      zIndex: Math.floor(Math.random() * 11) + 90,
      maxWidth: "400px"
    }).appendTo($center);
  }

  if($imgs.length <= MAX_IMAGES) {
    var count = Math.floor(Math.random() * length_center / 200) + 1;
    spawnedImages += count;
    totalSpawned += count;

    for (var i = 0; i < count; i++) {
      var $img = $("<img>").attr("src", nextImg()).addClass(randomImgClass()).css({
        position: "absolute",
        top: (Math.random() * totalHeight) + "px",
        left: (Math.random() * 100) + "%",
        transform: "translate(-50%, 0)",
        zIndex: Math.floor(Math.random() * 100)
      });
      if (Math.random() < 0.15) {
        var url = nextLink();
        $("<a>").attr({ href: url, target: "_blank" }).css({ position: "absolute", top: $img.css("top"), left: $img.css("left"), zIndex: 999999998 }).append($img.css({ position: "static" })).appendTo($center);
      } else {
        $img.appendTo($center);
      }
    }

    if (text_all.length > 0) {
      for (var t = 0; t < 2; t++) {
        if (spawnedText < MAX_TEXT && Math.random() < 0.5) {
          $("<div>").text(nextTxt()).addClass(randomTxtClass()).css({
            position: "absolute",
            top: (Math.random() * totalHeight) + "px",
            left: (Math.random() * 100) + "%",
            transform: "translate(-50%, 0)",
            zIndex: Math.floor(Math.random() * 100),
            whiteSpace: "nowrap"
          }).appendTo($center);
          spawnedText++;
        }
      }
    }
  }
}

var nextBg = speeeeen(all_the_stuff);
var nextBg2 = speeeeen(backgroundies);
function changeBg() {
  var src = Math.random() < 0.5 ? nextBg2() : nextBg();
  $("#background").css("background-image", "url(" + src + ")");

}

function onScroll() {
  var $center = $("#center");
  var vid = $center.find("video")[0];
  if (vid) {
    vid.muted = false;
    vid.play();
  }
}
function init() {
  changeBg();
  $("#center").css("height", ($(window).height() * 3) + "px");
  var target = Math.floor(Math.random() * 251) + 250;
  setInterval(changeBg, BG_INTERVAL);
  $(window).on("scroll", onScroll);
  function spawnBatch() {
    if ($("#center").find("img").length < target) {
      spawnInViewport();
      requestAnimationFrame(spawnBatch);
    }
  }
  requestAnimationFrame(spawnBatch);
}

$(document).ready(init);
