One quick and dirty way to create a .deb (including for N9) that skips 
making the source package and allowing one to build from source that is
not the same as that found in the repo is as follows:

 dpkg-buildpackage -us -uc -nc

will build the binary .deb "from the current state", i.e. not checking
if the source directoyr contents matches the git repo. It builds using
the source directory contents in-place. In particular one can modify
a source file, build again and have a new package with the modification
just made.


Scratchbox being what it is needs some tweaking:

 1) debian/compat: change 8 to 7 
 2) debian/control:
   a) remove libboost-dev from dependencies
   b) change deb-helper (>=8) to deb-helper (>=7)
 3) to add an icon to the homescreen for wrath-webkit: 
   a) add to debian/rules, under override_dh_auto_install:
      install debian/WRATHWebKit.desktop $$(pwd)/debian/wrath-browser/usr/share/applications/
   b) add to debian/wrath-browser.dirs:
      /usr/share/applications/

 
