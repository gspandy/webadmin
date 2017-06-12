
'use strict';

const state = {
    shippingType: [
        {
            value: '顺丰快递',
            label: '顺丰快递'
        },
        {
            value: '圆通快递',
            label: '圆通快递'
        },
        {
            value: '申通快递',
            label: '申通快递'
        }
    ]
}


const getters = {
    shippingType: state => state.shippingType
}

export default {
    state,
    getters
}

