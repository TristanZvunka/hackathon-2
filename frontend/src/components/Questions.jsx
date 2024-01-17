import React from "react";
import "../App.css";

function Questions() {
  return (
    <div className="questions">
      <h1 className="Intitulé">Votre Question bien-être</h1>
      <form className="form">
        <input
          id="questionInput"
          type="text"
          name="Questions"
          placeholder="Quelle est votre question ?"
          className="QuestionInput"
          style={{ width: 1200, height: 150 }}
        />
      </form>
      <button type="button" className="Envoyer">
        Envoyer
      </button>
    </div>
  );
}

export default Questions;
