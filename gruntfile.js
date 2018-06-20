module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    compass: {
		  dist: {
		    options: {
        	banner: '/* MATTHIASOERTEL.DE — WORKBENCH (1.0/2018)\nW.A.F. — http://wearefellows.com */',
		      sassDir: 'src/',
		      cssDir: 'dist/assets/css/',
		      specify: 'src/*.scss',
		      outputStyle: 'compressed'
		    }
		  }
		},

		uglify: {
		  my_target: {
		    files: {
			    'dist/assets/js/o.min.js': ['src/mozoom.js','src/o.js']
		    }
		  }
		},

		watch: {
		  css: {
		    files: 'src/*.scss',
		    tasks: ['compass'],
		    options: {
		      livereload: true,
		    },
		  },
		  js: {
		    files: 'src/*.js',
		    tasks: ['uglify'],
		    options: {
		      livereload: true,
		    },
		  },
		}
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
 	grunt.loadNpmTasks('grunt-contrib-compass');
 	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['compass', 'uglify']);

};
