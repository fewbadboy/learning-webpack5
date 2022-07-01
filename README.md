# demo-webpack5
webpack5

# Environment
1. node v14.17.3
2. npm v6.14.13
3. yarn v1.22.4

# docker operate
```shell
# build docker image
docker build . -t my-webpack5

# run docker image
dicker run -d -p 8080:80 my-webpack5
curl localhost:8080
```