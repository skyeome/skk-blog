# 나만의 가짜 컴퓨터 만드는 설명서

# 1. 운영체체 및 프로그램 하나 하나 설치
# FROM ubuntu:22.04

# RUN sudo apt install -y nodejs
# RUN sudo npm install -g yarn

# 2. 이미 리눅스, node, npm, yarn 까지 모두 깔려있는 컴퓨터 다운로드
FROM node:14

# 2-2. 패키지 먼저 설치하기
COPY ./package.json /skk-blog/
COPY ./yarn.lock /skk-blog/
WORKDIR /skk-blog/
RUN yarn install

# 2-3. 소스코드 복사하기
COPY . /skk-blog/
RUN yarn build

# 2-4. 도커안에서 프로그램 실행하기
CMD yarn start