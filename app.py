import os
from flask import Flask, render_template, redirect, session, request, url_for, jsonify
import json



app = Flask(__name__)

@app.route('/')
def index():
    return render_template('plot.html')

global xdata
global ydata
global i
i=0
    
xdata = [[]]
ydata = [[]]
@app.route('/', methods=['POST','GET'])
def data_plot():
    uploaded_file = request.files['file']
    print("----",uploaded_file.filename)
    # filename.append(filename)
    for line in uploaded_file:
        if line.decode("utf-8").startswith('[Data'):
            break
    # Read the rest of the data, using spaces to split. 
    data = [r.decode("utf-8").split() for r in uploaded_file]
    
    
    # xdata.append([])
    # ydata.append([])
    
    x = []
    y = []
    for d in data:
        if d:
            x.append(round(float(d[0]),2))
            y.append(round(float(d[1]),2))
    xdata.append(x)
    ydata.append(y)
    # print(round(xdata[0]-xdata[1], 2))
    # print(ydata)
    print(type(xdata[0]))
    print(xdata)
    # print(type(ydata))
    # print(ydata)
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    return render_template('plot.html')

@app.route('/data')
def xydata():
   return jsonify({'xdata': xdata, 'ydata':ydata})
#    return jsonify({'xdata': xdata, 'ydata':ydata, 'filename':filename})


if __name__ == '__main__':
    app.run(host=os.environ.get('IP', '0.0.0.0'),
            port=int(os.environ.get('PORT', '5705')),
            debug=True)
