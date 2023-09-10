import openai
from metaphor_python import Metaphor
from flask import Flask, jsonify
from flask_talisman import Talisman
from flask_cors import CORS

# setting up APIs
openai.api_key = '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'
client = Metaphor("c4a74e50-0838-403e-890d-576730c0abd2")


# setting up flask application
app = Flask(__name__)

# Define a secret key for your Flask app (required for Flask-Talisman)
app.config["SECRET_KEY"] = "cock_and_balls"

CORS(app)

# Initialize Flask-Talisman and configure it to enforce HTTPS
talisman = Talisman(
    app,
    content_security_policy=None,  # Customize CSP as needed
    force_https=True,  # Enforce HTTPS
)

@app.route("/helloworld")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/penis")
def penis_world():
    print("PENIS\n\n")
    return "<p>Penis printed!</p>"


def get_recommendations(location, time_of_year, plant_type, garden_type):
    # garden type = small pots, large pots, a small plot, a large plot
    prompt = f"What are the top 5 {plant_type}s to plant in {location} during {time_of_year}. Make sure that all of these plants can be raised in {garden_type}?"

    response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
            {"role": "system", "content": "You are a helpful assistant. If asked for a list, provide the response as a comma-separated list. There should be no text before or after the list. All items should be lower case and their should be no punctuation aside from the commas and colons. You will be given a query about the top 5 plants that satisfy certain properties; you should reply with a comma seperated list; for each item in the list of your reponce there should be a plant name and unique important information that might help someone raise the plant properly (max 1 sentence); please do not repeat infomation that is implicit from the original query. The list should be ordered by the most important plant first. If you are unable to find 5 plants that satisfy the query, you should return as many as you can find. If you are unable to find any plants that satisfy the query, you should return an empty list."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2
    )

    response_string = response.choices[0].message['content'].strip()
    print("\n\n")
    responses = response_string.split('\n')
    responses = [reponce.split(':') for reponce in responses]

    for reponce in responses:
        print(reponce)

    return responses

@app.route("/reccomend/<string:location>/<string:time_of_year>/<string:plant_type>/<string:garden_type>",  methods=['GET'])
def get_recs_w_sites(location, time_of_year, plant_type, garden_type):
    recommendations = get_recommendations(location, time_of_year, plant_type, garden_type)
    out = ""

    print()
    # Get website from Metaphor and Print the recommendations
    for recommendation in recommendations:
        # print(recommendation)
        response = client.search(recommendation[0],
                                num_results=1,
                                include_domains=["https://www.burpee.com", "https://www.fast-growing-trees.com",
                                                "https://www.gurneys.com/", "https://www.parkseed.com/",
                                                "https://www.naturehills.com", "https://ediblelandscaping.com/",
                                                "https://www.greenwoodnursery.com/", "https://raintreenursery.com/",
                                                "https://www.growjoy.com"
                                                ],
        )

        result_url = response.results[0].url
        recommendation.append(result_url)


        out += f"<p>{recommendation[0]}, {recommendation[1]}, {recommendation[2]},</p>"

    message = []

    for r in recommendations:
        message.append({"name": r[0], "desc" : r[1], "url": r[2]})

    return jsonify(message)


if __name__ == "__main__":
    app.debug = True
    app.run(port = 3000, ssl_context=('cert.pem', 'key.pem'))
    
