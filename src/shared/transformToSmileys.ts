const EMOJIS = {
  ':)': '🙂',
  ':o)': '🐵',
  ';)': '😉',
  ':(': '😟',
  '(y)': '👍'
};

export function transformToSmileys(text: string) {
  let newText = text;
  for (const [emojiStr, emoji] of Object.entries(EMOJIS)) {
    const emojiStrEscaped = emojiStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(emojiStrEscaped, 'g');
    newText = newText.replace(regex, emoji);
  }

  return newText;
}
