QMAKE=qmake
WRATHDIR=wrath
WRATHINCS=wrath/inc/WRATH
WEBKITDIR=webkit

CXXSELECT=
CCSELECT=
ifneq ($(findstring environment,$(origin CXX)),)
CXXSELECT = --qmakearg=QMAKE_CXX=$(CXX)
export CXX
endif
ifneq ($(findstring environment,$(origin CC)),)
CCSELECT = --qmakearg=QMAKE_CC=$(CC)
export CC
endif

BUILDWEBKIT=Tools/Scripts/build-webkit --qt --wrath --no-webkit2 --no-svg --no-tiled-backing-store --no-accelerated-2d-canvas --no-video --no-3d-canvas --no-netscape-plugin $(CCSELECT) $(CXXSELECT)

all: wrathlib webkit

debug: wrathdebug webkitdebug

release: wrathrelease webkitrelease

wrathlib: wrathrelease wrathdebug

$(WRATHDIR)/debug/libWRATH_Qt_Debug.so: FORCE_NGL
	$(MAKE) -C $(WRATHDIR) BUILDTARGETS=qt wrath-lib-qt-debug

wrathdebug: $(WRATHDIR)/debug/libWRATH_Qt_Debug.so

$(WRATHDIR)/release/libWRATH_Qt_Release.so: FORCE_NGL
	$(MAKE) -C $(WRATHDIR) BUILDTARGETS=qt wrath-lib-qt

wrathrelease: $(WRATHDIR)/release/libWRATH_Qt_Release.so

# A kludge to force ngl (and wrath dep files) to exist before issuing multiple build commands
# in wrath directory
FORCE_NGL:
	$(MAKE) -C $(WRATHDIR) BUILDTARGETS=qt ngl

webkit: webkitdebug webkitrelease

webkitdebug: webkitdebugtools wrathdebug

webkitrelease: webkitreleasetools wrathrelease

# This is ugly. Pass -jn to webkit's make, where n is the number of cpus.
MAKEARGS=-j$(shell grep -c processor /proc/cpuinfo)

$(WEBKITDIR)/WebKitBuild/Debug/Makefile $(WEBKITDIR)/WebKitBuild/Debug/Makefile.Tools: Makefile | wrathdebug
	cd $(WEBKITDIR) && \
	$(BUILDWEBKIT) --debug --wrathpath="$(abspath $(WRATHINCS))" --wrathlibs="-L$(abspath $(WRATHDIR)/debug) -lWRATH_Qt_Debug" "--makeargs=$(MAKEARGS)"

$(WEBKITDIR)/WebKitBuild/Debug/Makefile.Tools: | $(WEBKITDIR)/WebKitBuild/Debug/Makefile

webkitdebuglibs: wrathdebug $(WEBKITDIR)/WebKitBuild/Debug/Makefile
	cd $(WEBKITDIR)/WebKitBuild/Debug && $(MAKE)

webkitdebugtools: wrathdebug webkitdebuglibs $(WEBKITDIR)/WebKitBuild/Debug/Makefile.Tools
	cd $(WEBKITDIR)/WebKitBuild/Debug && $(MAKE) -f Makefile.Tools

$(WEBKITDIR)/WebKitBuild/Release/Makefile $(WEBKITDIR)/WebKitBuild/Release/Makefile.Tools: Makefile | wrathrelease
	cd $(WEBKITDIR) && \
	$(BUILDWEBKIT) --release --wrathpath="$(abspath $(WRATHINCS))" --wrathlibs="-L$(abspath $(WRATHDIR)/release) -lWRATH_Qt_Release" "--makeargs=$(MAKEARGS)"

$(WEBKITDIR)/WebKitBuild/Release/Makefile.Tools: | $(WEBKITDIR)/WebKitBuild/Release/Makefile

webkitreleaselibs: wrathrelease $(WEBKITDIR)/WebKitBuild/Release/Makefile
	cd $(WEBKITDIR)/WebKitBuild/Release && $(MAKE)

webkitreleasetools: wrathrelease webkitreleaselibs $(WEBKITDIR)/WebKitBuild/Release/Makefile.Tools
	cd $(WEBKITDIR)/WebKitBuild/Release && $(MAKE) -f Makefile.Tools

clean:
	-make -C $(WRATHDIR) clean
	cd $(WEBKITDIR)/WebKitBuild/Debug && make clean || true
	cd $(WEBKITDIR)/WebKitBuild/Release && make clean || true

.PRECIOUS: $(WEBKITDIR)/WebKitBuild/Debug/Makefile $(WEBKITDIR)/WebKitBuild/Debug/Makefile.Tools $(WEBKITDIR)/WebKitBuild/Release/Makefile $(WEBKITDIR)/WebKitBuild/Release/Makefile.Tools

.PHONY: all release debug wrathlib wrathrelease wrathdebug webkit webkitrelease webkitdebug webkitreleasetools webkitreleaselibs webkitdebugtools webkitdebuglibs clean FORCE_NGL
