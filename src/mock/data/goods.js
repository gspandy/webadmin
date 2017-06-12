
import Mock from 'mockjs';

const goodsList = [];
const goodsGrout = [];
const addGroutSearch = [];

for (let i = 0; i < 20; i++) {
    goodsList.push(Mock.mock({
        id: Mock.Random.guid(),
        name: '高档手工礼品盒子',
        img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        repertory: Mock.Random.natural(0,500),
        sales: Mock.Random.natural(0,500),
        minPrice:10.99,
        maxPrice:99.99,
        supplier:'鲜花说',
        type:'商户供货',
        sort:Mock.Random.natural(0,50),// 排序号
        create_time: Mock.Random.date()
    }));
}
for (let i = 0; i < 20; i++) {
    goodsGrout.push(Mock.mock({
        id: Mock.Random.guid(),
        name: '高档手工礼品盒子',
        total: Mock.Random.natural(0,500),
        sort:Mock.Random.natural(0,50),
        create_time: Mock.Random.date()
    }));
}
for (let i = 0; i < 20; i++) {
    addGroutSearch.push(Mock.mock({
        id: Mock.Random.guid(),
        name: '高档手工礼品盒子',
        img:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        repertory: Mock.Random.natural(0,500),
        sales: Mock.Random.natural(0,500),
        minPrice:10.99,
        maxPrice:99.99,
        supplier:'鲜花说',
        type:'商户供货',
        create_time: Mock.Random.date()
    }));
}

export {goodsList,goodsGrout,addGroutSearch}