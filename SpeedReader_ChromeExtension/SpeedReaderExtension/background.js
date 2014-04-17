/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Speed Reader for Selected Text";
  var id =  chrome.contextMenus.create({
                "title": title, 
                "contexts":[context],
                "id": "context" + context
            });  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);


function onClickHandler(info, tab) {
    //var readerEvent = null;
    //var textToRead = info.selectionText;
    //var counter = 0;
    
    //chrome.tabs.executeScript({
    //    code:"var camada = document.createElement('div'); camada.insertBefore('body'); camada.id = 'camada'; var display = document.createElement('div'); display.appendChild('#camada'); display.id = 'display'; var word = document.createElement('p'); word.appendChild('display'); word.id = 'wordToRead'; word.insertedNode("+textToRead+");"
    //});

    chrome.windows.getCurrent(function(curWindow) {
      chrome.windows.create(
          {"url": "background.html",
           "focused": false,
           "top": Math.round(curWindow.top + 6/10 * curWindow.height),
           "left": curWindow.left,
           "width": curWindow.width,
           "height": Math.round(4/10 * curWindow.height)},
          function(newWindow) {
            ttsId = newWindow.id;
            ttsWindow = chrome.extension.getViews({"windowId": ttsId})[0];
          }
      );
    });

    

};
/*
document.addEventListener('DOMContentLoaded', function () {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < divs.length; i++) {
    divs[i].addEventListener('click', onClickHandler);
  }
});



var camada = document.createElement('div');
camada.insertBefore('body');
camada.id = 'camada';
var display = document.createElement('div');
display.appendChild('#camada');
display.id = 'display';
var word = document.createElement('p');
word.appendChild('display');
word.id = 'wordToRead';
word.insertedNode(textToRead);


    // Create a new window to the info page.
    chrome.windows.create({ url: url, width: 520, height: 660  });


function onClickHandler(info, tab) {
  var sText = info.selectionText;
  var url = "https://www.google.com/search?q=" + encodeURIComponent(sText);  
  window.open(url, '_blank');
};


chrome.contextMenus.create({
    "title": "Speed Reader for selected text",
    "contexts": ["selection"],
    "onclick" : clickHandler
    });

var clickHandler = function($) {


    chrome.tabs.executeScript(null,
        {code:"document.body.style.fontStyle='" + e.target.id + "'"});
    window.close();
  
  
    reader = {};
    reader.readerEvent = null;
    reader.textToRead = $.selectionText;
    reader.counter = 0;
    
    //reader.init = function() {
    //    startReadingBtn = $("#start-reading-btn");
    //    startReadingBtn.bind("click", reader.startReading);
    //},
    
    reader.startReading = function() {
        var overlay = $("#overlay");
        var closeOverlay = $("#closeOverlay");
        var content = $("#content");
        
        //overlay.unbind().bind("click", function(){
        //    reader.stopReadingEvent();
        //    overlay.toggle();
        //    content.removeClass("blur");
        //});
        
       
       closeOverlay.unbind().bind("click", function(){
           reader.stopReadingEvent();
           closeOverlay.toggle();
           overlay.toggle();
           content.removeClass("blur");
        });
        
        overlay.toggle();
        closeOverlay.toggle();
        content.addClass("blur");
            
        reader.startReadingEvent();
    };
    
    reader.startReadingEvent = function() {
        reader.textToRead = $("#textToRead").val().split(/\s/);
        var ppm = 1000 / ($("#ppm").val() / 60);
        reader.readerEvent = setInterval(reader.displayWords, ppm);
    };
    
    reader.stopReadingEvent = function() {
        clearInterval(reader.readerEvent);
        reader.readerEvent = null;
        reader.counter = 0;
        $("#wordToRead").html("");
    };
    
    reader.displayWords = function() {
        var textToRead = reader.textToRead;
                
        if (reader.counter < textToRead.length) {
            var wordToShow = textToRead[reader.counter++];
            wordToRead = $("#wordToRead");
            wordToRead.html(reader.splitWord(wordToShow));
            return;
        }
        
        reader.stopReadingEvent();
    };
    
    reader.splitWord = function(word) {
        var middleRedCharPosition = null;
        var leftRedCharPosition = null;
        var rightRedCharPosition = null;
        var isCharsNumberAPair = word.length % 2 === 0;
        var splittedWord = word.split("");
        var spanContainer = $("<span/>");
        
        if (isCharsNumberAPair) {
            leftRedCharPosition = (word.length / 2) - 1;
            rightRedCharPosition = leftRedCharPosition + 1;
            
            for (var i = 0 ; i < splittedWord.length ; i++) {
                var span = (i === leftRedCharPosition || i === rightRedCharPosition) ? $("<span/>").addClass("red") : $("<span/>");
                span.text(splittedWord[i]);
                spanContainer.append(span);
            }
        } else {
            middleRedCharPosition = (word.length - 1) / 2;
            
            for (var i = 0 ; i < splittedWord.length ; i++) {
                var span = (i === middleRedCharPosition) ? $("<span/>").addClass("red") : $("<span/>");
                span.text(splittedWord[i]);
                spanContainer.append(span);
            }
        }
        return spanContainer;
    };
*/
        //)(jQuery);;
    
    /*
    var url = e.pageUrl;
    var buzzPostUrl = "http://www.google.com/buzz/post?";

    if (e.selectionText) {
        // The user selected some text, put this in the message.
        buzzPostUrl += "message=" + encodeURI(e.selectionText) + "&";
    }

    if (e.mediaType === "image") {
        buzzPostUrl += "imageurl=" + encodeURI(e.srcUrl) + "&";
    }

    if (e.linkUrl) {
        // The user wants to buzz a link.
        url = e.linkUrl;
    }

    buzzPostUrl += "url=" + encodeURI(url);

    // Open the page up.
    chrome.tabs.create(
          {"url" : buzzPostUrl });
          
};

*/