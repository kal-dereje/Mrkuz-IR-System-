import { stemmer } from "./stemmer.js";
import { documents } from "./documents/documents.js";
//collection of documents
let documentCollection = {};

const regex = /\s+/g;

for (const key in documents)
 { documentCollection[key] = stemmer(documents[key])
    .join(" ")
    .replace(regex, " ")
    .trim();}

console.log("asdfasdfsdaf",documentCollection);
//function that calculate the term frequency
function termFrequency(document) {
  let arrayDocument = document.split(" ");
  let documentLength = arrayDocument.length;
  let objDocument = {};
  let i = 0;

  while (i < arrayDocument.length) {
    if (arrayDocument[i] == "") continue;
    if (objDocument[arrayDocument[i]]) objDocument[arrayDocument[i]]++;
    else objDocument[arrayDocument[i]] = 1;
    i++;
  }

  for (const key in objDocument)
    objDocument[key] = parseFloat(
      (objDocument[key] / documentLength).toFixed(3)
    );

  return objDocument;
}

function iDF(documentCollection, oneDocObj) {
  let docLength = Object.keys(documentCollection).length;
  let docIdfObj = {};

  let counter = 0;
  for (const key in oneDocObj) {
    for (const doc in documentCollection)
      if (doc != "query")
        if (documentCollection[doc].indexOf(key) >= 0) counter++;

    docIdfObj[key] = parseFloat(
      Math.log2((docLength - 1) / counter).toPrecision(3)
    );

    counter = 0;
  }
  return docIdfObj;
}

function compositeWeight(documentCollection, query) {
  let tempDocumentCollection = { ...documentCollection };
  tempDocumentCollection["query"] = query;
  let composite = {};
  let docResult = {};
  let tf;
  let idf;

  for (const doc in tempDocumentCollection) {
    tf = termFrequency(tempDocumentCollection[doc]);
    idf = iDF(tempDocumentCollection, tf);

    for (const key in tf)
      docResult[key] = parseFloat((tf[key] * idf[key]).toPrecision(3));

    composite[doc] = docResult;
    docResult = {};
  }

  return composite;
}

function rankRelevantDocument(weightedDocument) {
  let rankedDocument = {};
  let query = { ...weightedDocument["query"] };
  let sumOfDotProduct = 0;
  let sumOfSquerdDocWeight = 0;
  let sumOfSquerdQueryWeight = 0;

  for (const key in query) {
    sumOfSquerdQueryWeight += query[key] * query[key];
  }

  for (const doc in weightedDocument) {
    for (const term in weightedDocument[doc]) {
      sumOfSquerdDocWeight +=
        weightedDocument[doc][term] * weightedDocument[doc][term];

      if (query[term] != undefined)
        sumOfDotProduct += query[term] * weightedDocument[doc][term];
    }

    if (
      doc != "query" &&
      sumOfDotProduct != 0 &&
      sumOfSquerdDocWeight != 0 &&
      sumOfSquerdQueryWeight != 0
    ) {
      let rank = parseFloat(
        (
          sumOfDotProduct /
          Math.sqrt(sumOfSquerdDocWeight * sumOfSquerdQueryWeight)
        ).toFixed(3)
      );
      rankedDocument[doc] = rank;
    }

    sumOfDotProduct = 0;
    sumOfSquerdDocWeight = 0;
  }

  return rankedDocument;
}

// The function takes a query as input and returns a list of relevant documents
export const result = (query) => {
  // The query is first stemmed, cleaned, and trimmed
  query = stemmer(query).join(" ").replace(regex, " ").trim();
  // If the query is not empty, the function continues
  if (query != "") {
    // The weighted document is calculated using the composite weight method
    let weightedDocument = compositeWeight(documentCollection, query);

    // The relevant documents are ranked based on their weight
    let rankedDocument = rankRelevantDocument(weightedDocument);

    // The ranked documents are sorted in descending order based on their weight
    let rankedDocumentDesc = Object.keys(rankedDocument).sort((a, b) => {
      return rankedDocument[b] - rankedDocument[a];
    });

    // The documents are retrieved and stored in an array
    let result = rankedDocumentDesc.map((doc) => {
      if (documents[doc] != undefined) return documents[doc];
    });
    // The array of relevant documents is returned
    return result;
  }
  // If the query is empty, an empty array is returned
  return [];
};

