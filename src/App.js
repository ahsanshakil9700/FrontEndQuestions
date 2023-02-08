import React, { useState, useEffect } from 'react';
import AddQuestion from './Questions/AddQuestion';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [conclusion, setConclusion] = useState(null);
  const [context, setContext] = useState([]);
  const [conclArray, setConclArray] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3001/conclusions')
      .then(res => res.json())
      .then(data => setConclArray(data))
      .catch(err => console.error(err));
  }, []);

  const handleYesClick = questionId => {
    const question = questions.find(q => q.id === questionId);
    const nextQuestion = questions.find(q => q.id === question.answers.yes.question_id);
    if (nextQuestion) {
      setContext([...context, question.answers.yes.context]);
      setCurrentQuestion(nextQuestion);
    } else {
      setConclusion(findConclusion(context));
    }
  };

  const handleNoClick = questionId => {
    const question = questions.find(q => q.id === questionId);
    const nextQuestion = questions.find(q => q.id === question.answers.no.question_id);
    if (nextQuestion) {
      setContext([...context, question.answers.no.context]);
      setCurrentQuestion(nextQuestion);
    } else {
      setConclusion(findConclusion(context));
    }
  };

  const findConclusion = context => {
    const conclusion = conclArray.find((c) => {
      return context.every((contextItem) => c.context.includes(contextItem))
    })
    return conclusion ? conclusion.conclusion : "No conclusion found";
  };

  return (
    <div>
      {conclusion ? (
        <h2>Conclusion: {conclusion}</h2>
      ) : currentQuestion ? (
        <div key={currentQuestion.id}>
          <h2>{currentQuestion.question}</h2>
          <button onClick={() => handleYesClick(currentQuestion.id)}>Yes</button>
          <button onClick={() => handleNoClick(currentQuestion.id)}>No</button>
        </div>
      ) : (
        <div>
          <h2>Please start the quiz</h2>
          <button onClick={() => setCurrentQuestion(questions[0])}>Start</button>
        </div>
      )}

      <AddQuestion />
    </div>
  );
}

export default App;