import openai
from metaphor_python import Metaphor
from flask import Flask

# setting up APIs
openai.api_key = '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'
client = Metaphor("c4a74e50-0838-403e-890d-576730c0abd2")

# setting up flask application
app = Flask(__name__)
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
            {"role": "system", "content": "You are a helpful assistant. If asked for a list, provide the response as a comma-separated list. For each item, specify only the type of plant. There should be no text before or after the list. All items should be lower case and their should be no punctuation aside from the commas"},
            {"role": "user", "content": prompt},
        ],
        temperature=0.2
    )

    response_string = response.choices[0].message['content'].strip()

    return response_string.split(', ')

@app.route("/reccomend/<string:location>/<string:time_of_year>/<string:plant_type>/<string:garden_type>")
def get_recs_w_sites(location, time_of_year, plant_type, garden_type):

    recommendations = get_recommendations(location, time_of_year, plant_type, garden_type)
    print()

    # Get website from Metaphor and Print the recommendations
    for recommendation in recommendations:
        print(recommendation)
        response = client.search(recommendation,
                                num_results=2,
                                include_domains=["https://www.burpee.com", "https://www.fast-growing-trees.com",
                                                "https://www.gurneys.com/", "https://www.parkseed.com/",
                                                "https://www.naturehills.com", "https://ediblelandscaping.com/",
                                                "https://www.greenwoodnursery.com/", "https://raintreenursery.com/",
                                                "https://www.growjoy.com"
                                                ],
        )

        for result in response.results:
            print(result.title,"(",result.url,")")
        
        print()
    return f"<p>bruh</p>"

# def get_recs_wo_sites_manual():
#     # Get user inputs
#     location = input("Enter the location (e.g., California, Northeast US): ")
#     time_of_year = input("Enter the time of year (e.g., Spring, Fall): ")
#     plant_type = input("Enter the desired plant type (e.g., herb, vegetable, fruit, flower): ")
#     garden_type = input("Breifly describe your garden: ")

if __name__ == "__main__":
    app.debug = True
    app.run()
    
    pass

