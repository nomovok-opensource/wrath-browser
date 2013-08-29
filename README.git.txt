If you just cloned this repository, or the directories `wrath' and
`webkit' are empty for any other reason, you need to run

 git submodule init
 git submodule update


Making commits to submodules
============================

Make sure you're checked out a named branch. In a normal state of
business, submodules are in a detached state, meaning a commit is
checked out by name and you're not on a branch.

 git checkout -b master origin/master

Or if you have done that at least once before,

 git checkout master

Now you can make edits like normal and create commits. Remember to
push.


Updating this repository
========================

After you have made commits to submodules and remembered to push them,
update this integration repository. Once the browser project is fully
underway, be sure to commit a submodule combination that is tested to
work.

Below, 'penguin' refers to the directory (wrath or webkit) you're updating.

 git add penguin
 git commit

*******************
NOTE NOTE NOTE NOTE
*******************

MAKE SURE you don't accidentally have penguin/ (the trailing slash) in
that last command, as tab-completion usually gives you. That would
mean "discard the submodule, add the files themselves to _this_
repository as a commit". We don't want that.


Getting updates done by others
==============================

This is done when the submodule pointers are kept up-to-date, which is
for the future mostly when only certain revision combinations are
tested to work.

 git pull
 git submodule foreach 'git fetch'
 git submodule update


Getting updates done by others in a submodule
=============================================

Use this ritual when you don't care about the combination but want the
tips of both submodules.

 git submodule foreach 'git pull'
