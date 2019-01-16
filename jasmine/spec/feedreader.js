/* feedreader.js
 * Este é o arquivo spec que o Jasmine irá ler e contém todos os
 * testes que irão verificar o sistema ao fim do carregamento da página
 */

/* Todos os testes estão dentro do $() function, pois alguns testes necessitam utlizar elementos DOM.  */
$(function() {
    describe('RSS Feeds', function() {
        /* Primeiro teste, que verifica se a variável allFeeds foi defininida e não está vazia */
        it('are defined', function() {
            expect(allFeeds).toBeDefined(); 
            expect(allFeeds.length).not.toBe(0); 
        });

        /* Percorre cada elemento do array allFeeds para verificar se a propriedade URL está definida e não vazia */
        it('URL está definida e não vazia', function () {
           for (let feed of allFeeds) {
                expect(feed.url).toBeDefined(); //URL defininida
                expect(feed.url).not.toBeFalsy(); //URL não vazia
              }
        });
        /* Percorre cada elemento do array allFeeds para verificar se a propriedade NAME está definida e não vazia */
         it('name definido e não vazio', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //name definido
                expect(feed.name).not.toBeFalsy(); //name não vazio
            }
         });
    });
    describe('O menu', function() {
    
        /* Teste que verifica se o menu está oculto por padrão. O nome da classe é 'menu-hidden' */
        it ('menu oculto', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* Altera a visibilidade do menu quando clicado, e altera novamente quando clicado pela segunda vez*/
        it('altera a visibilidade quando o menu é clicado', function () {
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(false);
        $('.menu-icon-link').click();
        expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });      
    describe('Entradas iniciais', function() {
        /* Teste que verifica quando a função loadFeed é invocada. Como ela á assincrona é necessário usar a função beforeEach do Jasmine*/
        beforeEach(function(done){
            loadFeed(0, done);
        });
        it('quando a função loadFeed for chamada e concluir seu trabalho, exista pelo menos um elemento .entry no contêiner .feed', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0); //Garantir que exista ao menos um elemento .entry no contêiner .feed
        });
    });
    describe('Nova seleção de feed', function() {
         //* Teste que checa o carregamento de um novo feed e compara com o feed anterior para fazer com que o conteúdo mude */
        const feeds = []; //variável que vai armazenar os feeds
        beforeEach(function(done) { 
             loadFeed(1, function() { //carrega o feed do elemento "1" e o armazena
                feeds.push($('.feed').html());
                loadFeed(2, done); //carrega o feed do elemento "2"
            });
        });
        it('alterar o conteúdo do feed quando um novo feed for carregado pela função loadFeed, ', function () {
            feeds.push($('.feed').html());
            expect(feeds[1]).not.toEqual(feeds[2]); //compara os 2 arrays
        });
    });
}());
