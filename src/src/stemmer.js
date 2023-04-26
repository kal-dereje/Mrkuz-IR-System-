import { suffixList }from "./affixDictionary/suffixList.js";
import { prefixList }from "./affixDictionary/prefixList.js";
import { toSades }from "./affixDictionary/toSades.js";
import { twoLetterList }from "./affixDictionary/twoLetterList.js";
import { alphabet }from "./affixDictionary/alphabet.js";
import { removeStopWord }from "./removeStopWord.js";
import { tokenization }from "./tokenization.js";


export const  stemmer= (words)=> {
  let word = removeStopWord(tokenization(words)).split(" "); //split the words and store it in array format
  let i = 0; //variable used for while loop

  while (i < word.length) {
    //check if the word is equal if we divide the word in to two and compare
    if (equalWord(word[i])) {
      i++;
      continue; //if it is equal no need to remove affixs
    }
    word[i] = removePrefix(word[i]); //removes prefix
    word[i] = removeInfix(word[i]); //removes infix
    word[i] = removeSuffix(word[i]); //removes suffix
    word[i] = endWithKabe(word[i]); //change last letter from kabe to sades

    i++;
  }

  return word;
}

// let doc1 =
//   "በሮች በሰው ሰዋሰው ልጆች ሰረሰረ የልጆቻችን ልጆቼ ገራገር እፅዋት ቅጠላቅጠሎች የየየየልጅ ልጆቹ በከበሮ በየሰው ሰዎቹ በየዕለቱ መረጃዎችን";
// let doc2 = "በየሰው የየሰው በሰው በሬዎች በሮቻችን ትናንሽ ቀያይ ጥቋቁር ነጫጭ ቅመማቅመም ቋንቋዬ በጎች በጎቻችን በረበረ ልጆቼን ልጆቻቸውን ምንጊዜም";
// let doc3 ="ውሻውምች ችግሮች ሰዋሰው ከርከሮ በየአይነት እጆቻቸው በበግ ቤት በግ ቤላ ከረሜላ ቢራቢሮዎች የሰዎቹ ፍራፍሬዎች እንደልጆች ፍራፍሬ ፍራሽ";
// let doc4 ="የኮከቦች ክምችቶች የየሰው የእንስሳት በአንድኛው በሁለተኛው በምድራችን በመርከበኞች የጨረቃ የሞት ልጆችን ፀሐይን እጁን የጭለማ እንቁላሉ";
// let doc5 ="እንቁራሪት ዜና ቤት መብት ፓርላማው ኢትዮጵያውያን ዜጎችን ኮሚቴው እንቁላላችን ስደተኞችንም በሴቶች ስራዎችን ግዛቶችን የኢትዮጲያዊያን";
// let doc6 ="በሀገራችን የፀደይና ከነጭፍሮቻቸው እስረኞቹ በጥበቃዎች ረዕሶች ተመራማሪዎች የመንግስትን ግለሰቦች ስደተኞች ዕንቁ እንቁላላችን እንደሰው የኢትዮጵያን";
// let doc7 ="አዲስ በኦሮሚያ ክልል ሸገር ከተማ የቤት ነዋሪዎች መልኩ ቤታቸው እየፈረሰባቸው ወርቃማ";
// let doc8 ="በሸገር ከተማ ሥር በሚገኙት ሰበታ፣ ቡራዩ፣ ለገጣፎ፣ ለገዳዲ፣ ሱሉልታ ኤር ሞጆ፣ ገላን እና ሌሎች አካባቢዎች ቤታቸው የፈረሰባቸው ነዋሪዎች፣ በአድሏዊ ሁኔታ እና ያለምንም ቅድመ ማስጠንቀቂያ ሕጋዊ የሆኑ ቤቶች ጭምር እንደፈረሰባቸው ለቢቢሲ ተናግረዋል።";



// console.log(stemmer("የቡድን የወንጀልን ወንጀልን መዋቅርን ውድድርን ጊዮርጊስን ቋንቋን ጸጥታን ሀገርን ሀይልን አማጺያን ትክክለኛውን በሰሜን የሰዎችን ኢትዮጲያን አቅሙን ድካሞን አባላትን  ተቋማት የልጆች ጉዳዩን በሰሜን ልጄን").join(" "));

// console.log(stemmer("ተቋማት የልጆች ጉዳዩን በሰሜን ልጄን ከቅርብ ከሩቅ ከድርጅት ከአማራ ከስራ ከቤት").join(" ")); 
// console.log(stemmer("የየየሰው በተማሩበት መሰረታዊ ክልላዊ  ሊፍጠር ለመረዳት ምክንያት የእለት ተእለት ዐይነት መርዳት በብዛት እዉነት ከትምህርት መስማት ባለአራት የካቲት ቀናት ሀገራት የጣት አካውንት").join(" "));
//  console.log(stemmer("አቅም በፍጹም በሁሉም አቅም ጎጃም ሰው ቱሪዝም ቻይናም").join(" "));

