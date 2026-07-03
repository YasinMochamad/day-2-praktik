// Unit test untuk src/stringUtils.js menggunakan Jest
const { capitalize, reverse, wordCount, isPalindrome } = require('../src/stringUtils');

describe('capitalize()', () => {
  test('kapitalkan huruf pertama tiap kata', () => {
    expect(capitalize('halo dunia')).toBe('Halo Dunia');
  });
  test('string kosong tetap kosong', () => {
    expect(capitalize('')).toBe('');
  });
  test('satu kata', () => {
    expect(capitalize('hello')).toBe('Hello');
  });
  test('input bukan string melempar TypeError', () => {
    expect(() => capitalize(123)).toThrow(TypeError);
  });
});

describe('reverse()', () => {
  test('balik urutan karakter', () => {
    expect(reverse('abc')).toBe('cba');
  });
  test('string kosong tetap kosong', () => {
    expect(reverse('')).toBe('');
  });
  test('satu karakter', () => {
    expect(reverse('a')).toBe('a');
  });
  test('input bukan string melempar TypeError', () => {
    expect(() => reverse(null)).toThrow(TypeError);
  });
});

describe('wordCount()', () => {
  test('hitung jumlah kata normal', () => {
    expect(wordCount('halo dunia')).toBe(2);
  });
  test('spasi berlebih diabaikan', () => {
    expect(wordCount('halo   dunia')).toBe(2);
  });
  test('string kosong return 0', () => {
    expect(wordCount('')).toBe(0);
  });
  test('hanya spasi return 0', () => {
    expect(wordCount('   ')).toBe(0);
  });
  test('input bukan string melempar TypeError', () => {
    expect(() => wordCount(true)).toThrow(TypeError);
  });
});

describe('isPalindrome()', () => {
  test('kata palindrom', () => {
    expect(isPalindrome('katak')).toBe(true);
  });
  test('bukan palindrom', () => {
    expect(isPalindrome('halo')).toBe(false);
  });
  test('abaikan huruf besar/kecil', () => {
    expect(isPalindrome('Katak')).toBe(true);
  });
  test('abaikan spasi', () => {
    expect(isPalindrome('kasur rusak')).toBe(true);
  });
  test('input bukan string melempar TypeError', () => {
    expect(() => isPalindrome([])).toThrow(TypeError);
  });
});
