var fs = require('fs');
var gulp = require('gulp');
var run = require('gulp-run');
var clean = require('gulp-clean');
var argv = require('yargs').argv;
var download = require('gulp-download');
var replace = require('gulp-replace');
var rename = require('gulp-rename');

// Templates Folder that will be uploaded
var outputFolder = './public';
var outputAngular2 = './angular-template/dist';

// Gae information to upload
var project = null;

// Version of the project on gae
var version = null;

// Swagger API information
var deployURL = 'gforumengine.appspot.com';
var localURL = 'localhost:8080';
var deploying = false;

// If pass project through command line
if(typeof argv.project !== 'undefined' && argv.project != ''){
  deploying = true;
  project = argv.project;
}

// If pass project-version through command line
if(typeof argv['project-version'] !== 'undefined' && argv['project-version'] != ''){
    deploying = true;
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
    return run('cd angular-template && npm run watch:dev:hmr', { verbosity: 3 }).exec()
            .pipe(gulp.dest('output'));
})

gulp.task('gae-remove-html', function(){
    return gulp.src('./src/templates/index.html').pipe(clean());
});

// Copy index.html from public folder to templates folder
gulp.task('gae-copy-html', function(){
    return gulp.src(outputFolder+'/index.html')
                .pipe(gulp.dest('./src/templates/'))
});

// DEV: Watch for changes on index.html at public folder and keep copying to templates folder
gulp.task('gae-watch', function(){
    let watcher = gulp.watch([outputFolder+'/index.html'], ['gae-remove-html', 'gae-copy-html']);
    watcher.on('change', function(event){
        console.log('File ' + event.path + ' was ' + event.type + ', copying template...');
    });    
});

/**
 * Runs build template and copy template to public tasks
 */
gulp.task('gae-build', ['angular-build', 'gae-copy-html'], function(){

});

gulp.task('gae-deploy', ['swagger-build', 'gae-build', 'gae-copy-html'], function(){
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



gulp.task('gae-server', ['swagger-build', 'gae-watch'], function(){
  return run('dev_appserver.py %cd% ', { verbosity: 3 }).exec()
              .pipe(gulp.dest('output'));
});

gulp.task('swagger-check', function(){
    if(!fs.existsSync('swagger-codegen-cli-2.2.1.jar')){
        console.log("Download Swagger Code Gen first! Run gulp swagger-download");
        process.exit();
    }
});

gulp.task('swagger-download', ['swagger-check'], function(){
    download("https://oss.sonatype.org/content/repositories/releases/io/swagger/swagger-codegen-cli/2.2.1/swagger-codegen-cli-2.2.1.jar")
        .pipe(gulp.dest('./'));
});

// Clean swagger folder
gulp.task('swagger-clean', ['swagger-check'], function(){
    return gulp.src('./angular-template/src/app/swagger/*', { read : false }).pipe(clean());
});

// Copy the swagger.yaml to a temporary file with changes
gulp.task('swagger-copy', function(){
    // If its not deploying, its a local server
    if(deploying == false){
        return gulp.src('swagger.yaml')
            .pipe(replace('gforumengine.appspot.com', localURL))
            .pipe(rename('swagger-temp.yaml'))
            .pipe(gulp.dest('.'));
    }
    else {
        return gulp.src('swagger.yaml')
                .pipe(rename('swagger-temp.yaml'))
                .pipe(gulp.dest('.'));
    }
});

// Compile new swagger files according to spec
gulp.task('swagger-compile', ['swagger-clean', 'swagger-copy'], function(){
    return run('java -jar swagger-codegen-cli-2.2.1.jar generate -i swagger-temp.yaml -l typescript-angular2 -o ./angular-template/src/app/swagger/', { verbosity: 3 }).exec()
            .pipe(gulp.dest('./output'))
});

// Removes the temporary yaml
gulp.task('swagger-build', ['swagger-compile'], function(){
    gulp.src('swagger-temp.yaml').pipe(clean());
});