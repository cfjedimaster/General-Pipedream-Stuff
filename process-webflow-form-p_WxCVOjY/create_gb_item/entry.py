import json 
import requests 
import os 

def handler(pd: "pipedream"):

  # This ID refers to the guest book collection
  gb_collection_id = "692f445ff122275e9c5e3b71"
  # API token for site, make env
  token = os.environ.get("WEBFLOW_SITE_KEY_CATS")
  body = json.loads(pd.steps["trigger"]["event"]["body"])
  form = body["payload"]["data"]
  print(form)

  newEntry = {
      "name":form["Name"],
      "entry":form["Entry"]    
  }

  newGB = requests.post(f"https://api.webflow.com/v2/collections/{gb_collection_id}/items/bulk", headers = {
    "Authorization": f"Bearer {token}"
  }, json = {
        "fieldData": newEntry
  })

  print(json.dumps(newGB.text))
