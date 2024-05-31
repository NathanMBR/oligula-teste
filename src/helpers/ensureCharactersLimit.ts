export const ensureCharactersLimit = (text: string, limit: number) => {
  if (text.length <= limit)
    return text

  let charactersCounter = 0
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    charactersCounter += words[i]!.length

    if (charactersCounter > limit){
      if (i < 3)
        return text.substring(0, limit - 20) + '...'

      let finalText = words.filter((_, index) => index < i).join(' ')
      const lastCharacter = finalText[finalText.length - 1]!
      const specialEndCharacters = [
        '.',
        ',',
        '!',
        '?',
        ';',
        ':'
      ]

      if (specialEndCharacters.includes(lastCharacter))
        finalText += ' '

      finalText += '...'

      return finalText
    }
  }
}
