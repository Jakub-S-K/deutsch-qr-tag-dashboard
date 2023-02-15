import { getQuestionQR } from "../../utilities";
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
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#FFF",
    fontFamily: "Roboto",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  row: {
    flexDirection: "column",
    width: "50%",
    height: "25%",
    alignItems: "center",
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
    width: "4cm",
    height: "4cm",
  },
});
export const QuestionsQrsV2 = () => {
  const data = useLoaderData();
  const [questions] = useState(() => {
    if (isResponse(data) && isQuestionArr(data.data)) {
      return data.data;
    }
    return [];
  });
  const [title] = useState(() => {
    return "Test";
  });
  const currentId = useRef(-1);
  const [qrs, setQrs] = useState<Array<any>>([]);
  useEffect(() => {
    async function getAllQrs() {
      const requestsToPerform = Array<any>();
      for (const question of questions) {
        requestsToPerform.push(getQuestionQR(question._id));
      }
      setQrs(await Promise.all(Object.values(requestsToPerform)));
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
              <View
                style={{
                  ...styles.row,
                  borderRight: index % 2 === 0 ? "1px" : "0px",
                  borderRightStyle: "dashed",
                }}
                key={currentId.current}
              >
                <View style={styles.column}>
                  <View style={{ alignItems: "center" }}>
                    <Image
                      style={styles.qr}
                      src={qrs[currentId.current]}
                    ></Image>
                    <Text style={styles.fontMedium}>
                      Pytanie nr {index + 1}
                    </Text>
                    <Text>
                      Aby udzielić odpowiedzi - zeskanuj kod w aplikacji
                      konkursu!
                    </Text>
                    <Text>{title}</Text>
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
