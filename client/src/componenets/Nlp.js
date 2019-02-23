import React, { Fragment, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import * as ml5 from "ml5";

const Nlp = () => {
  const [word, setWord] = useState("rainbow");
  const [wordVectors, setWordVectors] = useState(undefined);
  const [neighbours, setNeighbours] = useState(undefined);

  useEffect(() => {
    // Create a new word2vec method
    const wordVectors = ml5.word2vec(
      "https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/Word2Vec/data/wordvecs10000.json",
      () => setWordVectors(wordVectors)
    );
  }, []);

  useEffect(() => {
    wordVectors &&
      wordVectors.nearest(word, (_, results) => {
        setNeighbours(results);
      });
  }, [word, wordVectors]);

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

      {wordVectors &&
        neighbours &&
        neighbours.map(item => (
          <li
            onClick={() => {
              setWord(item.word);
            }}
            key={item.distance}
          >
            {item.word}
          </li>
        ))}
    </Fragment>
  );
};

export default Nlp;
