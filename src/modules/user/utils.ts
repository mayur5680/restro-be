export function isEmail(text: string): boolean {
  const emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  return emailRegex.test(text);
}

export function isNumeric(text: string): boolean {
  return !isNaN(Number(text));
}

export function getCurrentTimestampInMilliseconds(): number {
  const currentTimestampInMilliseconds: number = new Date().getTime();

  return currentTimestampInMilliseconds;
}
