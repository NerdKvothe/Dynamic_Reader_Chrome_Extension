// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Speed Reading the selected text";
  var id =  chrome.contextMenus.create({
                "title": title, 
                "contexts":[context],
                "id": "context" + context
            });  
});

function displayWords(selectionText){
    var textToRead = selectionText;
    var counter = 0;
    var splittedText = textToRead.split(" ");
    
    if (counter < splittedText.length) {
        var wordToShow = splittedText[counter++];
        alert(wordToShow);
        document.getElementById('#wordToRead').innerHTML= "'" + wordToShow + "'";
        alert(selectionText);
        document.getElementById('#wordToRead').innerHTML= "";
        return wordToShow;
    }
    /*
    function splitWord(word) {
        var middleRedCharPosition = null;
        var leftRedCharPosition = null;
        var rightRedCharPosition = null;
        var isCharsNumberAPair = word.length % 2 === 0;
        var splittedWord = word.split(" ");
        
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
})(jQuery);;
*/
};


function onClickHandler(info, tab) {

    //alert( info.selectionText );

   chrome.windows.getCurrent(function(curWindow) {
      chrome.windows.create(
          {"url": "background.html",
           "focused": false//,
           //"top": Math.round(curWindow.top + 3/10 * curWindow.height),
           //"left": Math.round(curWindow.left + 3/10 * curWindow.width)//,
           //"width": Math.round(3/10 * curWindow.width ),
           //"height": Math.round(3/10 * curWindow.height)
           },
          function(newWindow) {
            readerId = newWindow.id;
            readerWindow = chrome.extension.getViews({"windowId": readerId})[0];

            curOptions = options;
            logOptions();

            // Fastest timeout == 1 ms (@ options.rate = 10.0)
            milliseconds = 10 / curOptions.rate;
            logUtterance(utterance, 0, sendReaderEvent);
          }
        );
        
        //var selectionedText = info.selectionText;
        
        chrome.tabs.query({ active: false, windowId: chrome.windows.WINDOW_ID_CURRENT }, function (tabs) {
            //alert(info.selectionText);
            displayWords(info.selectionText);
        });
        
    });

};

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);


