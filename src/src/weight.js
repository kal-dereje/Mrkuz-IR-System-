import { stemmer } from "./stemmer.js";
import { documents } from "./documents/documents.js";
//collection of documents
let documnetCollection = {};
// let documnetCollection = {
//   doc1 :"shipment of gold damaged in a fire",
//   doc2 :"delivery of silver arrived in a silver truck",
//   doc3 :"Shipment of gold arrived in a truck",
// }
const regex = /\s+/g;

for (const key in documents)
  documnetCollection[key] = stemmer(documents[key])
    .join(" ")
    .replace(regex, " ")
    .trim();

// console.log(documnetCollection);

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

function iDF(documnetCollection, oneDocObj) {
  let docLength = Object.keys(documnetCollection).length;
  let docIdfObj = {};

  let counter = 0;
  for (const key in oneDocObj) {
    for (const doc in documnetCollection)
      if (doc != "query")
        if (documnetCollection[doc].indexOf(key) >= 0) counter++;

    docIdfObj[key] = parseFloat(
      Math.log2((docLength - 1) / counter).toPrecision(3)
    );

    counter = 0;
  }
  return docIdfObj;
}

function compositeWeight(documnetCollection, query) {
  let tempDocumentCollection = { ...documnetCollection };
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


export const result = (query) => {
  query = stemmer(query).join(" ").replace(regex, " ").trim();
  if (query != "") {
    let weightedDocument = compositeWeight(documnetCollection, query);

    let rankedDocument = rankRelevantDocument(weightedDocument);

    console.log(rankedDocument);

    let rankedDocumentDesc = Object.keys(rankedDocument).sort((a, b) => {
      return rankedDocument[b] - rankedDocument[a];
    });

    let result = rankedDocumentDesc.map((doc) => {
      if (documents[doc] != undefined) return documents[doc];
    });
    return result;
  }

  return []
};
