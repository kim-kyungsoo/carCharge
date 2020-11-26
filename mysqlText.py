#pip install mysql-connector-python
import mysql.connector

def checkLogin(msgObj):
  mydb = mysql.connector.connect(host="localhost", user="root", password="", database="electric_car")
  mycursor = mydb.cursor()

  sql = f"select * from member where login= '{msgObj['login']}' and passwd= '{msgObj['passwd']}'"
  print(sql)
  mycursor.execute(sql)
  rows = mycursor.fetchall()
  print('rows', rows)
  if(len(rows)!=0):
    return (0)
  else:
    sql = f"select * from member where login= '{msgObj['login']}'"
    mycursor.execute(sql)
    rows = mycursor.fetchall()
    mycursor.close()
    if(len(rows)!=0):
      return(1)
    else:
      return(2)


def checkLoginId(msgObj):
  mydb = mysql.connector.connect(host="localhost", user="root", password="", database="electric_car")
  mycursor = mydb.cursor()
  sql = f"select * from member where name= '{msgObj['name']}' and phoneNumber= '{msgObj['phoneNumber']}'"
  print(sql)
  mycursor.execute(sql)
  rows = mycursor.fetchall()
  print('rows', rows);
  if(len(rows)!=0):
    print('rows', rows[0])
    msgObj=rows[0][0];
  else:
    msgObj=''
  mycursor.close()
  return (msgObj)

def changePasswd(msgObj):
  mydb = mysql.connector.connect(host="localhost", user="root", password="", database="electric_car")
  mycursor = mydb.cursor()
  sql = f"update member set passwd = '{msgObj['passwd']}' where login='{msgObj['login']}'"
  print(sql)
  mycursor.execute(sql)
  mydb.commit()
  sql = f"select * from member where passwd = '{msgObj['passwd']}' and login='{msgObj['login']}'"
  mycursor.execute(sql)
  rows = mycursor.fetchall()
  if(len(rows)==0):
    msgObj='nok'
  else:
    msgObj='ok'
  mycursor.close()
  return (msgObj)

def createMember(msgObj):
  mydb = mysql.connector.connect(host="localhost", user="root", password="", database="electric_car")
  mycursor = mydb.cursor()
  sql = f"insert into member(login, passwd, name, phoneNumber) values('{msgObj['login']}','{msgObj['passwd']}', '{msgObj['name']}', '{msgObj['phoneNumber']}')"
  print(sql)
  mycursor.execute(sql)
  mydb.commit()
  mycursor.close()
  return(0);

def duplexLogin(msgObj):
  mydb = mysql.connector.connect(host="localhost", user="root", password="", database="electric_car")
  mycursor = mydb.cursor()
  sql = f"select * from member where login= '{msgObj['login']}'"
  mycursor.execute(sql)
  rows = mycursor.fetchall()
  mycursor.close()
  if (len(rows) != 0):
    return (1)
  else:
    return (0)








