interface Token {
  text: string;
  type: string;
}

const KEYWORDS = [
  'const', 'let', 'var', 'function', 'class', 'extends',
  'return', 'if', 'else', 'for', 'while', 'do', 'switch',
  'case', 'break', 'continue', 'new', 'try', 'catch',
  'finally', 'throw', 'async', 'await', 'import', 'export',
  'default', 'null', 'undefined', 'true', 'false'
];

export const tokenize = (code: string): Token[] => {
  const tokens: Token[] = [];
  let current = '';
  let type = 'default';

  const push = () => {
    if (current) {
      tokens.push({ text: current, type });
      current = '';
      type = 'default';
    }
  };

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    // Handle strings
    if (char === '"' || char === "'") {
      push();
      let string = char;
      i++;
      while (i < code.length && code[i] !== char) {
        string += code[i];
        i++;
      }
      string += code[i] || '';
      tokens.push({ text: string, type: 'string' });
      continue;
    }

    // Handle numbers
    if (/[0-9]/.test(char)) {
      push();
      let number = char;
      while (i + 1 < code.length && /[0-9.]/.test(code[i + 1])) {
        i++;
        number += code[i];
      }
      tokens.push({ text: number, type: 'number' });
      continue;
    }

    // Handle identifiers and keywords
    if (/[a-zA-Z_$]/.test(char)) {
      push();
      let identifier = char;
      while (i + 1 < code.length && /[a-zA-Z0-9_$]/.test(code[i + 1])) {
        i++;
        identifier += code[i];
      }
      type = KEYWORDS.includes(identifier) ? 'keyword' : 'identifier';
      tokens.push({ text: identifier, type });
      continue;
    }

    // Handle operators
    if (/[+\-*/%=<>!&|^~?:]/.test(char)) {
      push();
      tokens.push({ text: char, type: 'operator' });
      continue;
    }

    // Handle punctuation
    if (/[.,;(){}[\]]/.test(char)) {
      push();
      tokens.push({ text: char, type: 'punctuation' });
      continue;
    }

    // Handle whitespace
    if (/\s/.test(char)) {
      push();
      tokens.push({ text: char, type: 'default' });
      continue;
    }

    current += char;
  }

  push();
  return tokens;
};