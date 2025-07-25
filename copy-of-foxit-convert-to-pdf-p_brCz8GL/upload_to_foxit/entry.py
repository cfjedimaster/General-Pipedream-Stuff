import os 
import requests 

def handler(pd: "pipedream"):
  clientid = os.environ.get('FOXIT_CLIENT_ID')
  secret = os.environ.get('FOXIT_CLIENT_SECRET')
  HOST = os.environ.get('FOXIT_HOST')
  
  headers = {
    "client_id":clientid,
    "client_secret":secret
  }

  with open(pd.steps['download_to_tmp']['$return_value'], 'rb') as f:
    files = {'file': (pd.steps['download_to_tmp']['$return_value'], f)}

    request = requests.post(f"{HOST}/pdf-services/api/documents/upload", files=files, headers=headers)

    return request.json()
