/*global module:false*/
module.exports = function (grunt) {

    var srcFiles = ['src/search.js', 'src/user.js'];

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
        qunit:{
            files:['test/**/*.html']
        },
        concat:{
            dist:{
                src:['<banner:meta.banner>', '<file_strip_banner:src/<%= pkg.name %>.js>', srcFiles],
                dest:'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        min:{
            dist:{
                src:['<banner:meta.banner>', '<config:concat.dist.dest>', srcFiles],
                dest:'dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        watch:{
            files:['<config:lint.files>', 'test/*.js'],
            tasks:'lint qunit'
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
                tsbar:true,
                tiddlyweb:true,
                io:true,
                console:true
            }
        },
        uglify:{}
    });

    // Default task.
    grunt.registerTask('default', 'lint qunit concat min');

    grunt.registerTask('update-tsapp', 'copy tsbar file to the tsapp for testing.', function() {

        this.requires('concat');
        grunt.file.copy('dist/tsbar-' + grunt.config('pkg.version') + '.js', 'tsbarapp/assets/tsbar.js');
    });

};
