import makeStyles from "@mui/styles/makeStyles";

export const LoginStyles = makeStyles({
  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 690,
  },
  container: {
    width: 600,
  },

  onetextbox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  box: {
    boxShadow: "1px 1px 10px 0px #00000050",
    height: "auto",
    borderRadius: 40,
  },

  p: {
    fontFamily: "kanit",
    fontWeight: "bold",
    fontSize: 34,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    margin: 15,
  },
  loginbutton: {
    display: "flex",
    direction: "row",
    justifyContent: "center",
    margin: 25,
  },
});
