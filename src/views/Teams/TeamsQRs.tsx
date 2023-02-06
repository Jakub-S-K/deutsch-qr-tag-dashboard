import { getUserQR } from "../../utilities";
import { isResponse, isTeamArr, Team } from "../../backendTypes";
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
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Retreat } from "../../components/Retreat/Retreat";
import { Button } from "reactstrap";

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
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignContent: "space-between",
    height: "100%",
  },
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
export const TeamsQrs = ({ title }: { title: string }) => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [teams] = useState(() => {
    if (isResponse(data) && isTeamArr(data.data)) {
      return data.data;
    }
    return [];
  });
  const [qrs, setQrs] = useState<Array<any>>([]);
  useEffect(() => {
    async function getAllQrs() {
      const requestsToPerform = Array<any>();
      for (const team of teams) {
        for (const user of team.members) {
          requestsToPerform.push(getUserQR(user._id));
        }
      }
      setQrs(await Promise.all(Object.values(requestsToPerform)));
    }
    getAllQrs();
  }, []);
  if (qrs.length === 0) {
    return null;
  }
  return (
    <>
      <Button
        color="danger"
        onClick={() => {
          navigate("/");
        }}
        className="w-20 h-20"
      >
        X
      </Button>
      <PDFViewer style={{ width: "100%", height: "80vh" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            {teams.map((team) =>
              team.members.map((user, index) => (
                <View style={styles.row}>
                  <Image style={styles.qr} src={qrs[index]}></Image>
                  <View style={styles.column}>
                    <View>
                      <Text
                        style={styles.fontMedium}
                      >{`${user.name} ${user.surname}`}</Text>
                      <Text>{team.name}</Text>
                    </View>
                    <View>
                      <Text>Zawodnik {index + 1}</Text>
                      <Text>{title}</Text>
                      <Text>ID: {user._id}</Text>
                    </View>
                  </View>
                </View>
              ))
            )}
          </Page>
        </Document>
      </PDFViewer>
    </>
  );
};
