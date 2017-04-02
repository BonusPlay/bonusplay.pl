module.exports = function(grunt) {
        require('time-grunt')(grunt);

        grunt.initConfig({
                pkg: grunt.file.readJSON('package.json'),
                copy: {
                        main: {
                                files: [{
                                        expand: true,
                                        cwd: 'node_modules/materialize-css/dist/css',
                                        src: 'materialize.min.css',
                                        dest: 'public/css'
                                }, {
                                        expand: true,
                                        cwd: 'node_modules/materialize-css/dist/js',
                                        src: 'materialize.min.js',
                                        dest: 'public/js'
                                }, {
                                        expand: true,
                                        cwd: 'node_modules/materialize-css/dist/fonts',
                                        src: '**',
                                        dest: 'public/fonts'
                                }, {
                                        expand: true,
                                        cwd: 'node_modules/jquery/dist',
                                        src: 'jquery.min.js',
                                        dest: 'public/js'
                                }]
                        }
                },
                shell: {
                        server: {
                                command: 'npm start',
                                options: {
                                        async: false
                                }
                        }
                }
        });

        grunt.loadNpmTasks('grunt-contrib-copy');
        grunt.loadNpmTasks('grunt-shell-spawn');

        grunt.registerTask('default', ['copy', 'shell:server']);
};