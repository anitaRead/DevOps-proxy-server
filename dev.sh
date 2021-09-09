rm -rf node_modules devops-proxy-server.zip
zip -r devops-proxy-server.zip .
aws s3 cp ./devops-proxy-server.zip s3://team2-nodea-pp/