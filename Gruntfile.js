'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('smartmenus.jquery.json'),

    banner: '/*!\n\
 * <%= pkg.title || pkg.name %> jQuery Plugin - v<%= pkg.version %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 *\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd.\n\
 * <%= pkg.author.url %>\n\
 *\n\
 * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n\
 */\n\n',

    banner_min: '/*! <%= pkg.title || pkg.name %> jQuery Plugin - v<%= pkg.version %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd. <%= pkg.author.url %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',

    banner_keyboard_addon: '/*!\n\
 * <%= pkg.title || pkg.name %> jQuery Plugin Keyboard Addon - v<%= pkg.version_keyboard_addon %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 *\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd.\n\
 * <%= pkg.author.url %>\n\
 *\n\
 * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n\
 */\n\n',

    banner_keyboard_addon_min: '/*! <%= pkg.title || pkg.name %> jQuery Plugin Keyboard Addon - v<%= pkg.version_keyboard_addon %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd. <%= pkg.author.url %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',

    banner_bootstrap_addon: '/*!\n\
 * <%= pkg.title || pkg.name %> jQuery Plugin Bootstrap Addon - v<%= pkg.version_keyboard_addon %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 *\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd.\n\
 * <%= pkg.author.url %>\n\
 *\n\
 * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n\
 */\n\n',

    banner_bootstrap_addon_min: '/*! <%= pkg.title || pkg.name %> jQuery Plugin Bootstrap Addon - v<%= pkg.version_keyboard_addon %> - <%= grunt.template.today("mmmm d, yyyy") %>\n\
 * <%= pkg.homepage %>\n\
 * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>, Vadikom Web Ltd. <%= pkg.author.url %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',

    distdir: '<%= pkg.name %>-<%= pkg.version %>',
    // Task configuration.
    clean: ["dist/*"],
    // copy stuff to dist
    copy: {
      main: {
        files: [
          { src: ['LICENSE-MIT', 'README.md'], dest: 'dist/<%= distdir %>/' },
          { src: ['src/addons/bootstrap/jquery.smartmenus.bootstrap.css'], dest: 'dist/<%= distdir %>/addons/bootstrap/jquery.smartmenus.bootstrap.css' },
          { expand: true, cwd: 'src/', src: ['css/**', 'demo/**', 'libs/**'], dest: 'dist/<%= distdir %>/' }
        ]
      }
    },
    concat: {
      dist: {
        options: {
          banner: '<%= banner %>',
          stripBanners: true
        },
        src: ['src/jquery.<%= pkg.name %>.js'],
        dest: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.js'
      },
      dist_keyboard_addon: {
        options: {
          banner: '<%= banner_keyboard_addon %>',
          stripBanners: true
        },
        src: ['src/addons/keyboard/jquery.<%= pkg.name %>.keyboard.js'],
        dest: 'dist/<%= distdir %>/addons/keyboard/jquery.<%= pkg.name %>.keyboard.js'
      },
      dist_bootstrap_addon: {
        options: {
          banner: '<%= banner_bootstrap_addon %>',
          stripBanners: true
        },
        src: ['src/addons/bootstrap/jquery.<%= pkg.name %>.bootstrap.js'],
        dest: 'dist/<%= distdir %>/addons/bootstrap/jquery.<%= pkg.name %>.bootstrap.js'
      }
    },
    uglify: {
      dist: {
        options: {
          banner: '<%= banner_min %>'
        },
        src: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.js',
        dest: 'dist/<%= distdir %>/jquery.<%= pkg.name %>.min.js'
      },
      dist_keyboard_addon: {
        options: {
          banner: '<%= banner_keyboard_addon_min %>'
        },
        src: 'dist/<%= distdir %>/addons/keyboard/jquery.<%= pkg.name %>.keyboard.js',
        dest: 'dist/<%= distdir %>/addons/keyboard/jquery.<%= pkg.name %>.keyboard.min.js'
      },
      dist_bootstrap_addon: {
        options: {
          banner: '<%= banner_bootstrap_addon_min %>'
        },
        src: 'dist/<%= distdir %>/addons/bootstrap/jquery.<%= pkg.name %>.bootstrap.js',
        dest: 'dist/<%= distdir %>/addons/bootstrap/jquery.<%= pkg.name %>.bootstrap.min.js'
      }
    },
    zip: {
      dist: {
        router: function (filepath) {
          // remove "dist/" from filepath
          return filepath.replace(/^dist\//, '');
        },
        src: ['dist/<%= distdir %>/**'],
        dest: 'dist/<%= distdir %>.zip'
      }
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
