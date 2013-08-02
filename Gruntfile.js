/* global module:false, require:false */
module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        banner: '/*\n * <%= pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> \n */\n',
        concat: {
            js: {
                options: {
                    banner: '<%= banner %>'
                },
                src: ['src/js/*.js'],
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
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    /*
     * Concatenate the JS together, then prepend the tiddler meta data.
     * Then compress and prepend the tiddler meta data to the compressed version as well.
     */
    grunt.registerTask('build', ['concat:js', 'concat:tid', 'uglify', 'concat:mintid']);

    grunt.registerTask('default', ['clean', 'jshint', 'build', 'copy']);
};
