from typing import Union
from fastapi import FastAPI
import os 

app = FastAPI()

@app.get("/{resenia}")
def read_root(resenia):

    f = open ('review.in','w')
    f.write(resenia)
    f.close()

    os.system('python test.py <review.in> res.out')

    f = open ('res.out','r')
    mensaje = f.read().strip()
    f.close()

    return {"sentimiento": mensaje}

