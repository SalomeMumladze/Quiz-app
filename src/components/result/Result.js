import { Button, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

const TotalResults = ({
  resetQuiz,
  currentQuizStep,
  processedAnswers,
  setCurrentQuizStep,
}) => {
  useEffect(() => {
    window.scrollTo(0, "20px");
  }, []);
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div>
        <Typography variant="h1" className={classes.mainTitle}>
          Results
        </Typography>
        <Typography variant="h4" className={classes.title}>
          {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of
          {processedAnswers.length}
        </Typography>
        <Button
          onClick={resetQuiz}
          className={classes.submitButton}
          variant="contained"
          color="primary"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default TotalResults;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "40px",
    textAlign: "center",
  },
  mainTitle: {
    fontSize: "24px",
    fontWeight: 500,
    color: "white",
    margin: "30px 0px",
  },
  submitButton: {
    background: "#D05663",
    margin: "30px 0px",
  },
  title: {
    fontSize: "15px",
    color: "white",
  },
}));
