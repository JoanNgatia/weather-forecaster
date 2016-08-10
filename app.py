import requests
import json
from flask import Flask, render_template, request

app = Flask(__name__)

API_KEY = '6b11af432fdb467ffd8cf379f76fd544'


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/city", methods=['GET', 'POST'])
def get_city():
    city_name = request.args['city']
    payload = {'APPID': API_KEY, 'q': city_name}
    if city_name:
        r = requests.get(
            'http://api.openweathermap.org/data/2.5/weather', params=payload)
        # print r.url
        y = r.json()
        weather = y['weather'][0]['main']
        return render_template("city.html", city=city_name, weather=weather)
    else:
        return render_template("failed.html")


if __name__ == "__main__":
    app.run(debug=True)


# payload = {'key1': 'value1', 'key2': 'value2'}
# >>> r = requests.get('http://httpbin.org/get', params=payload)
# print(r.url)
# http://httpbin.org/get?key2=value2&key1=value1