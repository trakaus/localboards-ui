localboards.org
===============

Welcome. This is the user interface of localboards.org. For example:

http://douglas.ne.localboards.org/boards/ - All the City of Omaha government boards. (Omaha, Nebraska, USA) 

This website was created by volunteers during [HackOmaha 2013](https://twitter.com/HackOmaha), a civic coding event.


The data
--------

The data was (mostly) discovered in .pdf files spread all over the Internet. 2 team members spent 2 full days 
scraping information out of those documents and organizing it into a shared Google Drive spreadsheet. Those sheets
were exported and are available [here](https://github.com/noahkoch/OrgOrg/tree/master/db/human_data_entry).
Those sheets are read by [seeds.rb](https://github.com/noahkoch/OrgOrg/blob/master/db/seeds.rb) which loads the data
into the database. 

There are two tiers in this stack. Both are writen in [Ruby on Rails](http://rubyonrails.org/) and deployed to 
the [Heroku](http://heroku.com) cloud.


The source code
---------------

github repositories:
* https://github.com/trakaus/localboards-ui - Front end web user interface for humans
* https://github.com/noahkoch/OrgOrg - Back end REST API for computers

The front end merely hits the back and then makes it pretty for humans. 

Computers hit the back end directly. e.g.:

http://api.localboards.org/states/NE/boards/2
    
The back end is documented (extremely poorly by me (Jay Hannah)) here:

http://api.localboards.org/docs/

You can create / fix those docs by adding things here:

https://github.com/noahkoch/OrgOrg/tree/master/public/docs/specs

Please do!


The Hack Omaha 2013 Team
------------------------

* Jay Hannah @deafferret http://jays.net jay@jays.net
* ...hey guys, add yourselves!


Other contributors
------------------

You! Fork this project on github and send us pull requests!

