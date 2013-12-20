Notes on getting started 
===================

Say, you want to run both the front end (localboards-ui) and the 
back end (api-localboards-org) on the same computer.

Say, you want to fork and contribute to these projects.... 

1. fork the projects in github web interface
2. clone them to your local drive
3. cd localboards-ui
    a. bundle install
    a. rake db:create 
    a. rake db:migrate
    a. rake db:seed
    a. Now we need to point localboards-ui at the backend
       i. vim app/assets/javascripts/api-localboards.js
       i. line four to look like this:
           ```domain: 'http://localhost:3001',```
    a. rails s 
4. Now in another terminal window...
4. cd ..
5. cd api-localboards-org
   a. bundle install
   a. rake db:create 
   a. rake db:migrate
   a. rake db:seed
   a. rails s -p 3001