//equal word checker
function equalWord(word) {
  let wordLength = word.length;
  if (word.length % 2 == 0) {
    let wordOne = word.substring(0, wordLength / 2);
    let wordTwo = word.substring(wordLength / 2, wordLength);
    return wordOne == wordTwo ? true : false;
  }
  return false;
}

//prefix remover
function removePrefix(word) {
  let isPrefix = true;
  let wordLength = word.length;

  prefixList.forEach((prefix) => {
    let prefixLength = prefix.length;
    let ke = true;
    //if the prefix  is found at the begining of the word excute the code below
    if (word.indexOf(prefix) == 0) {
      let preRemoved = word.substring(
        word.indexOf(prefix) + prefixLength,
        wordLength
      );

      for (const suffix of suffixList) {
      
        if (suffix.length == 1 && prefix !='ከ' ) { // && word.lastIndexOf(suffix) < word.length - 1
          
          isPrefix =true
        }
        else if(prefix =='ከ' && word.indexOf(suffix)> 2 && preRemoved.length-suffix.length <3){
          console.log(word);
          isPrefix = false;
          break;
        }
        
        else if (
          // (suffix.length > 1 && suffix!='ች' )&&
          
          word.lastIndexOf(suffix) > 1 &&
          preRemoved.length <= 4 &&
          preRemoved.substring(0, preRemoved.lastIndexOf(suffix)).length < 3
        ) {
         
          isPrefix = false;
          break;
        }
      }
      if (isPrefix) {
        //if the second index of the word is not sebategna bet eg ሮ excute the code below
        // if (!toSades.hasOwnProperty(word[i][1])) {
        //copy letters that are left after removing prefix
        let letterLeft = word.substring(
          word.indexOf(prefix) + prefixLength,
          wordLength
        );
        //if letters left afeter removing prefix length >= 3 excute the code below
        if (letterLeft.length >= 3) {
          //if prefix length is one eg: የ  excute the code below

          if (prefixLength == 1) {
            // if (prefix == "ከ") {
            //   for (const key in alphabet) {
            //       if (alphabet[key][5] == word[1] ) {
            //         // ke = false;
            //       }
            //   }
            // }
            if (ke) {
              word = letterLeft; //  update/copy letters left after removing prefix
              word = stemmer(word); //recursivly check if there is double prefix eg የየ for የየሰው
            }

          } else word = letterLeft; // else update the word
        }
        //if letters left after removing prefix length < 3 eg የልጅ after removing will be ልጅ
        else if (letterLeft.length < 3) {
          //check if the letter left is foun in twoLetterLeft obeject update the word
          if (twoLetterList[letterLeft]) word = twoLetterList[letterLeft];
        }
      }
    }
  });

  return word;
}

//infix remover
function removeInfix(word) {
  let wordLength = word.length;

  for (const key in alphabet) {
    let rabe = alphabet[key][3];
    let sads = alphabet[key][5];
    if (word.indexOf(rabe) > 0 && word.indexOf(rabe) < wordLength - 1) {
      if (word[word.indexOf(rabe) + 1] == sads) word = word.replace(rabe, "");
    }
  }

  if (word.indexOf("ቋ") > 0 && word.indexOf("ቋ") < word.length - 1) {
    if (word[word.indexOf("ቋ") + 1] == "ቁ") word = word.replace("ቋ", "");
  }
  return word;
}

