var textarea = document.getElementById("text");
var button = document.getElementById("btn");
var score = document.getElementById("score");
var kincadescore = document.getElementById("kincadescores");
var displayword = document.getElementById("words");
var displaysyllable = document.getElementById("syllable");
var displaytotalsentence = document.getElementById("totalsentence");
var displaysentence = document.getElementById("sentence");
var displaysubheading = document.getElementById("subheading");
var displaytextlength = document.getElementById("textlength");

// formula to count readability
function calculateScore(totalSentences, totalWords, totalSyllables) {
  return (
    206.835 -
    1.015 * (totalWords / totalSentences) -
    84.6 * (totalSyllables / totalWords)
  );
}

function calculateKincade(totalSentences, totalWords, totalSyllables) {
  return (
    0.39 * (totalWords / totalSentences) +
    11.8 * (totalSyllables / totalWords) -
    15.59
  );
}

//javascript library
// function to get or count the syllable in the text
function countSyllable(word) {
  word = word.toLowerCase();
  if (word.length <= 3) {
    return 1;
  }
  word = word.replace(/(?:[^laeiouy] |es| |ed|[^laeiouy]e)$/, " ");
  word = word.replace(/^y/, " ");

  var syl = word.match(/[aeiouy]{1,2}/g);
  // console.log("syl", syl.length);
  return (syl && syl.length) || 0;
}

// check reability button events
button.addEventListener("click", function () {
  if (textarea.value === "") {
    alert("Please write atleast 15 words to check Readability Score");
    location.reload();
  } else {
    var totalSentences = 0,
      totalWords = 0,
      totalSyllables = 0;

    var text = textarea.value;
    var displaytext = text.split("\n").join(" ");

    var words = displaytext.split(" ");
    total = words.length;
    var myCount = 0;
    // var myHeadingList = ['h1','h2','h3','h4','h5','h6'];
    [...words].forEach((c) => {
      if (c === "" || c === "\n") {
        myCount++;
      }
    });

    var set = words;
    // console.log("myCount", myCount);

    //to check if there is any transition words
    const listOfTransitionWords = [
      "but",
      "and",
      "so",
      "because",
      "or",
      "further",
      "moreover",
      "besides",
    ];
    var count = 0;
    [...set].forEach((c) => {
      if (listOfTransitionWords.includes(c)) {
        count++;
      }
    });

    console.log("count", count);

    var totalWithoutSpaces = total - myCount;
    console.log("totalWithoutSpaces", totalWithoutSpaces);

    var sentences = text.split(/[\\.!\?]/);
    // console.log("sentences", sentences);
    sentences.length = sentences.length - 1;
    totalSentences = sentences.length;

    //to count the sentence in text
    sentences.forEach(function (sentence) {
      var word = "";
      for (var i = 0; i < sentence.length; i++) {
        word += sentence[i];
        if (sentence[i] == " ") {
          totalWords++;
          totalSyllables += countSyllable(word);
          word = "";
        }
      }

      if (word.length > 0) {
        totalWords++;
        totalSyllables += countSyllable(word);
        //   console.log("syllabus", totalSyllables);
        word = "";
      }
    });

    var calculate = calculateScore(totalSentences, totalWords, totalSyllables);
    var calculateEase = calculate.toFixed(2);

    var calculateKincad = calculateKincade(
      totalSentences,
      totalWords,
      totalSyllables
    );

    var calculate_Kincade = calculateKincad.toFixed(2);

    //flesch score display
    score.innerHTML = calculateEase;
    //flesch kincade score
    kincadescore.innerHTML = calculate_Kincade;
    // total words display
    displayword.innerHTML = "Total words: " + totalWithoutSpaces;
    // total syllable display
    displaysyllable.innerHTML = "Total Syllable: " + totalSyllables;
    // total sentences
    displaytotalsentence.innerHTML = "Total Sentence: " + totalSentences;

    // display sentence length
    Sentencelength = totalWords / totalSentences;
    // console.log("wd",Sentencelength);
    if (Sentencelength > 15) {
      let lengthlong = " Highly readable content average 14 words per sentence";
      displaysentence.innerHTML = "Sentence Length:" + lengthlong;
    } else {
      let lengthlong = "Great !";
      displaysentence.innerHTML = "Sentence Length:" + lengthlong;
    }

    //display text total length
    if (totalWithoutSpaces > 400) {
      console.log("ss", totalWithoutSpaces);
      displaytextlength.innerHTML =
        "Text length: " +
        "The text contains " +
        totalWithoutSpaces +
        " words. Great job!";
    } else {
      displaytextlength.innerHTML =
        "Text length: " + "Your text length should be more than 400 words";
    }

    // display subheading length
    function subHeading() {
      if (totalWords > 350) {
        let subhead =
          "You are not using any subheading, although your text is rather long";
        displaysubheading.innerHTML = "Subheading Distribution: " + subhead;
      } else {
        let subhead = "Great Job ! you do need any subheadings ";
        displaysubheading.innerHTML = "Subheading Distribution: " + subhead;
      }
    }

    subHeading();
  }
});
