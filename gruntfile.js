module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'dist/assets/css/o.css': ['src/o.scss']
				}
			}
		},
		
		terser: {
			dist: {
				files: {
					'dist/assets/js/o.min.js': ['src/o.js']
				},
				options: {
					warnings: 'false'
				}	
			},
		},

		watch: {
		  css: {
		    files: 'src/*.scss',
		    tasks: ['sass'],
		    options: {
		      livereload: true,
		    },
		  },
		  js: {
		    files: 'src/*.js',
		    tasks: ['terser'],
		    options: {
		      livereload: true,
		    },
		  },
		}
  });

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-terser');
	grunt.registerTask('default', ['sass', 'terser']);
};