//suffix remover
function removeSuffix(word) {
  let suffixLength;
  //for case woch ,ch, chachen, ...  suffix
  //loop through the suffixlist
  suffixList.forEach((suffix) => {
    suffixLength = suffix.length;
    //if there is suffix in the word excute code bleow
    if (word.lastIndexOf(suffix) >= 2) {
      if (suffix.length == 1 && word.lastIndexOf(suffix) < word.length - 1) {

      } else if (
        suffix == "ኛው" ||
        suffix == "ኞች" ||
        suffix == "ኞቹ" ||
        suffix == "ኞችንም" ||
        suffix == "ኛሞች"
      ) {
        word = word.substring(0, word.lastIndexOf(suffix));
        let letter = word[word.length - 1];
        if (alphabet[word[word.length - 1]]) {
          for (const key in alphabet) {
            if (Object.hasOwnProperty.call(alphabet, key)) {
              key == letter
                ? (word = word.replace(word[word.length - 1], alphabet[key][5]))
                : null;
            }
          }
        }
        // } else if (suffix == "ኞች" || suffix == "ኞቹ" || suffix == "ኞችንም") {
        //   word = word.substring(0, word.lastIndexOf("ኞ") + 1);
        //   for (const key in alphabet) {
        //     if (Object.hasOwnProperty.call(alphabet, key)) {
        //       alphabet[key][6] == "ኞ"
        //         ? (word = word.replace(word[word.length - 1], alphabet[key][3]))
        //         : null;
        //     }
        //   }
      } else if (suffix == "ም" && word[word.length-1]== "ም") {
         
          let lastSecondIndex =word.length-2;        
        for (const key in alphabet) {
          
            if (alphabet[key][3] == word[lastSecondIndex])
             {
                word = word.substring(0,word.length-1);
                break
             } 
       }

        if ('ት' == word[lastSecondIndex])
                word = word.substring(0,word.length-1);
        //   let prevLetter = alphabet[word[word.length - 2]];
        //   if (!prevLetter) word = word.substring(0, word.length - 1);
        
      } else if (
        suffix == "ቻችን" ||
        suffix == "ቸው" ||
        suffix == "ችን" ||
        suffix == "ች" ||
        suffix == "ቹ" ||
        suffix == "ቼ" ||
        suffix == "ም" ||
        suffix == "ቻቸው" ||
        suffix == "ቻቸውን" ||
        suffix == "ቸውን" ||
        suffix == "ችሁን"
      ) {
        word = word.substring(0, word.lastIndexOf(suffix));
        let lastIndex = word.length - 1;

        let replaceLetter;
        if (word[lastIndex] == "ሞ") replaceLetter = "ማ";
        else replaceLetter = toSades[word[lastIndex]];
        if (!replaceLetter) {
          for (const key in alphabet) {
            if (Object.hasOwnProperty.call(alphabet, key)) {
              if (alphabet[key][3] == word[lastIndex])
                replaceLetter = alphabet[key][5];
            }
          }
        }

        word = word.replace(new RegExp(word[lastIndex] + "$"), replaceLetter);
      } else if (suffix == "ው") {
        if (!alphabet[word[word.length - 2]])
          word = word.substring(0, word.lastIndexOf(suffix));
      } 
      else if (suffix == "ዊ" && word[word.length - 1] == "ዊ"){
         word = word.substring(0, word.length-1)
         for (const key in alphabet) {
          if (alphabet[key][3] == word[word.length-1])
           {
            word = word.replace(
              new RegExp(word[word.length-1] + "$"),
              alphabet[key][5]
            );
           }
         }
      }
      else if (suffix == "ት" && word[word.length - 1] == "ት") {
        if (word.length > 3) {
         let lastIndex = word.length - 1;
         let  secondLastIndex = word.length - 2;
          for (const key in alphabet) {
        
              if (alphabet[key][3] == word[secondLastIndex]) {
                let replaceLetter = alphabet[key][5];
                word = word.substring(0, word.lastIndexOf(suffix));
                let newLastIndex = word.length - 1;
                word = word.replace(
                  new RegExp(word[newLastIndex] + "$"),
                  replaceLetter
                );
              }
            
          }
        }
      } else if (suffix == "ን" && word[word.length - 1] == "ን") {
       
       let lastSecondIndex = word.length - 2;
        
        for (const key in alphabet) {
          if (Object.hasOwnProperty.call(alphabet, key)) {
            if(alphabet[key][5] ==word[lastSecondIndex] || alphabet[key][6] ==word[lastSecondIndex]){
              word = word.substring(0,word.length-1)
            }
            
            else if (alphabet[key][4] == word[lastSecondIndex]) {
              
              word = word.substring(0, word.lastIndexOf(suffix));
              let replaceLetter = alphabet[key][5];
              let twoletter = word.replace(
                new RegExp(word[lastSecondIndex] + "$"),
                replaceLetter
              );
              word = word.replace(
                new RegExp(word[lastSecondIndex] + "$"),
                replaceLetter
              )
              
              
            }
            else if(alphabet[key][1] == word[lastSecondIndex]){
              
              word = word.substring(0, word.lastIndexOf(suffix));
              let replaceLetter = alphabet[key][5];
              word = word.replace(
                new RegExp(word[lastSecondIndex] + "$"),
                replaceLetter
              );
            }
            else if(alphabet[key][3] == word[lastSecondIndex] || word[lastSecondIndex] =="ቋ"){
              word = word.substring(0, word.lastIndexOf(suffix));
            }

           
            
          }
        }
      } else word = word.substring(0, word.lastIndexOf(suffix));
    }
  });
  return word;
}

//kabe to sades converter
function endWithKabe(word) {
  if (word.length > 2) {
    for (const key in alphabet) {
      if (Object.hasOwnProperty.call(alphabet, key)) {
        if (word[word.length - 1] == "ቁ") continue;
        else if (alphabet[key][1] == word[word.length - 1])
          word = word.replace(alphabet[key][1], alphabet[key][5]);
      }
    }
  }
  return word;
}


