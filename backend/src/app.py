from flask import Flask, jsonify, request
#from flask_pymongo import PyMongo
from flask_cors import CORS,cross_origin
import base64
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/v1/users", methods=['POST'])
def list_users():
  imagenes = request.get_json()
  base64_img_bytes = imagenes["datos"].encode('utf-8')
  with open('decoded_image.png', 'wb') as file_to_save:
     decoded_image_data = base64.decodebytes(base64_img_bytes)
     file_to_save.write(decoded_image_data)
  return imagenes["datos"]

@app.route("/")
@cross_origin()
def helloWorld():
  return "Hello world!" 

if __name__ == "__main__":
    app.run(debug=True)
