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
    <>
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
            className="Envoyer"
            onClick={() => setStepChoice(stepChoice + 1)}
          >
            Envoyer
          </button>
        </div>
      )}
      {stepChoice === 1 && (
        <div>
          <h1>Step Two</h1>
          <button type="button" onClick={() => setStepChoice(stepChoice + 1)}>
            Next
          </button>
        </div>
      )}
      {stepChoice === 2 && <h1>Step Three</h1>}
    </>
  );
}
