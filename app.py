import requests
from flask import Flask, render_template, request

app = Flask(__name__)

API_KEY = '6b11af432fdb467ffd8cf379f76fd544'


@app.route("/")
def main():
    return render_template("index.html")


@app.route("/city", methods=['GET', 'POST'])
def get_city_current():
    """Get current weather details."""
    city_name = request.args['city']
    payload = {'APPID': API_KEY, 'q': city_name, 'units': 'metric'}
    if city_name:
        r = requests.get(
            'http://api.openweathermap.org/data/2.5/weather', params=payload)
        y = r.json()
        wind = y['wind']['speed']
        weather = y['weather'][0]['main']
        average_temp = y['main']['temp']
        country = y['sys']['country']
        return render_template("index.html", city=city_name.title(),
                               weather=weather, windspeed=wind,
                               temp=average_temp, country=country)
    else:
        return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
