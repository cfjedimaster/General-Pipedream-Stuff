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

  # To Do - consider branching logic based on doc type for input
  request = requests.post(f"{HOST}/pdf-services/api/documents/create/pdf-from-word", json=body, headers=headers)
  return request.json()

