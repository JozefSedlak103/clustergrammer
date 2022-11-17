const average = require('./../src/utils/average');
const average_n_minus_1 = require('./../src/utils/averageNMinus1');
const custom_round = require('./../src/utils/customRound')

const array = [1,2,3,4]
test('average', () => {
    expect(average(array)).toBe(2.5);
})

test('average_n', () => {
    expect(average_n_minus_1(array)).toBe(3.3333333333333335)
})

test('custom_round', () => {
    expect(custom_round(1524654,10)).toBe(1524654)
})