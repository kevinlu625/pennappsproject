from metaphor_python import Metaphor

client = Metaphor("c4a74e50-0838-403e-890d-576730c0abd2")

response = client.search("raspberries",
    num_results=1,
    include_domains=["https://www.burpee.com", "https://www.fast-growing-trees.com",
                     "https://www.gurneys.com/", "https://www.parkseed.com/",
                     "https://www.naturehills.com", "https://ediblelandscaping.com/",
                     "https://www.greenwoodnursery.com/", "https://raintreenursery.com/",
                     "https://www.growjoy.com"
                     ],
)

for result in response.results:
    print(result.title,"(",result.url,")")