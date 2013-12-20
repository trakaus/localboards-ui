Notes on Workflow
================

Say, you have the projects cloned and you want to do some work.

After doing the one time setup, do this:

1.  git pull official

One time setup
---------------

1. vim .git/config
   a. Add this section:
<pre>
[remote "official"]
	fetch = +refs/heads/*:refs/remotes/origin/*
	url = git@github.com:trakaus/localboards-ui.git
</pre>

