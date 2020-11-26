# pip install paho-mqtt
import paho.mqtt.client as mqtt
import json
from mysqlText import *

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("connected OK")
    else:
        print("Bad connection Returned code=", rc)


def on_disconnect(client, userdata, flags, rc=0):
    print(str(rc))


def on_subscribe(client, userdata, mid, granted_qos):
    print("subscribed: " + str(mid) + " " + str(granted_qos))


def on_message(client, userdata, msg):
    print('receiveed msg:'+str(msg.payload.decode("utf-8")))
    msgObj=json.loads(msg.payload)

    if msgObj['msgId'] == 0:
        #print(msgObj)
        res=checkLogin(msgObj)
        msg={'msgId':10, 'login':res}
    elif msgObj['msgId']==1:
        res=checkLoginId(msgObj)
        msg = {'msgId': 11, 'login': res}
        print('res', msg)
    elif msgObj['msgId']==2:
        res=changePasswd(msgObj)
        msg = {'msgId': 12, 'result': res}
        print('res', msg)
    elif msgObj['msgId'] == 3:
        res = createMember(msgObj)
        msg = {'msgId': 13, 'result': res}
        print('res', msg)
    elif msgObj['msgId'] == 4:
        res = duplexLogin(msgObj)
        msg = {'msgId': 14, 'result': res}
        print('res', msg)
    client.publish('electric965', json.dumps(msg))
    print("send 965", msg)

client = mqtt.Client()

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_subscribe = on_subscribe
client.on_message = on_message

client.connect('35.156.70.158', 1883) #test.mosquitto.org: 5.196.95.208, mqtt://broker.hivemq.com=18.185.228.239, 35.156.70.158
client.subscribe('server965', 1)

client.loop_forever()