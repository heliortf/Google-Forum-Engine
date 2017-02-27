var gulp = require('gulp');
var run = require('gulp-run');
var clean = require('gulp-clean');
var argv = require('yargs').argv;

// Templates Folder that will be uploaded
var outputFolder = './public';
var outputAngular2 = './angular-template/dist';

// Gae information to upload
var project = null;

// Version of the project on gae
var version = null;


if(typeof argv.project !== 'undefined' && argv.project != ''){
  project = argv.project;
}

if(typeof argv['project-version'] !== 'undefined' && argv['project-version'] != ''){
  version = argv['project-version'];
}


/**
 * Clear public folder
 */
gulp.task('clean-public-folder', function(){
  return gulp.src(outputFolder, { read : false})
            .pipe(clean());
});

// Build the angular template 
gulp.task('build-template', function(){
    return run('cd angular-template && npm run prebuild:prod && npm run build:prod', {
      verbosity : 3
    }).exec()
      .pipe(gulp.dest('output'));
});

/**
 * After cleaning the public folder
 */
gulp.task('copy-template-to-public', ['clean-public-folder'], function(){
    return gulp.src(outputAngular2+'/*')
              .pipe(gulp.dest(outputFolder))
});

/**
 * Runs build template and copy template to public tasks
 */
gulp.task('gae-build', ['build-template', 'copy-template-to-public'], function(){
    if(project == null){
        console.log("Tell me the GAE ID of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

    if(version == null){
        console.log("Tell me the version of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

    return run('appcfg.py -A '+project+' -V '+version+' update .', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});


gulp.task('gae-deploy', function(){
    if(project == null){
        console.log("Tell me the GAE ID of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

    if(version == null){
        console.log("Tell me the version of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

     return run('appcfg.py -A '+project+' -V '+version+' update .', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});


gulp.task('gae-devserver', function(){
  return run('dev_appserver.py . ', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});