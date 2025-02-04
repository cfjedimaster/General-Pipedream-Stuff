import re 
import requests 

def handler(pd: "pipedream"):
  pattern = r"https://res.cloudinary.com/raymondcamden/image/upload/e_improve,w_650/[^']+"
  match = re.search(pattern, pd.steps["image_transformation"]["$return_value"])
  url = match[0]

  r = requests.get(url)
 
  open(f'/tmp/{pd.steps["trigger"]["event"]["name"]}', 'wb').write(r.content)
  
