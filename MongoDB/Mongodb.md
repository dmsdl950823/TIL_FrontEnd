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

```
    > db.dripDatabase() 
      { "dropped" : "mongodb_tutorial", "ok" : 1 }
    > show dbs
      admin   0.000GB
      config  0.000GB
      local   0.000GB
```
      
Create Collection

- db.createCollection(name, [options])

```
    > db.createCollection("books")
      { "ok" : 1 }
    > db.people.insert({"name": "velopert"})
        WriteResult({ "nInserted" : 1 })
    > show collections
        books
        people
```

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
 - db.collection_name.find([query],[projection])
 
    > db.books.find()
        { "_id" : ObjectId("5e2987b9dd8593d1a93c5708"), "name" : "NodeJS Guide", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c5709"), "name" : "Book1", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }
        
    > db.books.find().pretty()
        {
          "_id" : ObjectId("5e298840dd8593d1a93c570a"),
          "name" : "Book2",
          "author" : "Velopert"
        }
        {
          "_id" : ObjectId("5e298d1bdd8593d1a93c570b"),
          "name" : "Book1",
          "author" : "Velopert"
        }
        {
          "_id" : ObjectId("5e298d1bdd8593d1a93c570c"),
          "name" : "Book2",
          "author" : "Velopert"
        }


Remove Documents
 - db.collection_name.remove(criteria, [justOne]);
 
 ```
    > db.books.remove({"name": "NodeJS Guide"})
        WriteResult({ "nRemoved" : 1 })
    >  db.books.find()
        { "_id" : ObjectId("5e298840dd8593d1a93c5709"), "name" : "Book1", "author" : "Velopert" }
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }
        
    > db.books.remove({"author": "Velopert"}, true)
        WriteResult({ "nRemoved" : 1 })
    >  db.books.find()
        { "_id" : ObjectId("5e298840dd8593d1a93c570a"), "name" : "Book2", "author" : "Velopert" }
```    


# Insert Query
MongoDB can filter the result through the conditions.

### Comaprison operator
|operator|explanation|
|------|---|
|$eq|equal|
|$gt|greater than|
|$gte|greater than or equal|
|$lt|less than|
|$lte|less than or equal|
|$ne|not equal|
|$in|values within the Array|
|$nin|values not within the Array|


    > db.numbers.find({"value": 56})
      # Tt will show results filtered "value" key is the same with 56
    
    > bd.numbers.find({"value": { $gt: 100 } })
      # It will show results filtered "value" key is bigger than 100
      
    > db.numbers.find({"value": { $gt: 0, $lt: 100 })
      # It will show results filtered between bigger than 0 and less than 100
      
    > db.numbers.find({"value": { $gt: 0, $lt: 100, $nin: [12, 33] })
      # It will show results filtered between bigger than 0 and less than 100 within given array.
      

## Logic operator
|OR|AND|NOT|NOR|
|------|---|---|---|
|$or|$and|$not|$nor|

    > db.articles.find({ $or: [ {"title": "article01"}, {"writer": "Alpha"}] })
      # It will show results filtered either "title" key is "article01" || "writer" key is "Alpha"
      
    > db.articles.find({ $and: [ {"writer": "Velopert"}, {"likes": { $lt: 10 } }] })
      # It will show results filtered either "writer" key is "Velopert" && "likes" key is less than 10
      # Similar with =>     db.articles.find( {"writer": "Velopert"}, {"likes": { $lt: 10 } })
      

## Regex Operator
you can find Document by using $regex operator.

    > db.article.find( {"title": /article0[1-2] } )
    > db.article.find( {"writer": /velopert/i } )
    
|operator|explanation|
|------|---|
|i|ignore case|
|m| ... |
|x|ignore all whitespaces|
|s|including \n, using '.'|


## $where Operator
You can use javascript expression with 'where operator'

    > db.article.find({ $where: "this.comments.length == 0" }).pretty()
       # It will show results filtered the condition with JS syntax
       
## $elementMatch Operator
Using it when you query the Array of subdocument (embedded document).

    > db.articles.find({ "comments": { $elementMatch: { "name": "Charlie" } } })


# [projection] 
- db.collection_name.find([query], [projection])

```
    > db.articles.find({}, {"id": false, "title": true, "content": true })
```
    
## $slice Operator
When subdocument array is read, make a limitation.

    > db.articles.find({ "title": "article03", { commetns: { $slice: 1 } } })
    
## $elemMatch Operator
In an Array, it prints certain subdocument.

    > ★★★★★★★★★★★★★★★
    


    



