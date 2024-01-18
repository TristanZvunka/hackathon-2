import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../App.css";

const steps = ["Posez votre question", "Choisisez votre rendu", "Résultat"];

export default function Questions() {
  const [stepChoice, setStepChoice] = useState(0);

  return (
    <div className="questionscontent">
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgb(32, 31, 31)",
          color: "#e6e3de",
        }}
      >
        <Stepper activeStep={stepChoice} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {stepChoice === 0 && (
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
          <button
            type="button"
            className="Button-Question"
            onClick={() => setStepChoice(stepChoice + 1)}
          >
            Envoyer
          </button>
        </div>
      )}
      {stepChoice === 1 && (
        <div className="questions">
          <div className="container">
            <div className="left-bloc">
              <p className="answer">
                Recevez votre réponse directement mais sans code promo
              </p>
              <button
                className="Button-Question"
                type="button"
                onClick={() => setStepChoice(stepChoice + 1)}
              >
                Recevoir
              </button>
            </div>
            <div className="step-divider" />
            <div className="right-bloc">
              <p className="promocode">
                Recevez votre réponse par mail et recevez un code promo de 10%
              </p>
              <form className="form">
                <input
                  id="questionInput"
                  type="text"
                  name="Questions"
                  placeholder="EMAIL"
                  className="EmailInput"
                  style={{
                    width: 400,
                    height: 50,
                    borderRadius: 20,
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                />
              </form>
              <button
                className="Button-Question"
                type="button"
                onClick={() => setStepChoice(stepChoice + 1)}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
      {stepChoice === 2 && (
        <div className="questions">
          <button
            className="Button-Question"
            type="button"
            onClick={() => setStepChoice(stepChoice + 1)}
          >
            Terminer
          </button>
        </div>
      )}
    </div>
  );
}
