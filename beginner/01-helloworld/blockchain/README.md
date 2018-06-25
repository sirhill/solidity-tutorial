
### Using the truffle develop console

The ideal way to play and test this HelloWorld contract is to run the **truffle develop** console from this directory

`truffle develop`

And once in the console the following commands are available:

To compile: `compile`
To migrate: `migrate --reset`
To run the tests: `test`

If you want to reuse the contract deployed during the migration you can use the following command:
`HelloWorld.deployed().then(contract => { return contract.message() });`
You should get a magnificient 'Hello world !'

### Directly from the terminal

You can also run the commands from the command line:

`truffle compile`
`truffle test`


### Hello World !

You have fully functionnal HelloWorld contract.
You should find in the build directoy a HelloWorld.json file with is your ABI.
The ABI will be used to access it from a Decentralized app.


