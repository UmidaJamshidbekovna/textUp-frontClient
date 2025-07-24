#REGISTRY=registry.textup.uz
TAG=latest
ENV_TAG=latest
PROJECT_NAME=${PROJECT_NAME}
CURRENT_DIR=$(shell pwd)
APP=$(shell basename ${CURRENT_DIR})

build-image:
	docker build --rm --build-arg NODE_ENV=${NODE_ENV} -t ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} .
	docker tag ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}
	docker rmi ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG}
