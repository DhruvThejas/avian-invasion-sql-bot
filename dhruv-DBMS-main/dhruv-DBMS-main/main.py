import pandas as pd
import pandasql as ps
import requests
from flask import Flask,request
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app, supports_credentials=True)

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/translate', methods=['POST'])
def translate():
    print (request.get_json())
    user_input = request.get_json()['inputText']
    print(user_input)
    payload = {
      "inputText": user_input,
      "tableSchema": "CREATE TABLE df (RecordID INT PRIMARY KEY, SpeciesID INT, OrderName VARCHAR(255), FamilyName VARCHAR(255), GenusName VARCHAR(255), SpeciesName VARCHAR(255), BinomialName VARCHAR(255), CommonName VARCHAR(255), CountryName VARCHAR(255), AreaName1 VARCHAR(255), AreaName2 VARCHAR(255), LocationDescription TEXT, Realm VARCHAR(255), Island VARCHAR(255), LandType VARCHAR(255), CPrecord VARCHAR(255), IntroducedDate DATE, IntroducedDateGrouped VARCHAR(255), MappingDate DATE, ReferenceDate DATE, StatusCat VARCHAR(255), IntroMethod VARCHAR(255), IntroPurpose VARCHAR(255), TaxonomicNotes TEXT, Notes TEXT, RangeMap BLOB, Reference VARCHAR(255), CompilerInitial CHAR(1) );"
    }
    url = "https://www.sqltranslate.app/api/translate"
    response = requests.post(url=url, json=payload)
    print(response)
    if response.status_code == 200:
        df = pd.read_csv('GAVIA.csv', encoding='cp1252')
        q1 = response.json()['outputText']
        result = ps.sqldf(q1, locals())
        result.to_csv('output.csv', index=False)
        json1 ={
            "outputText": q1,
            "result": result.to_json(orient='records')
        }
        return json1
    else:
        return f"Request failed with status code {response.status_code}"
