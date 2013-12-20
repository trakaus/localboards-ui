Notes on getting started 
===================

Say, you want to run both the front end (localboards-ui) and the 
back end (api-localboards-org) on the same computer.

Say, you want to fork and contribute to these projects.... 

1. fork the projects in github web interface
2. clone them to your local drive
3. cd localboards-ui
    1. bundle install
    1. rake db:create 
    1. rake db:migrate
    1. rake db:seed
    1. Now we need to point localboards-ui at the backend
        1. vim app/assets/javascripts/api-localboards.js
        1. line four to look like this:
           ```domain: 'http://localhost:3001',```
    1. rails s 
4. Now in another terminal window...
4. cd ..
5. cd api-localboards-org
   1. bundle install
   1. rake db:create 
   1. rake db:migrate
   1. rake db:seed
   1. rails s -p 3001


