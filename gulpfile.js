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


// Clear public folder
gulp.task('clean-public-folder', function(){
  return gulp.src(outputFolder, { read : false})
            .pipe(clean());
});

// PROD: Build the angular template 
gulp.task('angular-build', ['clean-public-folder'], function(){
    return run('cd angular-template && npm run prebuild:prod && npm run build:prod', {
      verbosity : 3
    }).exec()
      .pipe(gulp.dest('output'));
});

// DEV: Build the angular template and keep watching for changes
gulp.task('angular-build-watch', function(){
    return run('cd angular-template && npm run watch:dev', { verbosity: 3 }).exec()
            .pipe(gulp.dest('output'));
})

gulp.task('gae-remove-template', function(){
    return gulp.src('./src/templates/index.html').pipe(clean());
});

// Copy index.html from public folder to templates folder
gulp.task('gae-copy-html', function(){
    return gulp.src(outputFolder+'/index.html')
                .pipe(gulp.dest('./src/templates/'))
});

// DEV: Watch for changes on index.html at public folder and keep copying to templates folder
gulp.task('gae-watch', function(){
    let watcher = gulp.watch([outputFolder+'/index.html'], ['build-remove-template', 'build-template-index']);
    watcher.on('change', function(){
        console.log('File ' + event.path + ' was ' + event.type + ', copying template...');
    });    
});

/**
 * Runs build template and copy template to public tasks
 */
gulp.task('gae-build', ['build-template'], function(){

});

gulp.task('gae-deploy', ['gae-build'], function(){
    if(project == null){
        console.log("Tell me the GAE ID of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

    if(version == null){
        console.log("Tell me the version of the project ( gulp run gae-build --project xxx --project-version yy)");
        return false;
    }

     return run('appcfg.py -A '+project+' -V '+version+' update %cd%', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});



gulp.task('gae-devserver', ['build-template-watch'], function(){
  return run('dev_appserver.py %cd% ', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});