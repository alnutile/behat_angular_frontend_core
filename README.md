## Behat Angular Front end

  * Demo can be seen at http://angular.behateditor.io

## Mock data

This can be seen in app_dev.js

Using the e2eMock from Angular (see app_dev.js)

## Snap/Slide out window

~~~
snapRemote.open('right'); will open the window
snapRemote.close(); to close
~~~

Pull it in using 'snapRemote' dependency

Template needs to be wrapped in snap

So the template starts with

~~~
<ng-include src="snap.url"></ng-include>
<snap-content snap-options="snapOpts">
</snap-content>
~~~

like app/templates/tests/test-edit.html

You can defind snap options

~~~
	/** SETUP PAGE **/
	$scope.snapOpts = {
			minPosition: '-400',
			touchToDrag: false
	};
~~~

And of course define the snap url

~~~
$scope.snap                         = { name: 'snap', url: 'templates/shared/snap_test_output.html'}
~~~

or better yet just do

~~~
<ng-include src="'templates/shared/snap_test_output.html'"></ng-include>
<snap-content snap-options="snapOpts">
</snap-content>
~~~

Most pages already have this so just make sure that you do really need to add it.

~~~

That one file has a snap_content model that it will open and show the data if there is any
