import React, { useState, useRef } from "react";
import { Button, Input, Label } from "reactstrap";
import { Retreat } from "../../components/Retreat/Retreat";
import { useNavigate } from "react-router-dom";

export const QuestionForm = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([]);
  const appendAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
    answerRef.current!.value = "";
  };
  const removeAnswer = (index: number) => {
    setAnswers([...answers.filter((_, ind) => ind !== index)]);
  };
  const handleEnterPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      appendAnswer(e.currentTarget.value);
    }
  };
  const answerRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Retreat />
      <form
        onSubmit={async (e) => {
          e.preventDefault();
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
                  value={answer}
                  className="mx-2"
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
              innerRef={answerRef}
            ></Input>
            <Button
              color="success"
              outline
              onClick={() => {
                appendAnswer(answerRef.current!.value);
              }}
              style={{ width: "38px", height: "38px" }}
              className="text-center"
            >
              +
            </Button>
          </div>
          <div className="my-3 row">
            <Button
              color="success"
              outline
              onClick={() => {
                navigate(-1);
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
