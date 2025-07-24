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

  print(pd.steps['trigger']['event']['name'])
  base, extension = os.path.splitext(pd.steps['trigger']['event']['name'])
  print(extension) 

  api = None 
  if extension == ".docx":
    api = "/pdf-services/api/documents/create/pdf-from-word"
  elif extension == ".xlsx":
    api = "/pdf-services/api/documents/create/pdf-from-excel"
  elif extension == ".pptx":
    api = "/pdf-services/api/documents/create/pdf-from-ppt"
  else:
    return pd.flow.exit(f"Exiting workflow due to unknow extension: {extension}.")

  print(f"{HOST}{api}")
  request = requests.post(f"{HOST}{api}", json=body, headers=headers)
  return request.json()

