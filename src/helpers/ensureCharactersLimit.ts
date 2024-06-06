export const ensureCharactersLimit = (text: string, limit: number) => {
  if (text.length <= limit)
    return text

  const words = text.split(' ')
  const specialEndCharacters = [
    '.',
    ',',
    '!',
    '?',
    ';',
    ':'
  ]

  let finalText = ''
  let charactersCounter = 0
  let i = 0

  for (i = 0; i < words.length; i++) {
    charactersCounter += words[i]!.length

    if (charactersCounter > limit) {
      if (i < 3)
        finalText = text.substring(0, limit - 20)

      break
    }
  }

  if (!finalText)
    finalText = words.filter((_, index) => index < i).join(' ')

  if (finalText === text)
    return text

  const lastCharacter = finalText[finalText.length - 1]!
  if (specialEndCharacters.includes(lastCharacter))
    finalText += ' '

  finalText += '...'

  return finalText
}
