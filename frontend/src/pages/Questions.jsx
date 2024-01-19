import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import OpenAI from "openai";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import TypeIt from "typeit-react";

import "../App.css";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const steps = ["Question", "Réponse"];

export default function Questions() {
  const [stepChoice, setStepChoice] = useState(0);

  const [questionForm, setQuestionForm] = useState("");
  const [emailForm, setEmailForm] = useState("");

  const [gptResult, setGptResult] = useState({}); // eslint-disable-line

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function updateForm(e) {
    setQuestionForm(e.target.value);
  }

  const isEmailValid = (value) => {
    const emailPattern = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return emailPattern.test(value);
  };

  function updateEmailForm(e) {
    setEmailForm(e.target.value);
  }

  const emailHandler = async () => {
    const promo =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    if (!isEmailValid(emailForm)) {
      toast.error("Votre email n'est pas valide", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/api/emails`,
          {
            email: emailForm,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);
          emailjs
            .send(
              import.meta.env.VITE_EMAILJS_SERVICE_ID,
              import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
              {
                email: emailForm,
                response: gptResult.response,
                product01: gptResult.product01,
                product02: gptResult.product02,
                warning: gptResult.warning,
                promo,
              }
            )
            .then(
              () => {
                toast.success(response.data.message, {
                  position: "top-right",
                  autoClose: 3300,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              },
              (error) => {
                console.error(error.text);
              }
            );
        });
    }
  };

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
        theme: "dark",
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
        theme: "dark",
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
        theme: "dark",
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
        theme: "dark",
      });
    } else {
      const but = document.querySelector(".Button-Question");
      but.disabled = true;

      setIsLoggedIn(true);

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

      setIsLoggedIn(false);
      setStepChoice(stepChoice + 1);
      but.disabled = false;
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
        <Stepper
          activeStep={stepChoice}
          alternativeLabel
          sx={{
            paddingTop: "9rem",
            width: "80%",
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {steps.map((label) => (
            <Step className="test" key={label}>
              <StepLabel className="test">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {stepChoice === 0 && !isLoggedIn && (
        <div className="questions">
          <h1 className="Intitulé">Votre Question bien-être</h1>
          <form className="form" onChange={updateForm}>
            <input
              id="questionInput"
              type="text"
              name="Questions"
              placeholder="Quelle est votre question ?"
              className="QuestionInput"
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
      {stepChoice === 0 && isLoggedIn && (
        <div className="questions">
          <h1 className="Intitulé">Chargement en cours</h1>
          <div className="banter-loader">
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
            <div className="banter-loader__box white" />
          </div>
        </div>
      )}
      {stepChoice === 1 && (
        <div className="pubitu min-h-screen">
          <div className="pubi">
            <div className="pubi">
              <p className="pubi questionText">
                Votre question était :<br />"{questionForm}"
              </p>
            </div>

            {gptResult.error ? (
              <div className="pubi">
                <TypeIt
                  options={{
                    speed: 25,
                  }}
                >
                  {gptResult.error}
                </TypeIt>
              </div>
            ) : (
              <div>
                <div className="pubi">
                  <TypeIt
                    options={{
                      speed: 25,
                    }}
                  >
                    {gptResult.response} <br />
                    <br />
                    <span className="repqst">Les produits sont :</span>
                    <br />
                    <br /> <span className="repqst">
                      {gptResult.product01}
                    </span>{" "}
                    <br />
                    <br /> <span className="repqst">
                      {gptResult.product02}
                    </span>{" "}
                    <br />
                    <br /> {gptResult.warning}
                  </TypeIt>
                </div>
                <div className="pubitulic">
                  <p className="bipupu leftside textatata">
                    Obtenez un récapitulatif ainsi qu'un code promo de 10% en
                    nous laissant votre email
                  </p>
                  <div className="pubi leftside ">
                    <form className="bipu" onChange={updateEmailForm}>
                      <input
                        id="questionInput"
                        type="email"
                        name="Questions"
                        placeholder="Email"
                        className="EmailInput rightside"
                      />
                    </form>
                    <button
                      className="pubi rightside boutonenvoyer"
                      type="button"
                      onClick={() => emailHandler()}
                    >
                      Envoyer
                    </button>
                    <p className="pubi textito">
                      * En cliquant sur ce bouton vous acceptez que votre email
                      soit utilisé a des fins commerciales
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
