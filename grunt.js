/*global module:false*/
module.exports = function (grunt) {

    var widgetFiles = ['src/search.js', 'src/user.js'];
    var depFiles = ['test/lib/jquery.js', 'test/lib/handlebars.runtime-1.0.rc.1.js'];
    var orderedHelpers = ['test/lib/jquery.mockjax.js', 'test/fixtures.js'];

    grunt.initConfig({
        pkg:'<json:package.json>',
        meta:{
            banner:'/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author%>;' +
                ' Licensed <%= pkg.license %> */'
        },
        lint:{
            files:['grunt.js', 'src/**/*.js']
        },
        jasmine: {
            src:[depFiles, orderedHelpers, 'dist/templates.js', 'src/tsbar.js', widgetFiles],
            specs: 'test/*Spec.js',
            helpers: 'test/lib/jasmine-jquery-1.3.1.js',
            timeout: 10000,
            template: 'test/SpecRunner.tmpl'
        },
        concat:{
            dist:{
                src:['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>', 'dist/templates.js', widgetFiles],
                dest:'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        min:{
            dist:{
                src:['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest:'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        watch:{
            files:['test/fixtures.js', '<config:lint.files>', '<config:jasmine.specs>'],
            tasks:'lint jasmine'
        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                boss:true,
                eqnull:true,
                browser:true
            },
            globals:{
                $:true,
                jQuery:true,
                Handlebars:true,
                tsbar:true,
                tiddlyweb:true,
                io:true,
                console:true
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'tswidgets.templates',
                    processName: function(filePath) {

                        var pieces = filePath.split("/");
                        return pieces[pieces.length - 1];
                    }
                },
                files: {
                    "dist/templates.js": "src/templates/*.hbs"
                }
            }
        }
    });

    grunt.registerTask('default', 'lint handlebars jasmine concat min');
    grunt.registerTask('test', 'handlebars jasmine');

    grunt.registerTask('update-tsapp', 'copy tsbar file to the tsapp for testing.', function () {

        this.requires('handlebars', 'concat');
        grunt.file.copy('test/lib/handlebars.runtime-1.0.rc.1.js', 'tsbarapp/assets/handlebars.js');
        grunt.file.copy('dist/tsbar-' + grunt.config('pkg.version') + '.js', 'tsbarapp/assets/tsbar.js');
    });

    grunt.loadNpmTasks('grunt-jasmine-runner');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
};
