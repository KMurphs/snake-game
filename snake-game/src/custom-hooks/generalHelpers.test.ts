import { addThousandSeparator } from './generalHelpers';

test('String numbers to be formatted with spaces sperating thousands', () => {
  expect(addThousandSeparator("12")).toBe("12");
  expect(addThousandSeparator("123")).toBe("123");
  expect(addThousandSeparator("1234")).toBe("1 234");
  expect(addThousandSeparator("12345")).toBe("12 345");
  expect(addThousandSeparator("123456")).toBe("123 456");
  expect(addThousandSeparator("1234567")).toBe("1 234 567");
});
