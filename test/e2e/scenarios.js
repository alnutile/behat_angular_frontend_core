'use strict';

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('behatEditor', function() {

  browser.get('index.html');

    describe('Sites all page or the Dashboard', function(){
        it('sites page it should see site 2 mock', function(){
            var sites = element(by.repeater('site in sites').row(1));
            expect(sites.getText()).toEqual('Test 2 working mock view');
        });

        it('clicking site 2 should bring me to the site\'s page', function(){
            var button = element(by.css('a#site-2'));
            button.click();
            expect(browser.getLocationAbsUrl()).toMatch("/sites/2");
        });
    });

    describe('Site page and it\'s list of tests', function(){
        beforeEach(function() {
          browser.get('index.html#/sites/2');
        });

        it('sites page it should see site 2 mock', function(){
            var sites = element(by.repeater('test in site.testFiles').row(1));
            expect(sites.getText()).toEqual('? test2.feature ? view edit');
        });

        //browser.debugger();
        it('click create test should take me there', function(){
            var button = element(by.css('a#create-test'));
            button.click();
            expect(browser.getLocationAbsUrl()).toMatch("/sites/2/tests/new");
        });

        it('click edit test should take me there', function(){
            var button = element(by.css('a#site-edit-2'));
            button.click();
            expect(browser.getLocationAbsUrl()).toMatch("http://localhost:8000/app/index.html#/sites/2/tests/test1_feature/edit");
        });

        it('click view test should take me there', function(){
            var button = element(by.css('a#site-view-2'));
            button.click();
            expect(browser.getLocationAbsUrl()).toMatch("http://localhost:8000/app/index.html#/sites/2/tests/test1_feature");
        });

    });

    describe('Test View should allow me to run the test', function(){
        beforeEach(function() {
            browser.get('index.html#/sites/2/tests/test2_feature');
        });

        it('click run to run a test should see results and alert', function(){
            var button = element(by.css('button#run-test'));
            button.click();
            var alerts = element(by.repeater('alert in alerts').row(1));
            expect(alerts.getText()).toContain("Test Completed...");

            var alerts = element(by.repeater('alert in alerts').row(0));
            expect(alerts.getText()).toContain("Running test...");
        });

    });

    describe('Test Edit should allow me to do a lot', function(){
        beforeEach(function() {
            browser.get('index.html#/sites/2/tests/test2_feature/edit');
        });

        it('should see tags', function(){
            browser.browser.ignoreSynchronization = true;
            element(by.model('steps.testDetails.tag')).sendKeys('@tag');

            var button = element(by.css('button#add-details'));
            button.click();

            var test_content = element(by.model('test_content'));
            browser.debugger();

            expect(test_content).toContain('@tag');
        });

    });
//    it('It should show the dash', function() {
//      expect(element.(by.repeater('site in sites').row(3).column(1))).
//        toMatch(/Test 2 working mock/);
//    });

//  describe('view1', function() {
//
//    beforeEach(function() {
//      browser.get('index.html#/view1');
//    });
//
//
//    it('should render view1 when user navigates to /view1', function() {
//      expect(element.all(by.css('[ng-view] p')).first().getText()).
//        toMatch(/partial for view 1/);
//    });
//
//  });
//
//
//  describe('view2', function() {
//
//    beforeEach(function() {
//      browser.get('index.html#/view2');
//    });
//
//
//    it('should render view2 when user navigates to /view2', function() {
//      expect(element.all(by.css('[ng-view] p')).first().getText()).
//        toMatch(/partial for view 2/);
//    });
//
//  });
});
