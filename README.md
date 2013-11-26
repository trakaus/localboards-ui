localboards.org
===============

Welcome. This is the user interface of localboards.org. For example:

http://douglas.ne.localboards.org/boards/ - All the City of Omaha government boards. (Douglas county, Nebraska, USA) 

This website was created by volunteers during [HackOmaha 2013](https://twitter.com/HackOmaha), a civic coding event.

The API can be forked at https://github.com/noahkoch/OrgOrg

The data
--------

The data was (mostly) discovered in .pdf files spread all over the Internet. 2 team members spent 2 full days 
scraping information out of those documents and organizing it into a shared Google Drive spreadsheet. Those sheets
were exported and are available [here](https://github.com/noahkoch/OrgOrg/tree/master/db/human_data_entry).
Those sheets are read by [seeds.rb](https://github.com/noahkoch/OrgOrg/blob/master/db/seeds.rb) which loads the data
into the database. 


The source code
---------------

There are two tiers in this stack. Both are writen in [Ruby on Rails](http://rubyonrails.org/) and deployed to 
the [Heroku](http://heroku.com) cloud.

github repositories:
* https://github.com/trakaus/localboards-ui - Front end web user interface for humans
* https://github.com/noahkoch/OrgOrg - Back end REST API for computers

The front end merely hits the back and then makes it pretty for humans. 

Computers hit the back end directly. e.g.:

<tt>http://api.localboards.org/states/NE/boards/2</tt>
    
The back end is documented (extremely poorly by me (Jay Hannah)) here:

<tt>http://api.localboards.org/docs/</tt>

[You can contribute to building out our API specs](https://github.com/noahkoch/OrgOrg/tree/master/public/docs/specs)
by following the ones written on the [API README](https://github.com/noahkoch/OrgOrg/blob/master/README.md)


Our Hack Omaha 2013 Team
------------------------

* Mitch Barry @mitchbarry http://google.com/+MitchellBarry
* Dave Burchell evaddnomaid@gmail.com
* lora.frecks@gmail.com
* Jay Hannah @deafferret http://jays.net jay@jays.net
* Noah Koch @noahkoch noahtkoch@gmail.com
* Ryan Walker w.ryan.walker@gmail.com 
* Cody Winchester cjwinchester@gmail.com 


Other contributors
------------------

You! Fork this project and send us pull requests!

