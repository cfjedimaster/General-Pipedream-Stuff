import os 
import requests 

def handler(pd: "pipedream"):
  clientid = os.environ.get('FOXIT_CLIENT_ID')
  secret = os.environ.get('FOXIT_CLIENT_SECRET')

	headers = {
		"client_id":id,
		"client_secret":secret
	}

	with open(path, 'rb') as f:
    print(pd.steps['download_to_tmp']['$return_value'])
		files = {'file': (pd.steps['download_to_tmp']['$return_value'], f)}

		request = requests.post(f"{HOST}/pdf-services/api/documents/upload", files=files, headers=headers)

		return request.json()

