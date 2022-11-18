const average = require('./../src/utils/average');
const average_n_minus_1 = require('./../src/utils/averageNMinus1');
const custom_round = require('./../src/utils/customRound')

const array = [1,2,3,4]
test('average of 1, 2, 3, 4', () => {
    expect(average(array)).toBe(2.5);
})

test('average_n_minus_1 of 1, 2, 3, 4', () => {
    expect(average_n_minus_1(array)).toBe(3.3333333333333335)
})

test('custom_round of 1524654.155555555 with 0', () => {
    expect(custom_round(1524654.155555555,0)).toBe(1524654)
})

test('custom_round of 1524654.155555555 with 1', () => {
    expect(custom_round(1524654.155555555,1)).toBe(1524654.2)
})