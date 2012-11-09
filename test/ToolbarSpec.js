describe('Toolbar', function() {

    beforeEach(function () {

        tsbar.clear();
    });

    afterEach(function () {

        $('#sandbox').html('');
    });

    it('should be initialised on script inclusion', function() {

        expect(typeof tsbar).toBe('object');
    });

    it('should have a function to create widgets', function() {

        expect(typeof tsbar.Widget).toBe('function');
    });

    it('should have a function to publish widgets to the toolbar', function() {

        expect(typeof tsbar.define).toBe('function');
    });

    it('should have a render function for choosing when to render', function() {

        expect(typeof tsbar.render).toBe('function');
    });

    describe('Toolbar widget jQuery DOM element', function() {

        it('should have no children given no parameters', function() {

            var myWidget = tsbar.Widget();

            expect(myWidget.children().length).toEqual(0);
        });

        it('should have both elements appended to the widget given an initial element and popup', function() {

            myWidget = tsbar.Widget({
                el:'<span>Hello World.</span>',
                popup:'This is a popup.'
            });

            expect(myWidget.text()).toEqual('Hello World.This is a popup.');
        });

        describe('Clicking on a widget toggles the "open" class', function() {

            var toolbar;

            beforeEach(function() {

                tsbar.define('left', tsbar.Widget({
                    el:'<button>Click me</button>',
                    popup:'<ul><li>list</li><li>of</li><li>items</li></ul>'
                }));

                toolbar = tsbar.render();
                $('#sandbox').append(toolbar);
            });

            it('should have no open widgets before clicking', function() {

                expect(toolbar.find('.open').length).toEqual(0);
            });

            it('should have the open class when clicked', function() {

                toolbar.find('.tsbar-widget button').click();

                expect(toolbar.find('.tsbar-widget')).toHaveClass('open');
            });

            it('should ...', function() {
                toolbar.find('.tsbar-widget button').click();
                toolbar.find('.tsbar-widget button').click();

                expect(toolbar.find('.open').length).toEqual(0);
            });
        });
    });

    describe('Toolbar renderer', function() {

        var toolbar;

        beforeEach(function() {

            tsbar.define('left', tsbar.Widget({
                el:'<span>Widget</span>',
                popup:'<span>Popup</span>',
                className:'class-name'
            }));

            toolbar = tsbar.render();
        });

        it('should have a single widget in the toolbar', function() {

            expect(toolbar.find('.tsbar-widget.class-name').length).toEqual(1);
        });

        it('should place the widget in the left section', function() {

            expect(toolbar.find('.tsbar-left').find('.class-name').length).toEqual(1);
        });

        it('should be able to add another widget after creating the toolbar in the right hand pane', function () {

            tsbar.define('right', tsbar.Widget({
                el:'<span>Hello World.</span>',
                popup:'This is a popup.'
            }));

            expect(toolbar.find('.tsbar-right').find('.tsbar-widget').length).toEqual(1);
        });
    });

    describe('Toolbar template', function() {

        it('should have three containers by default', function() {

            var toolbar = tsbar.render();

            expect(toolbar.children().length).toEqual(3);
        });

        it('should be overridden when the defaultTemplate property is set', function() {

            toolbar = tsbar.render({
                defaultTemplate:'<div></div>'
            });

            expect(toolbar.children().length).toEqual(0);
        });
    });
});
