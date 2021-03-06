import { parseDigit } from 'input-format'

/**
 * Parses phone number characters from a string.
 * @param  {string} string
 * @return {string}
 * @example
 * ```js
 * parsePhoneNumberCharacters('8 (800) 555')
 * // Outputs '8800555'.
 * parsePhoneNumberCharacters('+7 800 555')
 * // Outputs '+7800555'.
 * ```
 */
export default function parsePhoneNumberCharacters(string)
{
	let result = ''

	// Using `.split('')` here instead of normal `for ... of`
	// because the importing application doesn't neccessarily include an ES6 polyfill.
	// The `.split('')` approach discards "exotic" UTF-8 characters
	// (the ones consisting of four bytes) but digits
	// (including non-European ones) don't fall into that range
	// so such "exotic" characters would be discarded anyway.
	for (const character of string.split(''))
	{
		result += parsePhoneNumberCharacter(character, result) || ''
	}

	return result
}

/**
 * `input-format` `parse()` function.
 * https://github.com/catamphetamine/input-format
 * @param  {string} character - Yet another character from raw input string.
 * @param  {string} value - The value parsed so far.
 * @param  {object} meta - Optional custom use-case-specific metadata.
 * @return {string?} The parsed character.
 */
export function parsePhoneNumberCharacter(character, value)
{
	// Only allow a leading `+`.
	if (character === '+')
	{
		// If this `+` is not the first parsed character
		// then discard it.
		if (value) {
			return
		}

		return '+'
	}

	// Allow digits.
	return parseDigit(character)
}