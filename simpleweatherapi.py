from flask import Flask, request, jsonify
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin request

@app.route('/api/weather', methods=['GET'])
def get_weather():
    location = request.args.get('location')
    print(f"Weather API Hit for Location: {location}")
    location = random.choice(["Hyderabad", "Gachibowli", "Yapral", "Jubilee Hills"])
    temperature = random.randint(15, 100)
    conditions = random.choice(["Sunny", "Rainy", "Cloudy", "Windy"])

    return jsonify({
        "location": location,
        "temperature": temperature,
        "conditions": conditions
    })

if __name__ == '__main__':
    app.run(port=9000)
