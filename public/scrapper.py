import requests
from bs4 import BeautifulSoup
import json

def getHtml(link):
    response = requests.get(link)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
    else:
        return -1

def getQuestions(html):
    return html.find_all(class_='question')


def ExtractQuestionsData(questions):
    data = []
    for question in questions:
        question_data = []

        title = question.find(class_="title")
        if title:
            question_data.append(title.text)

        answers = question.find_all(class_="answer")
        correct_index = 0
        for index, answer in enumerate(answers):
            if "correct" in answer["class"]:
               correct_index = index
            question_data.append(answer.text)

        question_data.append(correct_index)

        image_element = question.find('img')


        if image_element:
            image_link = image_element['src']
            question_data.append(image_link)

        data.append(question_data)

    print(data)
    return data

def writeDataToJSON(data):
    with open('data.json', 'w', encoding='utf-8') as file:
        json_data_list = []
        for row in data:
            print(row)
            dict_data = {
                "question": row[0],
                "options": row[1:5],
                "correct": row[5] if len(row) > 5 else None
            }
            if len(row) > 6:
                dict_data["image"] = row[6]
            else:
                dict_data["image"] = None
            json_data_list.append(dict_data)
        json.dump(json_data_list, file, ensure_ascii=False)

def main():
    writeDataToJSON(ExtractQuestionsData(getQuestions(getHtml("https://www.praktycznyegzamin.pl/inf04/teoria/wszystko/"))))

if __name__ == "__main__":
    main()



