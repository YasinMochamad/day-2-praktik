// Unit test untuk src/mathUtils.js menggunakan Jest
const { add, divide, isPrime } = require('../src/mathUtils');

describe('add()', () => {
  test('penjumlahan dua angka positif', () => {
    expect(add(2, 3)).toBe(5);
  });
  test('penjumlahan dengan nol', () => {
    expect(add(0, 5)).toBe(5);
  });
  test('penjumlahan angka negatif', () => {
    expect(add(-2, -3)).toBe(-5);
  });
  test('penjumlahan desimal', () => {
    expect(add(1.5, 2.5)).toBe(4);
  });
});

describe('divide()', () => {
  test('pembagian normal', () => {
    expect(divide(10, 2)).toBe(5);
  });
  test('pembagian hasil desimal', () => {
    expect(divide(7, 2)).toBe(3.5);
  });
  test('bagi nol melempar RangeError', () => {
    expect(() => divide(10, 0)).toThrow(RangeError);
  });
  test('bagi nol pesan error benar', () => {
    expect(() => divide(5, 0)).toThrow('tidak bisa membagi dengan nol');
  });
});

describe('isPrime()', () => {
  test('2 adalah bilangan prima', () => {
    expect(isPrime(2)).toBe(true);
  });
  test('3 adalah bilangan prima', () => {
    expect(isPrime(3)).toBe(true);
  });
  test('17 adalah bilangan prima', () => {
    expect(isPrime(17)).toBe(true);
  });
  test('4 bukan bilangan prima', () => {
    expect(isPrime(4)).toBe(false);
  });
  test('1 bukan bilangan prima', () => {
    expect(isPrime(1)).toBe(false);
  });
  test('0 bukan bilangan prima', () => {
    expect(isPrime(0)).toBe(false);
  });
  test('angka negatif bukan bilangan prima', () => {
    expect(isPrime(-5)).toBe(false);
  });
  test('desimal bukan bilangan prima', () => {
    expect(isPrime(2.5)).toBe(false);
  });
});
