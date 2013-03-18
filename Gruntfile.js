/*global module: false*/
module.exports = function (grunt) {

    var widgetFiles = ['src/search.js', 'src/user.js', 'src/tslinks.js'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*\n * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "" : "" %>' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author%>;' +
                ' Licensed <%= pkg.license %>\n */\n'
        },
        jasmine: {
            test: {
                src: ['dist/templates.js', 'src/tsbar.js', widgetFiles],
                options: {
                    specs: 'test/*Spec.js',
                    helpers: ['test/lib/jquery.mockjax.js', 'test/fixtures.js', 'test/lib/jasmine-jquery-1.3.1.js'],
                    vendor: ['test/lib/jquery.js', 'test/lib/handlebars.runtime-1.0.rc.1.js'],
                    styles: ['src/css/search.css'],
                    timeout: 10000,
                    template: 'test/SpecRunner.tmpl',
                    host : 'http://127.0.0.1:8000/'
                }
            }
        },
        concat: {
            dist: {
                src: ['src/tsbar.js', 'dist/templates.js', widgetFiles],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js',
                options: {
                    banner: '<%= meta.banner %>'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                },
                options: {
                    banner: '<%= meta.banner %>'
                }
            }
        },
        connect: {
            uses_defaults: {}
        },
        watch: {
            test: {
                files: ['test/fixtures.js', '<%= jshint.files %>', '<%= jasmine.test.options.specs %>'],
                tasks: ['jshint', 'handlebars', 'jasmine']
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    $: true,
                    jQuery: true,
                    Handlebars: true,
                    tsbar: true,
                    tiddlyweb: true,
                    io: true,
                    console: true
                }
            },
            files: ['Gruntfile.js', 'src/**/*.js']
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

    grunt.registerTask('default', ['jshint', 'test', 'concat', 'uglify']);
    grunt.registerTask('test', ['handlebars', 'connect', 'jasmine']);
    grunt.registerTask('tdd-mode', 'watch files and run tests as you go', ['connect', 'jasmine:test:build', 'watch']);

    grunt.registerTask('update-tsapp', 'copy tsbar file to the tsapp for testing.', function () {

        this.requires('handlebars', 'concat');
        grunt.file.copy('test/lib/handlebars.runtime-1.0.rc.1.js', 'tsbarapp/assets/handlebars.js');
        grunt.file.copy('dist/tsbar-' + grunt.config('pkg.version') + '.js', 'tsbarapp/assets/tsbar.js');

		grunt.file.recurse('src/css', function(abspath, rootdir, subdir, filename) {

			grunt.file.copy('src/css/' + filename, 'tsbarapp/assets/' + filename);
		});
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
};
