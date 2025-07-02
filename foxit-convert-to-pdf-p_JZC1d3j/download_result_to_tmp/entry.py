import requests
import os

def handler(pd: "pipedream"):
  clientid = os.environ.get('FOXIT_CLIENT_ID')
  secret = os.environ.get('FOXIT_CLIENT_SECRET')
  HOST = os.environ.get('FOXIT_HOST')

  headers = {
    "client_id":clientid,
    "client_secret":secret,
  }

  # Given a file of input.docx, we need to use input.pdf
  base_name, _ = os.path.splitext(pd.steps['trigger']['event']['name'])
  path = f"/tmp/{base_name}.pdf"
  print(path) 
  
  with open(path, "wb") as output:
		
    bits = requests.get(f"{HOST}/pdf-services/api/documents/{pd.steps['check_job']['$return_value']['resultDocumentId']}/download", stream=True, headers=headers).content 
    output.write(bits)
            
    return {
      "filename":f"{base_name}.pdf",
      "path":path
    }
    
