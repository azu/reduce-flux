## ActionEmitter

It has `onAction` and `dispatch` method.
It has sure bound method of EventEmitter.

## ReduceStore

ReduceStore has `reduce`.

`reduce(state: State, action: Action): State`

It is similar to ReduceStore of `flux-utils`

Your Store should inherited of `ReduceStore`

## StoreGroups

StoreGroups observe ReduceStore**s** by defined `getStores`.

Your State Manager should inherited of `StoreGroups`


