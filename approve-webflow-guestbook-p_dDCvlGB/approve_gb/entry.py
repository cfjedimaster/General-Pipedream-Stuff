import json 
import requests 
import os 

def handler(pd: "pipedream"):

  # This ID refers to the guest book collection
  gb_collection_id = "692f445ff122275e9c5e3b71"
  # API token for site, make env
  token = os.environ.get("WEBFLOW_SITE_KEY_CATS")

  comment_id = pd.steps["trigger"]["event"]["query"]["id"]
  print(f"going to approve {comment_id}")

  approveGB = requests.post(f"https://api.webflow.com/v2/collections/{gb_collection_id}/items/publish", headers = {
    "Authorization": f"Bearer {token}"
  }, json = {
        "itemIds": [comment_id]
  })

  result = approveGB.json()
  print(result)

