import React, { useState, useEffect } from "react";
import { fetchQuestion } from "./api";

const App = () => {
  const [question, setQuestion] = useState(null);
  const [context, setContext] = useState([]);
  const [initialState, setInitialState] = useState(true);
  const [yesState, setYesState] = useState(null);
  const [conclusion, setConclusion] = useState(null);

  useEffect(() => {
    const requestBody = {
      questionId: 'q1',
      initialState: initialState,
    }
    // Fetch initial question when the component is mounted
    fetchQuestion(requestBody)
      .then(response => {
        setQuestion(response.data);
        setInitialState(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (yesState !== null)
      setContext(prevContext => prevContext.concat(question.answers[`${yesState ? 'yes' : 'no'}`].context))
  }, [yesState])

  useEffect(() => {
    if (context.length !== 0)
      handleAnswer()
  }, [context])

  const handleAnswer = () => {

    if (question) {
      const requestBody = {
        questionId: question.id,
        answer: `${yesState ? "yes" : "no"}`,
        context: context,
        initialState: initialState
      };

      fetchQuestion(requestBody)
        .then(response => {
          setYesState(null)
          const nextQuestion = response.data.question;
          if (nextQuestion) {
            setQuestion(nextQuestion);
          }
          else {
            setConclusion(response.data.conclusion)
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      {conclusion ? (
        <div>
          <h2>Conclusion: {conclusion}</h2>
        </div>
      ) : question ? (
        <div>
          <div key={question.id}>
            <h2>{question.question}</h2>
            <button onClick={() => { setYesState(true) }}>Yes</button>
            <button onClick={() => { setYesState(false) }}>No</button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Loading</h2>
        </div>
      )}
    </div>
  );

};

export default App;