module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [
						['babelify', {
							loose: 'all'
						}]
					]
				},
				files: {
					// if the source file has an extension of es6 then
					// we change the name of the source file accordingly.
					// The result file's extension is always .js
					'./dist/calendar.js': ['./js/calendar/index.js', './js/datesHighlighter/index.js']
				}
			}
		},
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
		// 		options: {
		// 			compress: false
		// 		},
		// 		files: {
		// 			'test.js': ['js/initialize.js', 'js/Calendar.js', 'js/DayViewState.js', 'js/WeekViewState.js', 'js/MonthViewState.js', 'js/LastDaysViewState.js']
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
			scripts: {
				files: ['./js/*.js', './js/**/*.js', './js/calendar/*.js', './js/datesHighlighter/*.js', './js/datesHighlighter/ModelStates/*.js'],
				tasks: ['browserify']
			}
			// js: {
			// 	files: ['js/*.js'],
			// 	tasks: ['uglify']
			// }
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
