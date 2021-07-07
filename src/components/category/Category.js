import {
  Grid,
  Paper,
  Select,
  Button,
  MenuItem,
  TextField,
  Container,
  Typography,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createMarkup } from "components/components/Markup";
import QuizQuestion from "components/quiestions";
import Difficulty from "./Difficulty";

const QuizCategories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: "", name: "" });
  const [quizNumber, setQuizNumber] = useState(null);
  const [difficulty, setDifficulty] = useState({ id: "", name: "" });
  const [quizData, setQuizData] = useState([]);
  const classes = useStyles();

  const [currentQuizStep, setCurrentQuizStep] = useState("start");

  const fetchQuizData = async () => {
    try {
      const url = `https://opentdb.com/api.php?amount=${quizNumber}&category=${
        category.id
      }&difficulty=${difficulty.name.toLowerCase()}`;
      const { data } = await axios.get(url);

      const formattedCategory = data.results.map((cat) => {
        const incorrectAnswersIndexes = cat.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );

        cat.incorrect_answers.splice(randomIndex, 0, cat.correct_answer);

        return {
          ...cat,
          answers: cat.incorrect_answers,
        };
      });

      setQuizData(formattedCategory);
      setCurrentQuizStep("results");
    } catch (error) {
      console.log("quiz error", error);
    }
  };

  const fetchCategories = async () => {
    const { data } = await axios.get(`https://opentdb.com/api_category.php`);
    setCategories(data.trivia_categories);
  };

  useEffect(() => {
    fetchCategories();
    window.scrollTo(0, "20px");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizData.length && quizNumber && category.id && difficulty) {
      fetchQuizData();
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find(
      (cat) => cat.id === e.target.value
    );
    setCategory(selectedCategory);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setQuizNumber(e.target.value);
  };

  const resetQuiz = (e) => {
    e.preventDefault();
    setQuizData([]);
    setCategory("");
    setQuizNumber("");
    setDifficulty("");
    setCurrentQuizStep("start");
    window.scrollTo(0, "20px");
  };

  if (!categories.length) {
    return null;
  }

  return (
    <Container>
      <Paper className={classes.paper}>
        {currentQuizStep === "start" ? (
          <div className={classes.container}>
            <div>
              <Typography variant="h4" className={classes.title}>
                Get Questions:
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      variant="outlined"
                    >
                      <InputLabel id="category-select-label">
                        Select category:
                      </InputLabel>
                      <Select
                        required
                        name="category"
                        value={category.id || ""}
                        id="category-select"
                        label="Select category"
                        labelId="category-select-label"
                        onChange={handleSelectChange}
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            <span
                              dangerouslySetInnerHTML={createMarkup(
                                category.name
                              )}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Difficulty />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      inputProps={{ min: 1, max: 10 }}
                      required
                      fullWidth
                      type="number"
                      id="quiz-number"
                      variant="outlined"
                      name="quiz-number"
                      label={`Add a quiz number from 1 to 10`}
                      value={quizNumber || ""}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <QuizQuestion
            quizData={quizData}
            resetQuiz={resetQuiz}
            categories={categories}
            currentQuizStep={currentQuizStep}
            setCurrentQuizStep={setCurrentQuizStep}
          />
        )}
      </Paper>
    </Container>
  );
};

export default QuizCategories;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: "40px",
  },
  title: {
    fontSize: "24px",
    fontWeight: 500,
    color: "white",
    margin: "30px 0px",
  },
  paper: {
    background: "transparent",
    boxShadow: "none",
  },
  submitButton: {
    background: "#D05663",
    margin: "30px 0px",
  },
}));
