import hmac
import hashlib
import json 
import time 
import os 
def handler(pd: "pipedream"):

  # In order to validate the call, I need the raw HTTP request, which means
  # I need to "find" the right header
  sig = None
  ts = None
  for x,h in enumerate(pd.steps["trigger"]["event"]["headers"]):
    if h == "X-Webflow-Signature":
      sig = pd.steps["trigger"]["event"]["headers"][x+1] 
    if h == "X-Webflow-Timestamp":
      ts = pd.steps["trigger"]["event"]["headers"][x+1] 
  
  body = pd.steps["trigger"]["event"]["body"]
  
  if sig == None or ts == None:
    pd.flow.exit("No webhook signature/timestamp provided")

  data = f"{ts}:{body}"
  key = os.environ.get("WEBFLOW_GUESTBOOK_WEBHOOK_KEY")

  key_bytes = key.encode('utf-8')
  data_bytes = data.encode('utf-8')
  
  digest = hmac.new(key_bytes, data_bytes, hashlib.sha256).hexdigest()

  if not hmac.compare_digest(digest, sig):
    pd.flow.exit("Invalid validation")

  current_time = int(time.time() * 1000)  # Convert current time to milliseconds
  if current_time - int(ts) > 300000:  # 5 minutes in milliseconds
    pd.flow.exit("Webhook too old") 
  