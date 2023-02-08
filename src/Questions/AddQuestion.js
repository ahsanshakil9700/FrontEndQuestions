import React, { useState } from 'react';

const AddQuestion = () => {
  const [question, setQuestion] = useState({});

  const handleQuestionChange = event => {
    setQuestion({
      ...question,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    // make a POST request to add the question to the existing JSON file
    fetch('http://localhost:3001/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="question"
        placeholder="Enter question"
        onChange={handleQuestionChange}
      />
      <input
        type="text"
        name="yesContext"
        placeholder="Enter context for 'Yes' answer"
        onChange={handleQuestionChange}
      />
      <input
        type="text"
        name="noContext"
        placeholder="Enter context for 'No' answer"
        onChange={handleQuestionChange}
      />
      <button type="submit">Add Question</button>
    </form>
  );
};

export default AddQuestion;