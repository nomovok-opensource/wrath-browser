Building Debian packages
========================


Build source package
--------------------

Required step, even when building in a git checkout.

 debian/rules gen-source

Generates the orig tarballs that the source package requires. NOTE: It
doesn't use the current working directory, it copies what's in the tip
of master branches in the wrath-browser repository and wrath/webkit
submodule repositories. Commit before building.

 dpkg-buildpackage -us -uc -S

Generates the actual source package. This step will fail if you had
uncommitted edits left over.


Build binary package
--------------------

The use of pbuilder is recommended. If setting up pbuilder is not
desired, you can just leave out the flag -S from the above
dpkg-buildpackage invokation.

Setting up pbuilder:

 sudo pbuilder create --distribution wheezy

or

 sudo pbuilder create --distribution precise

Depending on whether setting up a Debian or Ubuntu pbuilder. If
setting up a Ubuntu pbuilder on a system running Debian or vice versa,
you also need the flag --mirror http://suitable.mirror/address. If the
architecture doesn't match the running system (i386 vs amd64), you
also need --architecture i386.

Using pbuilder:

 sudo pbuilder build path/to/wrath-browser_version.dsc

Where the .dsc file is generated in the above "build source package"
step. The binary package will end up in /var/cache/pbuilder/result if
another location is not specified with the flag --buildresult
/some/path.
