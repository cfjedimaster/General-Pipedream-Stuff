import os 
import requests 

def handler(pd: "pipedream"):

  clientid = os.environ.get('FOXIT_CLIENT_ID')
  secret = os.environ.get('FOXIT_CLIENT_SECRET')
  HOST = os.environ.get('FOXIT_HOST')
  
  headers = {
    "client_id":clientid,
    "client_secret":secret,
    "Content-Type":"application/json"
  }

  body = {
    "documentId": pd.steps['upload_to_foxit']['$return_value']['documentId']
  }

  base, extension = os.path.splitext(pd.steps['trigger']['event']['name'])
  print(extension) 

  api = pd.steps['extension_check']['$return_value']['api']
  
  print(f"{HOST}{api}")
  request = requests.post(f"{HOST}{api}", json=body, headers=headers)
  return request.json()

