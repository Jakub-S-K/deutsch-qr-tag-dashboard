import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Button, Input, Label } from "reactstrap";
import { Retreat } from "../../components/Retreat/Retreat";
import { useNavigate, useLoaderData, useParams } from "react-router-dom";
import { postRequest, patchRequest } from "../../utilities";
import { payloadQuestion, Question } from "../../backendTypes";

interface answer {
  content: string;
  isCorrect: boolean;
}

export const QuestionForm = () => {
  const isQuestion = (data: unknown): data is Question => {
    return (
      typeof data === "object" &&
      data !== null &&
      data !== undefined &&
      "answer" in data &&
      "answers" in data &&
      "question" in data
    );
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const modify = useRef<boolean>(false);
  const loaderData: unknown = useLoaderData();
  const [question, setQuestion] = useState<string>("");
  const [answers, setAnswers] = useState<answer[]>([]);
  const [newAnswer, setNewAnswer] = useState<string>("");
  useEffect(() => {
    if (isQuestion(loaderData)) {
      modify.current = true;
      setQuestion(loaderData.question);
      setAnswers([
        ...loaderData.answers.map((value: string, index: number) => {
          if (loaderData.answer.includes(index)) {
            return { content: value, isCorrect: true };
          }
          return { content: value, isCorrect: false };
        }),
      ]);
    }
  }, []);
  const appendAnswer = (answerContent: string) => {
    setAnswers([...answers, { content: answerContent, isCorrect: false }]);
    setNewAnswer("");
    answerRef.current!.value = "";
  };
  const handleAnswerChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    target: "checkbox" | "text"
  ) => {
    const arr = Array.from(answers);
    if (target === "text") {
      arr[index].content = e.target.value;
    }
    if (target === "checkbox") {
      arr[index].isCorrect = e.target.checked;
    }
    setAnswers([...arr]);
  };
  const removeAnswer = (index: number) => {
    setAnswers([...answers.filter((_, ind) => ind !== index)]);
  };
  const handleEnterPress = (e: any) => {
    if (e.key === "Tab") {
      e.preventDefault();
      if (e.currentTarget.value.length > 0) {
        appendAnswer(e.currentTarget.value);
      }
    }
  };
  const compareArrays = (arr1: Array<any>, arr2: Array<any>) => {
    const areEqual = arr1.every((elem) => {
      return arr2.includes(elem);
    });
    return areEqual;
  };
  const answerRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Retreat />
      <form
        onSubmit={async (e: any) => {
          e.preventDefault();
          if (modify.current && isQuestion(loaderData)) {
            const answersToFetch = [...answers.map((answer) => answer.content)];
            const payload: Partial<payloadQuestion> = {};
            const correctAnswersToFetch = [
              ...answers
                .map((answer: answer, index: number) => {
                  if (answer.isCorrect) {
                    return index;
                  }
                  return -1;
                })
                .filter((value) => value !== null && value !== -1),
            ];
            if (question !== loaderData.question) {
              payload.question = question;
            }
            if (!compareArrays(answersToFetch, loaderData.answers)) {
              payload.answers = answersToFetch;
            }
            if (!compareArrays(correctAnswersToFetch, loaderData.answer)) {
              payload.answer = correctAnswersToFetch;
            }
            console.log(payload);
            patchRequest({
              path: `api/question/${id}`,
              payload: payload,
            });
          } else {
            postRequest({
              path: "api/question",
              payload: {
                question: question,
                answers: [...answers.map((answer) => answer.content)],
                answer: [
                  ...answers
                    .map((answer, index) => {
                      if (answer.isCorrect) {
                        return index;
                      }
                      return null;
                    })
                    .filter((value) => value != null),
                ],
              },
            });
          }
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
            value={question}
            required
            autoFocus
          ></Input>
          <h5 className="mt-3">Odpowiedzi</h5>
          <hr></hr>
          {answers.map((answer, index) => {
            return (
              <div className="d-flex flex-row py-2">
                <Input
                  type="checkbox"
                  onChange={(e) => handleAnswerChange(e, index, "checkbox")}
                  checked={answer.isCorrect}
                />
                <Label for={`answer${index + 1}`}>{index + 1}</Label>
                <Input
                  id={`answer${index + 1}`}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    )
                  }
                  onChange={(e) => handleAnswerChange(e, index, "text")}
                  value={answer.content}
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
          {modify.current ? (
            <div className="my-3 row">
              <Button
                color="primary"
                type="submit"
                onClick={() => {
                  //navigate(-1);
                }}
              >
                Zapisz
              </Button>
            </div>
          ) : (
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
          )}
        </>
      </form>
    </>
  );
};
