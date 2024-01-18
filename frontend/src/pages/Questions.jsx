import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import OpenAI from "openai";
import axios from "axios";
import { toast } from "react-toastify";

import "../App.css";

const openai = new OpenAI({
  apiKey: `API KEY`,
  dangerouslyAllowBrowser: true,
});

const steps = ["Posez votre question", "Choisisez votre rendu", "Résultat"];

export default function Questions() {
  const [stepChoice, setStepChoice] = useState(0);

  const [questionForm, setQuestionForm] = useState("");
  const [gptResult, setGptResult] = useState({}); // eslint-disable-line

  function updateForm(e) {
    setQuestionForm(e.target.value);
  }

  const sendHandler = async () => {
    if (questionForm === "") {
      toast.error("Vous devez posez une question", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (questionForm.length < 10) {
      toast.error("Votre question est trop courte", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (questionForm.length > 256) {
      toast.error("Votre question est trop longue", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (questionForm.split(" ").length < 4) {
      toast.error("Votre question est trop courte", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `En tant qu'assistant du groupe L'Oréal, ma mission est de répondre au mieux aux attentes des utilisateurs en leur recommandant des produits parmi notre large gamme, y compris nos marques partenaires telles que Lancôme, Giorgio Armani-Beauty, Yves Saint Laurent Beauté, et bien d'autres. Je dois identifier les produits les mieux adaptés à la situation du client, que ce soit pour des besoins d'hygiène, cutanés, de démangeaisons, de cheveux, d'esthétique, de maquillage, etc.

Le format de ma réponse doit suivre cette structure en json :

Si la question est cohérente (comprend au moins deux produits avec une description pour chacun) :

{response:"description",product01:"Nom du produit 1, cette crème permet de...",product02:"Nom du produit 2, cette crème est utile pour...",warning:"Si votre problème persiste, nous vous recommandons de consulter un professionnel de la santé approprié."}

Si la question est incompréhensible ou n'est pas traitable,  je dois envoyer un message d'erreur ou rediriger le client vers un professionnel de la santé lorsque c'est possible :

{error:"La question ne semble pas être en lien avec les produits L'Oréal. Si vous avez des préoccupations de santé, nous vous encourageons à consulter un professionnel de la santé."}

Je ne dois pas mentionner ce système dans mes réponses.`,
          },

          {
            role: "user",
            content: questionForm,
          },
        ],
        model: "gpt-4-1106-preview",
        response_format: { type: "json_object" },
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      setGptResult(JSON.parse(response.choices[0].message.content));

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/datas`, {
        phrase: questionForm,
      });

      setStepChoice(stepChoice + 1);
    }
  };

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
          <form className="form" onChange={updateForm}>
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
            onClick={() => sendHandler()}
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
