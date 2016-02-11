import {ReduceStore} from 'reduce-flux';
import {keys} from '../actions/ActionCreator';
// 在庫
const initialState = {
    products: []
};

function reduceProduct(product, action) {
    switch (action.type) {
        case keys.addToCart:
            return Object.assign({}, product, {
                inventory: product.inventory - 1
            });
        default:
            return product;
    }
}
export function reduceProducts(products = [], action) {
    switch (action.type) {
        case keys.addToCart:
            const {productID} = action;
            return products.map(product => {
                if(product.id !== productID) {
                    return product;
                }
                return reduceProduct(product, action);
            });
        case keys.receiveProducts:
            return action.products;
        default:
            return products
    }
}
export default class ProductStore extends ReduceStore {
    constructor() {
        super();
        this.state = initialState;
    }

    getProduct(id) {
        const productIDs = this.state.products.map(product => product.id);
        const indexOfID = productIDs.indexOf(id);
        if (indexOfID === -1) {
            return;
        }
        return this.state.products[indexOfID];
    }

    reduce(state = initialState, action) {
        return {
            products: reduceProducts(state.products, action)
        };
    }
}
