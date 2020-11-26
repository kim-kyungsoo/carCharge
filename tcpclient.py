import socket
import json

HOST = '127.0.0.1'  #server address
PORT = 9640         # 서버에서 지정해 놓은 포트 번호입니다.

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))
msg={"lat":23, "lng":24}
client_socket.sendall(msg.dumps()) # 메시지를 전송합니다.
data = client_socket.recv(1024) # 메시지를 수신합니다.
print('Received', repr(data.decode()))

client_socket.close()