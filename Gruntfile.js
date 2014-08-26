module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			target: {
				files: {
					'lib/scribe.min.js': 'lib/scribe.js'
				},
				options: {
					mangle: true,
					compress: {
						dead_code: false
					},
					output: {
						ascii_only: true
					},
					report: 'min',
					preserveComments: 'some'
				}
			}
		},
		jshint: {
			files: ['lib/scribe.js'],
			options: {
				undef: true,
				unused: true
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('compact', ['uglify']);
	grunt.registerTask('release', ['uglify']);
};
