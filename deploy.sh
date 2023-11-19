#!/bin/bash


# env should be marked as export
source .env 
# sh deploy.sh

echo hello
# echo $PRIVATE_KEY

cd contract_foundry

forge create --rpc-url https://sepolia-rpc.scroll.io --private-key $PRIVATE_KEY src/UserStatus.sol:UserStatus --legacy