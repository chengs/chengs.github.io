module.exports = function(grunt) {
	grunt.initConfig({
	 	pkg: grunt.file.readJSON('package.json'),
		cssmin: {
			options: {
			 	keepSpecialComments: 0
			},
			compress: {
			 	files: {
			     	'css/assets.css': [
				         "css/bootstrap.min.css",
				         "css/main.css"
			     	]
			 	}
			}
		},
		htmlmin: {                                     // Task 
		    dist: {                                      // Target 
		      options: {                                 // Target options 
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files 
		        'index.html': 'preindex.html'     // 'destination': 'source' 
		      }
		    }
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	grunt.registerTask('default', ['cssmin','htmlmin']);
}