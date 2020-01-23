  # Install MongoDB
  
  Install the mongoDB server
  
    $ sudo yum install -y mongodb-org mongodb-org-server
     No match for argument: mongodb-org
     No match for argument: mongodb-org-server
     
  If error messages come up, then you will have to make an repository for MongoDB
  
    $ vim /etc/yum.repos.d/mongodb-org-4.2.repo
    
    # add below notes
    [mongodb-org-4.2]   
    name=MongoDB Repository
    baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
    gpgcheck=1
    enabled=1
    gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
    
You can install it from now on.    

    $ sudo yum install -y mongodb-org
    ...
    Complete!
    
    
Version check

    $ mongod --version
    $ mongo --version
    
   
# Start MongoDB

    $ sudo service mongod start
    
    Redirecting to /bin/systemctl status mongod.service
    ● mongod.service - MongoDB Database Server
       Loaded: loaded (/usr/lib/systemd/system/mongod.service; enabled; vendor prese>
       Active: active (running) since Thu 2020-01-23 20:21:30 KST; 10s ago
         ...
         
    $ mongo
    
# Using MongoDB

Show all DBs

    > show dbs
      admin   0.000GB
      config  0.000GB
      local   0.000GB
      
Select DB name

    > use mongodb_tutorial

Write data in the DB

    > db.sample.insert({"name": "sample"});
    > show dbs
      admin             0.000GB
      config            0.000GB
      local             0.000GB
      mongodb_tutorial  0.000GB

Remove DB
- Before using it, you must select a database.

    > db.dripDatabase() 
      { "dropped" : "mongodb_tutorial", "ok" : 1 }
    > show dbs
      admin   0.000GB
      config  0.000GB
      local   0.000GB
      
Create Collection
- db.createCollection(name, [options])

    > db.createCollection("books")
      { "ok" : 1 }
    > db.people.insert({"name": "velopert"})
        WriteResult({ "nInserted" : 1 })
    > show collections
        books
        people

Remove Collection

    > db.people.drop()
        true
    > show collections
        books
        
Insert Document 
 
    > db.books.insert({"name": "NodeJS Guide", "author": "Velopert"})
      WriteResult({ "nInserted" : 1 })
      
if you want to insert multiple documents, you can put it into Array.

    > db.books.insert([
        ... { "name": "Book1", "author": "Velopert" },
        ... { "name": "Book2", "author": "Velopert" }
        ... ])
        
     BulkWriteResult({
      "writeErrors" : [ ],
      "writeConcernErrors" : [ ],
      "nInserted" : 2,     # successfully added
      "nUpserted" : 0,
      "nMatched" : 0,
      "nModified" : 0,
      "nRemoved" : 0,
      "upserted" : [ ]
    })

View Documents
 
    > db.books.find()
        { "_id" : ObjectId("5e2987b9dd8593d1a93c5708"), "name" : "NodeJS Guide", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c5709"), "name" : "Book1", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }

Remove Documents
 - db.collection_name.remove(criteria, [justOne]);
 
    > db.books.remove({"name": "NodeJS Guide"})
        WriteResult({ "nRemoved" : 1 })
    >  db.books.find()
        { "_id" : ObjectId("5e298840dd8593d1a93c5709"), "name" : "Book1", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }
        
    > db.books.remove({"author": "Velopert"}, true)
        WriteResult({ "nRemoved" : 1 })
    >  db.books.find()
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }
        

        
