import soundex1 from './soundexRef/ref.1';
import soundex2 from './soundexRef/ref.2';

const arSoundex = (word = '', length = 6, method = 1) => {
  if (
    typeof word !== 'string' ||
    typeof length !== 'number' ||
    typeof method !== 'number' ||
    length < 1 ||
    ![1, 2].includes(method)
  ) {
    return {
      error:
        'One or more parameters has incorrect type! Make sure you have (string, number[>0], number[1, 2])'
    };
  }

  // eslint-disable-next-line eqeqeq
  const soundex = method == 1 ? soundex1 : soundex2;

  // Value to return
  let value = '';

  // Size of the word to process
  const size = word.length;
  // Make sure the word is at least two characters in length
  if (size > 1) {
    // Convert the word to character array for faster processing
    let chars = word.split('');
    chars = chars.length >= length ? chars : chars.slice(0, length);
    // Buffer to build up with character codes
    let buffer = [];

    // The current and previous character codes
    let currCode = 0;
    // Loop through all the characters and convert them to the proper character code
    buffer = chars.reduce(
      (a, e) => {
        currCode = soundex[e];
        if (
          currCode === undefined ||
          currCode === 0 ||
          currCode === a.slice(-1)[0]
        ) {
          return a;
        }

        a.push(currCode);
        return a;
      },
      ['x']
    );

    const bufferSize = buffer.length;
    if (bufferSize < length) {
      buffer = buffer.concat(new Array(length - bufferSize).fill(0));
    }

    // Set the value to return
    value = buffer.join('');
  }

  // Return the value
  return value;
};

export default arSoundex;
