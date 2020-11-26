# pip install paho-mqtt
import paho.mqtt.client as mqtt
import json
import time
#from mysqlText import *
import socket
HOST = '127.0.0.1'  #server address
PORT = 9640         # 서버에서 지정해 놓은 포트 번호입니다.

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("connected OK")
    else:
        print("Bad connection Returned code=", rc)

    sendMsg={'lat':36.396314, 'lng':127.352202}
    #msg=json.dumps(sendMsg)
    print('sendmsg', sendMsg)
    client.publish('server965', json.dumps(sendMsg),1);
    # time.sleep(2);
    # sendMsg={'lat':36.391319, 'lng':127.346937}
    # print('sendmsg', sendMsg)
    # client.publish('server965', json.dumps(sendMsg), 1);



def on_disconnect(client, userdata, flags, rc=0):
    print(str(rc))


def on_subscribe(client, userdata, mid, granted_qos):
    print("subscribed: " + str(mid) + " " + str(granted_qos))


def on_message(client, userdata, msg):
    print('received msg:'+str(msg.payload.decode("utf-8")))
    msgObj=json.loads(msg.payload)


client = mqtt.Client()

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_subscribe = on_subscribe
client.on_message = on_message

client.connect('18.185.228.239', 1883) #test.mosquitto.org: 5.196.95.208, mqtt://broker.hivemq.com=18.185.228.239 and 3.120.11.85
#client.subscribe('server965', 1)
#client.loop_start()
# sendMsg={'lat':36.396314, 'lng':127.352202}
# msg=json.dumps(sendMsg)
# print('sendmsg', sendMsg,'msg', msg, msg.encode())
# client.publish('server965', msg,1);
#client.loop_stop()
#client.disconnect()
client.loop_forever()