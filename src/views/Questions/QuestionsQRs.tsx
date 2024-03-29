import { getOptions, getQuestionQR } from "../../utilities";
import { isQuestionArr, isResponse } from "../../backendTypes";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9vAw.ttf",
      fontWeight: 500,
    },
    {
      src: "https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmWUlvAw.ttf",
      fontWeight: 700,
    },
  ],
});
// Create styles
const styles = StyleSheet.create({
  page: {
    padding: "1cm",
    flexDirection: "column",
    backgroundColor: "#FFF",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    fontSize: "8px",
    justifyContent: "space-between",
    borderBottom: "1px",
    borderStyle: "dashed",
    paddingBottom: "10px",
    paddingTop: "10px",
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignContent: "space-between",
    height: "100%",
  },
  justifyEnd: { flexDirection: "column", alignItems: "flex-end" },
  fontMedium: {
    fontSize: "24px",
    fontWeight: 700,
  },
  qr: {
    width: "3cm",
    height: "3cm",
    marginRight: "15px",
  },
});
export const QuestionsQrs = () => {
  const data = useLoaderData();
  const [questions] = useState(() => {
    if (isResponse(data) && isQuestionArr(data.data)) {
      return data.data;
    }
    return [];
  });
  const [title, setTitle] = useState(() => {
    return "Konkurs";
  });
  const currentId = useRef(-1);
  const [qrs, setQrs] = useState<Array<any>>([]);
  useEffect(() => {
    async function getAllQrs() {
      const options = await getOptions();
      const requestsToPerform = Array<any>();
      for (const question of questions) {
        requestsToPerform.push(getQuestionQR(question._id));
      }
      setQrs(await Promise.all(Object.values(requestsToPerform)));
      setTitle(options.data.title);
    }
    getAllQrs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (qrs.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <PDFViewer style={{ width: "100%", height: "80vh" }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {questions.map((question, index) => {
            if (currentId.current >= qrs.length - 1) {
              currentId.current = -1;
            }
            currentId.current += 1;
            console.log(currentId.current);
            return (
              <View style={styles.row} key={currentId.current}>
                <Image style={styles.qr} src={qrs[currentId.current]}></Image>
                <View style={styles.column}>
                  <View style={styles.justifyEnd}>
                    <Text style={styles.fontMedium}>{question.question}</Text>
                    <Text>
                      Aby udzielić odpowiedzi - zeskanuj kod w aplikacji
                      konkursu!
                    </Text>
                  </View>
                  <View style={styles.justifyEnd}>
                    <Text>Pytanie nr: {index + 1}</Text>
                    <Text>{title}</Text>
                    <Text>ID: {question._id}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
};
