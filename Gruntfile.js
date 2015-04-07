module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					"dist/public/app.css": "public/app.less"
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: [
					"bower_components/jquery/dist/jquery.js",
					"bower_components/jquery-ui/jquery-ui.js",
					"bower_components/bootstrap/dist/js/bootstrap.js",
					"bower_components/osx-window/osx-window.js",
					"bower_components/unslider/src/unslider.js",
					"bower_components/jquery-form/jquery.form.js",
					"public/app.js"
				],
				dest: 'dist/public/app.min.js'
			}
		},
		processhtml: {
			dist: {
				files: {
					'dist/public/index.html': ['public/index.html']
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, src: [
						'public/img/**',
						'public/fonts/*',
						'node_modules/express/**',
						'node_modules/emailjs/**',
						'node_modules/body-parser/**',
						'config.json',
						'pangur.js'
					], dest: 'dist/'},
					{expand: true, flatten: true, src: [
						'bower_components/bootstrap/dist/css/bootstrap.min.css'
					], dest: 'dist/public/'}
				]
			}
		},
		compress: {
			main: {
				options: {
					archive: 'distribution.tgz'
				},
				files: [
					{expand: true, cwd: 'dist/', src: ['**'], dest: 'pangur/'}
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.registerTask('default', ['uglify', 'processhtml', 'less', 'copy', 'compress']);

};