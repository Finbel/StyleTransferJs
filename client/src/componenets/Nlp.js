import React, { Fragment, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import VectorGraph from "./VectorGraph";
import * as ml5 from "ml5";

const linkEquality = (a, b) => {
  return (
    (a.source === b.source && a.target === b.target) ||
    (a.source === b.target && a.target === b.source)
  );
};

const networkEquality = (a, b) => a.links.length === b.links.length;

const buildNetwork = (network, selectedWord, neighbours) => {
  const { nodes, links } = network;
  const scaleNumber = nodes.find(node => node.id === selectedWord).color;
  nodes.forEach(node => {
    if (node.id === selectedWord) {
      node.explored = true;
    }
  });
  const newNodes = [...nodes];
  const newLinks = [...links];

  neighbours.forEach((item, i) => {
    if (!nodes.includes(item.word)) {
      newNodes.push({
        id: item.word,
        color: scaleNumber + i + 1
      });
    }
    const neighbourLink = {
      source: selectedWord,
      target: item.word,
      value: 2
    };
    if (!links.some(link => linkEquality(link, neighbourLink))) {
      newLinks.push(neighbourLink);
    }
  });

  return {
    nodes: newNodes,
    links: newLinks
  };
};

const Nlp = () => {
  const [word, setWord] = useState("rainbow");
  const [wordVectors, setWordVectors] = useState(undefined);
  const [network, setNetwork] = useState({
    nodes: [{ id: "rainbow", color: 0 }],
    links: []
  });

  console.log(network);

  useEffect(() => {
    // Create a new word2vec method
    const wordVectors = ml5.word2vec(
      "https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/Word2Vec/data/wordvecs10000.json",
      () => setWordVectors(wordVectors)
    );
  }, []);

  useEffect(() => {
    wordVectors &&
      wordVectors.nearest(word, 5).then(results => {
        const newNetwork = buildNetwork(network, word, results);
        if (!networkEquality(network, newNetwork)) {
          setNetwork(newNetwork);
        }
      });
  }, [network, word, wordVectors]);

  return (
    <Fragment>
      <h2>Word model</h2>
      <h3>Similar words to {word}</h3>

      <ClipLoader
        sizeUnit={"px"}
        size={150}
        color={"#123abc"}
        loading={wordVectors === undefined}
      />

      {wordVectors && network.links !== 0 && (
        <VectorGraph network={network} onSelect={setWord} />
      )}
    </Fragment>
  );
};

export default Nlp;
