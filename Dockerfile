FROM ethereum/solc:stable
LABEL name=mpel-contracts

RUN apk add --update bash vim less sudo \
     nodejs yarn git openssl g++ tar python make curl
RUN yarn global add npm truffle ganache-cli

RUN adduser -D -s /bin/bash -h /home/node -u 1000 node
USER node
RUN mkdir /home/node/project
WORKDIR /home/node/project

RUN git clone https://github.com/tomlion/vim-solidity.git ~/.vim/

EXPOSE 3000
EXPOSE 3001
EXPOSE 8080
EXPOSE 9545
ENTRYPOINT ["/bin/bash"]

