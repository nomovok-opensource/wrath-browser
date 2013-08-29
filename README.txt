WRATHWebKit is a proof of concept of using WRATH to draw web content.
Various features are not supported and there are rendering issues as well.
WRATHWebKit's starting point, is QtWebKit. The QtTestBrowser has been
modified to render with WRATH or via Qt's QPainter. The Qt side of QtWebKit
is mostly used as a conveniant intermediary to get data to send to WRATH
by going through Qt. This is not optimal and definitely not the right thing 
to do; in an ideal world Qt would not have been used at all and a dedicated
WRATH target would have been made. We do not live in an ideal world.

WRATH has a declarative data driven model to present user interfaces;
to have text present one creates a text item, to present an image
one creates an image item, and so forth. WebKit on the other hand uses an
imperative model as its base to present a user interface; to present text
issue a draw text command, to preset an image issue a draw image command
and so forth. WRATHWebKit essentially adds a method to update or
create those items to each class that has a paint method.

The details of that mechanism are as follows, a new virtual
method is added to RenderObject:

readyWRATHWidgets(PaintedWidgetsOfWRATHHandle &hnd,  
                  PaintInfoOfWRATH &paintInfo,
                  int tx, int ty)

PaintInfoOfWRATH is the WRATH specific analogue of
PaintInfo, tx and ty are as in paint(PaintInfo& paintInfo, int tx, int ty).
A PaintedWidgetsOfWRATHHandle is a handle wrapper to hold
the items of the object implementing readyWRATHWidgets.
That handle object holds the WRATH items and the object
implementing readyWRATHWidgets DOES not hold the WRATH
objects. This was necessary as there are situations where 
a fixed object has a paint method called with different arguments,
by placing the WRATH objects in a handle, one can simulate
such repeated calls by passing a different handle.

The implementation of each readyWRATHWidgets() function closely
mirrors that paint() functions: functions are broken up in similar
fashion with similar named sub functions (for example for paintObject, 
one has readyWRATHWidgetObject). The functions use the WRATHWidgetGenerator
interface to create the widgets and to make sure the z-ordering
is the order in which webkit would normally draw them.


Drawing and Updating
--------------------------------------------

Actual -drawing- of WRATH object is quite fast and allows
for scrolling and zooming on embedded devices (such as the N9).
The result is that fast scrolling of web content does not
generate blank zones and text is drawn always sharp.

However, updating the WRATH objects can be quite slow; indeed,
the updating requires checking if the "properties" of the 
WebCore::RenderFoo object have changed and if so to update
or reconstruct the widget. Updating, even with screen culling
active (see WebCore::ScrollView) means that much larger porions
of the render tree need to be walked to get it correct since
there is no "blit". In addition, screen culling is implemented
by breaking a ScrollView's region into sub-regions; updates
happen on just those sub-regions visible (it is possible to also
request full update too), but items that are present across
two sub-regions are then present in the WRATH render tree twice:
once clipped in the first and once clipped to the second 
sub-region.

At the end of the day, forcing the data driven model on WebKit
via supplementing RenderObject (and a few other classes) is
not the correct way to do this. The correct way to use WRATH
to render web content is that the rendering from the ground up
needs to be made with a data driven model in mind. For WebKit
that essentially means deleting the entire rendering code base,
rewriting that code base from scratch AND modifying the bits that
talk/create/manipulate that code base to send messages to the
WRATH object that their values changed and how. 
