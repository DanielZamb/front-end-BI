import joblib
import re
import sys


def iniciar() -> None:
    casos = sys.stdin
    texto = casos.readline().strip()
    predict(str(texto))
    casos.close()

def tokenizer(text):
    text = re.sub(r'[^\w\s]', ' ', text)
    text = text.lower()
    tokens = text.split()
    return tokens

def predict(text):
    pipeline = joblib.load('pipeline_model.joblib')
    res = pipeline.predict([text])

    print(res[0])

iniciar()