# reduce-flux

Reduce your `<Word>` by reduce-flux.
    
## Docs

:anchor: See [src/flux/README.md](src/flux/README.md)

### ActionEmitter

It has `onAction` and `dispatch` method.
It has sure bound method of EventEmitter.

### ReduceStore

ReduceStore has `reduce`.

`reduce(state: State, action: Action): State`

It is similar to ReduceStore of `flux-utils`

Your Store should inherited of `ReduceStore`

### StoreGroups

StoreGroups observe ReduceStore**s** by defined `getStores`.

Your State Manager should inherited of `StoreGroups`

## Installation

    npm install

## Usage

    npm run build
    open index.html

## Test

    npm test

## TODO

- Q. How to treat Shared Store?
    - A. Does create singleton of Store?
- Q. What has Multiple state in a single App cons?
    - ???
    - debug?
- Q. User create a instance of ActionEmitter. It means that multiple emitter is exist in a single app.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT