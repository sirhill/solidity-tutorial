
### Using the truffle develop console

The ideal way to play and test this HelloWorld contract is to run the **truffle develop** console from this directory

`truffle develop`

And once in the console the following commands are available:

To compile: `compile`
To migrate: `migrate --reset`
To run the tests: `test`

If you want to reuse the contract deployed during the migration you can use the following command:
```
let counter;
Counter.deployed().then(contract => { counter = contract });
```

Now `counter.remaining()` should returns 100 as a BigDecimal object.
You may also compose as a promise as follow to get a more human readable output:
`count.remaining().then(remaining => remaining.toString(10));`

And `counter.decrement()` should decrement one
```

### Directly from the terminal

You can also run the commands from the command line:

`truffle compile`
`truffle test`

### Well done !

You have fully functionnal Counter contract.
You should find in the build directoy a Counter.json file with is your ABI.
The ABI will be used to access it from a Decentralized app.


