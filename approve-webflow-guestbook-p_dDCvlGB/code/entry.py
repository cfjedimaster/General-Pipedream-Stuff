import json 
import requests 
import os 

def handler(pd: "pipedream"):

  # This ID refers to the guest book collection
  gb_collection_id = "692f445ff122275e9c5e3b71"
  # API token for site, make env
  token = os.environ.get("WEBFLOW_SITE_KEY_CATS")

