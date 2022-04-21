# Essential Libraries
import json
import os
import re
from sqlite3 import DatabaseError
import sys
import configparser
import mysql.connector
from detect_delimiter import detect

# Create File Method. Take 2 parameters:1)Filename 2)Data
def createFile(fName, data):
    file = open(fName, 'w+')
    file.write(data)
    file.close()
    return "SQL Created"

# From which file the column names are to be extracted.
inputFile = sys.argv[1]
tableName = sys.argv[2]
host = sys.argv[3]
username = sys.argv[4]
password = sys.argv[5]
dbname = sys.argv[6]

f = open(inputFile, 'r')
# print(f.name)
line = f.readline()  # Retrieves the first line of the input file
print(line)
delim = detect(line) #identify delimiter
print("Delimiter is "+str(delim))
content = f.readlines()
print(content[0])
# Splits the line based on delimiter and adds it to the header list
header = line.split(delim)
print("header"+ str(header))
cont1 = content[0].split(delim)
print("hello"+str(cont1))
f.close()

#function foridentify the datatype of table value 
def typeconst(c) :
    d = c.isalpha()
    if c.isalpha() == True :
        return "VARCHAR("+str(len(c))+")"
    else :
        return "INT("+str(len(c)+3)+")"



statement_prefix = "CREATE TABLE " + tableName + "("
#loop for creating core query 
for i in range(len(header)):
    X = typeconst(cont1[i])
    statement_prefix = statement_prefix + \
        ("{} "+ X +",").format(header[i].upper().strip(), str(header))
    # Appends every element from list to the file with datatype String


statement_suffix = "\n" + "COMMENT 'This is an example table'" + "\n" + "ROW FORMAT DELIMITED" + \
    "\n" + "FIELDS TERMINATED BY '|'" + "\n" + \
    "STORED AS TEXTFILE" + "\n" + "LOCATION '/etlhive';"

# Merge all the elements into one string
statement_sql = statement_prefix[:-1] + ")"

# Call the createFile method to create the hql
createFile("./tmps/"+tableName+ ".txt", statement_sql)
hello = statement_sql
jason = "["+"{"+'"Delimiter":'+'"'+str(delim)+'"'+","+'"header":'+'"'+str(header) +'"'+","+'"Query":'+'"'+hello+'"'+"}"+"]"



json_object = json.loads(jason)
json_str = json.dumps(json_object, indent=2)
print(json_str)





print('"header":'+ str(header))
print('"Query:"'+hello)
print("hdhdhdhdh"+jason)

# dbname =input("enter database name : ")
#print(dbname)
mydb = mysql.connector.connect(
    host = host,
    user = username,
    password = password,
    database = dbname
)
print(mydb)

mycursor = mydb.cursor()

mycursor.execute(statement_sql)
