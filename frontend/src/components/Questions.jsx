import React from "react";
import "../App.css";

function Questions() {
  return (
    <div className="questions">
      <h1 className="test">Votre Question bien-être</h1>
      <form action="">
        <input
          id="questionInput"
          type="text"
          name="Questions"
          placeholder="Question"
          className="Questionimput"
        />
      </form>
      <button type="button" className="Envoyer">
        Envoyer
      </button>
    </div>
  );
}

export default Questions;
