import React, { useState, useRef } from "react";
import { Button, Input, Label } from "reactstrap";
import { Retreat } from "../../components/Retreat/Retreat";
import { useNavigate } from "react-router-dom";

export const QuestionForm = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([]);
  const appendAnswer = (answer: string) => {
    setAnswers([...answers, answer]);
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
              <>
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
                  className="mb-2"
                ></Input>
              </>
            );
          })}
          <div className="d-flex flex-row">
            <Label for="answerx">{answers.length + 1}</Label>
            <Input
              id="answerx"
              onFocus={(e) =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
              innerRef={answerRef}
              className="mb-2"
            ></Input>
            <Button
              color="success"
              outline
              onClick={() => {
                appendAnswer(answerRef.current!.value);
              }}
            >
              +
            </Button>
          </div>
          <Button
            color="success"
            outline
            onClick={() => {
              navigate(-1);
            }}
          >
            Dodaj pytanie
          </Button>
        </>
      </form>
    </>
  );
};
