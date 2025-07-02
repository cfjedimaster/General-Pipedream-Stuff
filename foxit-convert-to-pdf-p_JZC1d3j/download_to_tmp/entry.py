import requests

def handler(pd: "pipedream"):
    download_url = pd.steps["trigger"]["event"]["link"]
    file_path = f"/tmp/{pd.steps['trigger']['event']['name']}"

    with requests.get(download_url, stream=True) as response:
      response.raise_for_status()
      with open(file_path, "wb") as file:
          for chunk in response.iter_content(chunk_size=8192):
            file.write(chunk)
            
    return file_path
    
