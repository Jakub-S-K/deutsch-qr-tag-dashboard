import { getTeams, getUserQR } from "../../utilities";
import { isResponse, isTeamArr, Team } from "../../backendTypes";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
  pdf,
} from "@react-pdf/renderer";
import { useEffect, useRef, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
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
export const TeamsQrs = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [title] = useState(() => {
    return "Test";
  });
  const currentId = useRef(-1);
  const [qrs, setQrs] = useState<Array<any>>([]);
  useEffect(() => {
    async function setData() {
      const res = await getTeams();
      if (isResponse(res) && isTeamArr(res.data)) {
        setTeams(res.data);
      }
    }
    setData();
  }, []);
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
  }, [teams]);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {teams.map((team, teamIndex) =>
          team.members.map((user, index) => {
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
                    <Text
                      style={styles.fontMedium}
                    >{`${user.name} ${user.surname}`}</Text>
                    <Text>{team.name}</Text>
                  </View>
                  <View style={styles.justifyEnd}>
                    <Text>Zawodnik {index + 1}</Text>
                    <Text>{title}</Text>
                    <Text>ID: {user._id}</Text>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </Page>
    </Document>
  );
};
export const blob = pdf(<TeamsQrs />).toBlob();
export const link = pdf(<TeamsQrs />)
  .toBlob()
  .then((v) => URL.createObjectURL(v));
//export const link = blob.then((v) => URL.createObjectURL(v));
