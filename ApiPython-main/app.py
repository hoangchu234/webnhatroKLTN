##libraries
from flask import Flask, jsonify, request
import data
import utils
from flask_cors import CORS, cross_origin

# Khởi tạo model.
global model 
model = []
count_matrix = []
cosine_sim = []
# Khởi tạo flask app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/": {"origins": "http://localhost:port"}})

# Khai báo các route 1 cho API
@app.route('/', methods=['GET','POST'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
# Khai báo hàm xử lý dữ liệu.
def _hello_world():
    if request.method == 'POST':
        id = request.form["id"]
        linkdata = request.form["linkdata"]
        linktitle = request.form["linktitle"]
        try:
            model = data.requre(linkdata, id)
            if len(model) != 0:
                count_matrix,cosine_sim = utils.count(model)
                indices = []
                for i in range(0, len(model), 1):
                    indices.append(model[i]['Title'])
            title = data.title(linktitle, id)
            result = utils.recommend(title,cosine_sim, indices, model)
            return jsonify(result)
        except:
            return "Error"
    else :
	    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True,threaded=True, port=3000)
    