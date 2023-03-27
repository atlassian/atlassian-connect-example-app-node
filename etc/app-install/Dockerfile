FROM ubuntu:latest

COPY ./app-install.sh ./app-install.sh
RUN chmod +x app-install.sh

RUN apt update
RUN apt install -y curl jq

CMD ["bash", "app-install.sh"]
