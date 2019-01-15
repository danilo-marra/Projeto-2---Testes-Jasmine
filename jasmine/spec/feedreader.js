/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URL está definida e não vazia', function () {
           for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); //URL defininida
                expect(feed.url).not.toBeFalsy(); //URL não vazia
              }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name definido e não vazio', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //name definido
                expect(feed.name).not.toBeFalsy(); //name não vazio
            }
         });
    });
    /* TODO: Write a new test suite named "The menu" */
    describe('O menu', function() {
    
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it ('menu oculto', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

        it('altera a visibilidade quando o menu é clicado', function () {
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });      
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Entradas iniciais', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('quando a função loadFeed for chamada e concluir seu trabalho, exista pelo menos um elemento .entry no contêiner .feed', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('Nova seleção de feed', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        const feeds = [];
        beforeEach(function(done) {
             loadFeed(1, function() { //carrega o feed do elemento "1" e o armazena
                feeds.push($('.feed').html());
                loadFeed(2, done); //carrega o feed do elemento "2"
            });
           
        });
        it('quando um novo feed for carregado pela função loadFeed, o conteúdo realmente mude', function () {
            feeds.push($('.feed').html());
            expect(feeds[1]).not.toEqual(feeds[2]); //compara os 2 arrays
        });
    });
}());
