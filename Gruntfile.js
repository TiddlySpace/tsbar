/* global module:false, require:false */
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
        bowerful: {
            src: {
                packages: {
                    'handlebars': ''
                },
                store: 'src/js/lib'
            },
            test: {
                packages: {
                    'jasmine-jquery': '',
                    'sinonjs': ''
                },
                store: 'test/lib'
            }
        },
        concat: {
            js: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['src/js/lib/handlebars/handlebars.runtime.js', 'dist/templates.js', 'src/js/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            },
            tid: {
                src: ['src/tsbar.meta', '<%= concat.js.dest %>'],
                dest: 'dist/<%= pkg.name %>.js.tid'
            },
            mintid: {
                src: ['src/tsbar.meta', '<%= uglify.js.dest %>'],
                dest: 'dist/<%= pkg.name %>.min.js.tid'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            js: {
                src: '<%= concat.js.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'src/js/.jshintrc'
                },
                src: ['src/js/*.js']
            }
        },
        clean: {
            files: ['dist']
        },
        copy: {
            tsapp: {
                files: [
                    { expand: true, flatten: true, src: ['dist/*.js'], dest: 'assets/', filter: 'isFile' }
                ]
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: 'tsbar',
                    processName: function(filePath) {

                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1];
                    }
                },
                files: {
                    'dist/templates.js': 'src/html/*.html'
                }
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: ['<%= jshint.src.src %>', 'src/html/*.html'],
                tasks: ['default']
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    /*
     * Compile the handlebar templates into JS.
     * Concatenate the JS together, then prepend the tiddler meta data.
     * Then compress and prepend the tiddler meta data to the compressed version as well.
     */
    grunt.registerTask('build', ['handlebars', 'concat:js', 'concat:tid', 'uglify', 'concat:mintid']);

    //TODO: replace this with real tests later
    grunt.registerTask('test', ['default']);
    grunt.registerTask('default', ['clean', 'bowerful', 'jshint', 'build', 'copy']);
};
