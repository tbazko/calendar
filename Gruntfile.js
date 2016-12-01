module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			options: {
				sourcemap: 'none',
				style: 'compressed'
			},
			dist: {
				files: {
					'style.css': 'style.scss'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 3 versions']
			},
			dist: {
				files: {
					'style.css': 'style.css'
				}
			}
		},
		// uglify: {
		// 	my_target: {
		// 		files: {
		// 			'calendar.js': ['js/calendar/*.js'],
		//			'highlighter.js': ['js/datesHighlighter/*.js'],
		//			'bundle.js': ['js/index.js', 'js/calendar/*.js', 'js/datesHighlighter/*.js']
		// 		}
		// 	}
		// },
		watch: {
			css: {
				files: ['*.scss', 'scss/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true, // needed to run LiveReload
				}
			},
			browserify: {
				files: ['./js/*.js', './js/**/*.js'],
				tasks: ['browserify']
			}
			// js: {
			// 	files: ['js/*.js'],
			// 	tasks: ['uglify']
			// }
		},
		browserify: {
			dist: {
				options: {
					transform: [
						['babelify', {
							presets: ['es2015']
						}]
					]
				},
				files: {
					'dist/calendar.js': ['js/calendar/*.js'],
					'dist/highlighter.js': ['js/datesHighlighter/*.js'],
					'dist/bundle.js': ['js/index.js', 'js/calendar/*.js', 'js/datesHighlighter/*.js']
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['browserify']);
}
