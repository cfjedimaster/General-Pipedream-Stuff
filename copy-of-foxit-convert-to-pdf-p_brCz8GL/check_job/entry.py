import os 
import requests 
from time import sleep 

def handler(pd: "pipedream"):

  clientid = os.environ.get('FOXIT_CLIENT_ID')
  secret = os.environ.get('FOXIT_CLIENT_SECRET')
  HOST = os.environ.get('FOXIT_HOST')
  
  headers = {
    "client_id":clientid,
    "client_secret":secret,
    "Content-Type":"application/json"
  }

  done = False
  while done is False:

    request = requests.get(f"{HOST}/pdf-services/api/tasks/{pd.steps['create_conversion_job']['$return_value']['taskId']}", headers=headers)
    status = request.json()
    if status["status"] == "COMPLETED":
      done = True
      # really only need resultDocumentId, will address later
      return status
    elif status["status"] == "FAILED":
      print("Failure. Here is the last status:")
      print(status)
      pd.flow.exit("Failure in job")
      sys.exit()
    else:
      print(f"Current status, {status['status']}, percentage: {status['progress']}")
      sleep(5)
