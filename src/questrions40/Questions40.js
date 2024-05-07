import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';

function Questions40({ allQuestions }) {
    const [correctOptions, setCorrectOptions] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
    const [data, setData] = useState([]);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const shuffledData = allQuestions.sort(() => Math.random() - 0.5);
        const randomQuestions = shuffledData.slice(0, 40);
        setData(randomQuestions);

        const correctAnswers = randomQuestions.map(question => question.correct);
        setCorrectOptions(correctAnswers);
        setIsLoading(false)
    }, [allQuestions]);

    const handleChange = (event, questionIndex, optionIndex) => {
        const newSelectedValues = [...selectedValues];
        newSelectedValues[questionIndex] = optionIndex;
        setSelectedValues(newSelectedValues);
        console.log(selectedValues);
    };

    const getSelectedValue = (questionIndex) => {
        return selectedValues[questionIndex] || '';
    };

    const checkIfAnswersAreRight = () => {
        let c = 0
        selectedValues.map((value, index) => {
            if (value === correctOptions[index]) {
                c = c + 1;
            }
        });
        setResult((c / 40) * 100);
        console.log(result)
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return <></>
    }

    return (
        <div id="right-panel" style={{ padding: "4%", color: "rgb(63, 63, 63)", width: "100%" }}>
            <h1>{result === null ? null : result + "%"}</h1>
            {data.map((item, index) => (
                <Card key={index} style={{ marginBottom: "1%", textAlign: "left", paddingLeft: "3%", paddingTop: "3%", paddingBottom: "3%" }}>
                    <p>{item.question}</p>
                    <RadioGroup
                        value={getSelectedValue(index)}
                    >
                        {item.options.map((option, optionIndex) => (
                            <FormControlLabel
                                onClick={(event) => handleChange(event, index, optionIndex)}
                                key={optionIndex}
                                value={option}
                                control={<Radio />}
                                label={option}
                                checked={selectedValues[index] === optionIndex}
                            />
                        ))}
                    </RadioGroup>
                    {item.image && <img src={"https://www.praktycznyegzamin.pl/inf04/teoria/wszystko/" + item.image} alt="Question" />}
                </Card>
            ))}
            <Button onClick={() => checkIfAnswersAreRight()}>Submit</Button>
        </div>
    );
}

export default Questions40;
