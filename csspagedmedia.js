// takes the page object selector as input

var list = ["MARGINRULEtop-left-corner", 
            "MARGINRULEleft-top", 
            "MARGINRULEleft-middle", 
            "MARGINRULEleft-bottom", 
            "MARGINRULEbottom-left-corner", 
            "MARGINRULEbottom-left",
            "MARGINRULEbottom-center",
            "MARGINRULEbottom-right",
            "MARGINRULEbottom-right-corner",
            "MARGINRULEright-bottom",
            "MARGINRULEright-middle",
            "MARGINRULEright-top",
            "MARGINRULEtop-right-corner",
            "MARGINRULEtop-right",
            "MARGINRULEtop-center",
            "MARGINRULEtop-left"];

function setPageSize(el) { 
  var pageSize = $("@page").css("size");
  var sizeArr = pageSize.split(" ");
  var pageWidth = sizeArr[0];
  var pageHeight = sizeArr[1];
  console.log(pageWidth, pageHeight);
}

function cssPagedMedia(el) { 
  var styleSheets = document.styleSheets;
  for(var i = 0; i < styleSheets.length; i++){
    console.log(styleSheets[i].cssRules)
  }
  //setPageSize(el);
}

function createMarginBoxes(el) {
  $(".bookpreview").prepend("<p style='color: transparent;font-size:1pt;'>x</p>");

  $.each(list, function(ix, val) {
    el.prepend('<div class="' + val + '"><span></span></div>'); 
  }); 

  $.each(list, function(ix, val) {
    $("." + val).each( function() {
      var content = $(this).css("content");
      if (content != undefined) {
        content = content.replace(/^"/g, "").replace(/"$/g, "");
        $(this).find("span").text(content);
      }
      if (val.includes("top-left-corner") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-left");
        var myHeight = $(this).parent().find(".bookpage").css("margin-top");
        $(this).css("height", myHeight);
        $(this).css("width", mySize);
      } else if (val.includes("top-right-corner") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-right");
        var myHeight = $(this).parent().find(".bookpage").css("margin-top");
        $(this).css("height", myHeight);
        $(this).css("width", mySize);
      } else if (val.includes("bottom-left-corner") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-left");
        var myHeight = $(this).parent().find(".bookpage").css("margin-bottom");
        $(this).css("height", myHeight);
        $(this).css("width", mySize);
      } else if (val.includes("bottom-right-corner") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-right");
        var myHeight = $(this).parent().find(".bookpage").css("margin-bottom");
        $(this).css("height", myHeight);
        $(this).css("width", mySize);
      } else if (val.includes("MARGINRULEtop") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-top");
        var fullWidth = $(this).parent(".bookpreview").css("width");
        var marginL = $(this).parent().find(".bookpage").css("margin-left");
        var marginR = $(this).parent().find(".bookpage").css("margin-left");
        var myWidth = parseInt(fullWidth) - parseInt(marginL) - parseInt(marginR);
        $(this).css("height", mySize);
        $(this).css("width", myWidth);
        $(this).css("left", marginL);
        $(this).css("line-height", mySize);
      } else if (val.includes("MARGINRULEbottom") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-bottom");
        var fullWidth = $(this).parent(".bookpreview").css("width");
        var marginL = $(this).parent().find(".bookpage").css("margin-left");
        var marginR = $(this).parent().find(".bookpage").css("margin-left");
        var myWidth = parseInt(fullWidth) - parseInt(marginL) - parseInt(marginR);
        $(this).css("height", mySize);
        $(this).css("width", myWidth);
        $(this).css("left", marginL);
        $(this).css("line-height", mySize);
      } else if (val.includes("MARGINRULEleft") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-left");
        var fullHeight = $(this).parent(".bookpreview").css("height");
        var marginT = $(this).parent().find(".bookpage").css("margin-top");
        var marginB = $(this).parent().find(".bookpage").css("margin-bottom");
        var myHeight = parseInt(fullHeight) - parseInt(marginT) - parseInt(marginB);
        $(this).css("width", mySize);
        $(this).css("height", myHeight);
        $(this).css("top", marginT);
      } else if (val.includes("MARGINRULEright") == true) {
        var mySize = $(this).parent().find(".bookpage").css("margin-right");
        var fullHeight = $(this).parent(".bookpreview").css("height");
        var marginT = $(this).parent().find(".bookpage").css("margin-top");
        var marginB = $(this).parent().find(".bookpage").css("margin-bottom");
        var myHeight = parseInt(fullHeight) - parseInt(marginT) - parseInt(marginB);
        $(this).css("width", mySize);
        $(this).css("height", myHeight);
        $(this).css("top", marginT);
      } 
    });
  });
}