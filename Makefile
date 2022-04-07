deploy:
	sls deploy --function startHere

start:
	sls invoke --function startHere --stage dev -l
