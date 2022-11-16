import React, { useState, useRef } from "react";
import { Button, Input, Label } from "reactstrap";
import { Retreat } from "../../components/Retreat/Retreat";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../utilities";

export const QuestionForm = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");
  const appendAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    setNewAnswer("");
    answerRef.current!.value = "";
  };
  const handleAnswerChange = (e: any, index: number) => {
    const arr = Array.from(answers);
    arr[index] = e.target.value;
    setAnswers([...arr]);
  };
  const removeAnswer = (index: number) => {
    setAnswers([...answers.filter((_, ind) => ind !== index)]);
  };
  const handleEnterPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      if (e.currentTarget.value.length > 0) {
        appendAnswer(e.currentTarget.value);
      }
    }
  };
  const answerRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Retreat />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          postRequest({
            path: "api/question",
            payload: {
              question: question,
              answers: [...answers],
              answer: [0, 2],
            },
          });
        }}
      >
        <>
          <Label for="questionContent">Treść pytania</Label>
          <Input
            id="questionContent"
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            onChange={(e) => setQuestion(e.currentTarget.value)}
            required
            autoFocus
          ></Input>
          <h5 className="mt-3">Odpowiedzi</h5>
          <hr></hr>
          {answers.map((answer, index) => {
            return (
              <div className="d-flex flex-row py-2">
                <Label for={`answer${index + 1}`}>{index + 1}</Label>
                <Input
                  id={`answer${index + 1}`}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  onChange={(e) => handleAnswerChange(e, index)}
                  value={answer}
                  className="mx-2"
                  required
                ></Input>
                <Button
                  color="danger"
                  outline
                  onClick={() => {
                    removeAnswer(index);
                  }}
                  style={{ width: "38px", height: "38px" }}
                  className="text-center"
                >
                  -
                </Button>
              </div>
            );
          })}
          <div className="d-flex flex-row py-2">
            <Label for="answerx">{answers.length + 1}</Label>
            <Input
              id="answerx"
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              onKeyDown={(e) => handleEnterPress(e)}
              className="mx-2"
              onChange={(e) => {
                setNewAnswer(e.currentTarget.value);
              }}
              innerRef={answerRef}
            ></Input>
            <Button
              color="success"
              outline
              onClick={() => {
                appendAnswer(newAnswer);
              }}
              disabled={newAnswer.length === 0}
              style={{ width: "38px", height: "38px" }}
              className="text-center"
            >
              +
            </Button>
          </div>
          <div className="my-3 row">
            <Button
              color="success"
              type="submit"
              outline
              onClick={() => {
                //navigate(-1);
              }}
            >
              Dodaj pytanie
            </Button>
          </div>
        </>
      </form>
    </>
  );
};
