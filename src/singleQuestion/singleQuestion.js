import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import "./singleQuestion.css"

function SingleQuestion({ allQuestions }) {
    const [singleQuestion, setSingleQuestion] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isRight, setIsRight] = useState(null);

    useEffect(() => {
        getRandomQuestion();
    }, []);

    const getRandomQuestion = () => {
        setIsRight(null);
        setSelectedValue(null);
        if (allQuestions && allQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * allQuestions.length);
            setSingleQuestion(allQuestions[randomIndex]);
        }
    }

    const handleChange = (index) => {
        setSelectedValue(index);
        if (index === singleQuestion["correct"]) {
            setIsRight(true);
        } else {
            setIsRight(false);
        }
    }

    return (
        <div id="right-panel" style={{ padding: "4%", color: "rgb(63, 63, 63)", width: "100%", height: "100%" }}>
            <div style={{height: "10vh"}}>
                <h1>{isRight === null ? "Select Answer" : isRight === true ? <span style={{color: "green"}}>Correct Answer!</span> : <span style={{color: "red"}}>Incorrect Answer!</span>}</h1>
                <Button variant="contained" onClick={getRandomQuestion}>
                        Another one
                </Button>
            </div>
            {singleQuestion && (
                <Card style={{ marginBottom: "1%", textAlign: "left", paddingLeft: "3%", paddingTop: "3%", paddingBottom: "3%" }}>
                    <p>{singleQuestion.question}</p>
                    <RadioGroup>
                        {singleQuestion.options && singleQuestion.options.map((option, optionIndex) => (
                            <FormControlLabel
                                key={optionIndex}
                                onClick={(event) => handleChange(optionIndex)}
                                value={option}
                                control={<Radio />}
                                label={option}
                                checked={selectedValue === optionIndex}
                            />
                        ))}
                    </RadioGroup>
                    {singleQuestion.image && <img src={"https://www.praktycznyegzamin.pl/inf04/teoria/wszystko/" + singleQuestion.image} alt="question" />}
                </Card>
            )}
        </div>
    );
}

export default SingleQuestion;
