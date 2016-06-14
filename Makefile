IMAGE_NAME=ebdeploy
IAMGE_TAG=latest
CONTAINER_NAME=deploy
RUN_ARGS= -e AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) -e AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY)

build:
	docker build -t $(IMAGE_NAME):$(IAMGE_TAG) .

run:
	docker run --name $(CONTAINER_NAME) $(RUN_ARGS) $(IMAGE_NAME):$(IAMGE_TAG)

clean:
	docker rm -f $(CONTAINER_NAME)
