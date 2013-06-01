'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('smartmenus.jquery.json'),
    banner:'/*!\n' +
' * <%= pkg.title || pkg.name %> jQuery Plugin - v<%= pkg.version %> - <%= grunt.template.today("mmmm d, yyyy") %>\n' +
' * <%= pkg.homepage %>\n' +
' *\n' +
' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd.\n' +
' * <%= pkg.author.url %>\n' +
' *\n' +
' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
' */\n\n',
    banner_min:'/*! <%= pkg.title || pkg.name %> jQuery Plugin - v<%= pkg.version %> - <%= grunt.template.today("mmmm d, yyyy") %>\n' +
' * <%= pkg.homepage %>\n' +
' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd. <%= pkg.author.url %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
    distdir: '<%= pkg.name %>-<%= pkg.version %>',
    // Task configuration.
    clean: ["dist/*"],
    // copy stuff to dist
    copy: {
      main: {
        files: [
          { src: ['LICENSE-MIT', 'README.md'], dest: 'dist/<%= distdir %>/' },
          { expand: true, cwd: 'src/', src: ['css/**', 'demo/**', 'libs/**'], dest: 'dist/<%= distdir %>/' }
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/jquery.<%= pkg.name %>.js'],
        dest: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner_min %>'
      },
      dist: {
        src: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.js',
        dest: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.min.js'
      },
    },
    zip: {
      dist: {
        router: function (filepath) {
          // remove "dist/" from filepath
          return filepath.replace(/^dist\//, '');
        },
        src: ['dist/<%= distdir %>/**'],
        dest: 'dist/<%= distdir %>.zip'
      },
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-zip');

  // Default task.
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'uglify', 'zip']);

};
