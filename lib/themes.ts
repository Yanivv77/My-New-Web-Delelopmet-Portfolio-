interface ThemeColors {
  [key: string]: {
    background: string;
    default: string;
    keyword: string;
    string: string;
    number: string;
    operator: string;
    punctuation: string;
    identifier: string;
  };
}

export const VSCodeThemes: ThemeColors = {
  dark: {
    background: '#1E1E1E',
    default: '#D4D4D4',
    keyword: '#C586C0',
    string: '#CE9178',
    number: '#B5CEA8',
    operator: '#D4D4D4',
    punctuation: '#D4D4D4',
    identifier: '#9CDCFE'
  },
  light: {
    background: '#FFFFFF',
    default: '#000000',
    keyword: '#AF00DB',
    string: '#A31515',
    number: '#098658',
    operator: '#000000',
    punctuation: '#000000',
    identifier: '#001080'
  }
};