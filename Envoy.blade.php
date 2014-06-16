@servers(['web' => 'jenkins@behatstaging.stagingarea.us'])

@task('deploy')
	cd /var/www/behat-angular/site/current
	git pull origin development 
@endtask
