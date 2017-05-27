# passContain

This application, requires the use of the internet for connection to the database. This application will allow you to create a username and password for logins. You will then be asked to create 2 extra security measures, as well as fill out three questions, which you will need to remember. The point is that when you upload a file, or import all your important data, you will need to sign in and then verify that you know at least one of the three security parts

What has been completed?
	- a random user can sign in, using the front page, it will then display a link to add passwords
	- you can add three total levels, including 6-digit numeric, and 10-character passwords, and security questions

What needs to be done?
	- data encryption - either through mongoDB, or JavaScript encryption service
	- putting files in the database and allowing for protection there

Need to initialize?
	- first terminal window - cd /usr/local/Cellar && sudo mongod --port 27106 --logpath /Users/kevindeems/projects/passContain/mongoLogs/mongoPort27106.log --logappend
	- second terminal (new tab from first) - sudo mongo --port 27106
	- third terminal - cd ~/projects/passContain && nodemon start
