# Regex 101

This post is my attempt at distilling what you need to know to get started reading most regular expressions in javascript. Regular expressions are used for pattern matching, finding specific patterns in large bodies of text and extracting the information you are looking for. That can take the form of a boolean, checking to see if some pattern exists in the text, or a list of strings.

I will follow up this post with some more advanced concepts in a subsequent post, but intend to keep the bulk here, including some techniques of combining pure regex with javascript.

## Table of Contents
- [Regex 101](#regex-101)
	- [Table of Contents](#table-of-contents)
	- [Character classes](#character-classes)
		- [A quick side note on the backslash `\` character](#a-quick-side-note-on-the-backslash--character)
		- [Examples](#examples)
	- [Quantifiers](#quantifiers)
	- [Assertions](#assertions)
	- [Groups](#groups)
	- [Flags](#flags)
	- [Common Javascript Functions](#common-javascript-functions)
	- [Shortcomings with RegExp Constructor and caution](#shortcomings-with-regexp-constructor-and-caution)
	- [Tools](#tools)

## Character classes

Let's start with the basic building blocks! I've included a table below of some of the most common and will explain each in kind.

| Character class | Matches                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| \w              | a letter, number, or underscore                                                            |
| \d              | a number, 0 - 9                                                                            |
| \s              | any whitespace character (e.g. space, tab, newline, etc )                                  |
| .               | any character that is not a newline (in advanced we can also make this match newlines too) |
| [...]           | any specific character that we explicitly request                                          |
| [^...]          | any specific character NOT explicitly requested                                            |

The first character class I want to introduce is `\w`. This will match a single character that is a letter (upper or lower case), a number, or an underscore. We'll get to matching specific numbers of characters in the next section, but we'll just start with matching 1. If, however, someone wanted only to match a number, they would use the `\d` character class instead. This matches the characters 0 through 9.

Next we have the `\s` character class. This will match any whitespace character, be it a space, tab (`\t`), or newline (`\n`). There are other whitespace characters as well, but these are the most common.

If there is a situation where you are looking for a string of text that includes some specific characters and then some number of random characters, then you'll need to employ the `.` character class! The `.` (which I will refer to as the dot character class) will match any character except newlines (this is not true 100% of the time and I will make a note of when in the following article). The dot class is very powerful, but can be unruly since it can match anything.

Next, we have the square brackets `[...]`! The brackets allow a person to explicitly declare the characters they are looking for. This can take the form of a list of characters or a range. For example, if one wanted to match any alphanumeric character, but didn't want to include the underscore (making `\w` a bad candidate), they would use `[a-zA-Z0-9]`. Notice I specified both lower and upper case letters here (regex is very specific about capitalization unless told otherwise, which I get into in the the [Flags](#flags) section below). A couple examples of what it would look like to not only use ranges would be if someone wanted to match css classes that are kebab cased, they would use `[a-z-]`. Or if someone was checking if a password was complex enough and included symbols, they could use `[!"#$%&'()*+,-./:;<=>?@[\]^_{|}~]`. Note that if the hyphen `-` is included first or last in the brackets, it is regarded as a literal hyphen character.

The sibling of `[...]` is the negated version `[^...]`, which matches anything that is NOT in this list. For example, if I had `[^a-m]`, then this would not only match "n" through "z", but also, numbers, symbols, and spaces! This negated version works exactly the same as its sibling in terms of accepting ranges or a list of characters, as long as the carrot `^` precedes it, it will match anything not included (e.g. `[^\s\n\t]` will match anything that isn't a space character).

A couple quick notes on the above before I get into some clarifications of the `\` character and some examples! Firstly, note that the dot within the context of square brackets acts as a simple period, nothing more. This is true for many of the characters above, which have roles in regex outside of being characters we are trying to match (e.g. parentheses `()`, curly braces `{}`, the asterisk `*`, dollar sign `$`, and others).

### A quick side note on the backslash `\` character

The escape character `\` is very important in regular expressions and means quite different things in different contexts. In the context of character classes above, it can separate the letter `w` with any alphanumeric character (plus '-') `\w`. Within square brackets, it means to take literally a character instead of applying its regex role. To explain this more clearly, in my final example a few paragraphs above on using square brackets `[...]` with lots of symbols, you'll note that there is a square bracket in the middle of the string preceded by a backslash `\`. This means, in this context, that we literally want to match the closing square brackets character `]` and we therefore don't want it exercising its regex role as the end of a character list. If I wanted to match a file location in windows, which often takes the form of `C:\Users\Administrator\folder\file`. I would need to use something like `[a-zA-Z:\\]`. I have a double backslash `\` here to mean "literally look for a backslash". If I hadn't included two backslashes (`[a-zA-Z:\]`), then this would cause a syntax error! Regex would interpret the final square bracket as the character `]` and not the end of a group of characters.


### Examples

| String to search | Character class | Matches                                                                  |
| ---------------- | --------------- | ------------------------------------------------------------------------ |
| "<#a-_=1"        | `\w`            | 'a', '_', or '1' (note that '1' here is a string)                        |
| "as0df"          | `\d`            | '0'                                                                      |
| "as df"          | `\s`            | '\s' (this is a textual representation of the space between 's' and 'd') |
| "a1 ,_"          | `.`             | Matches every character                                                  |
| "asdfASDF1234"   | `[a-z]`         | 'a', 's', 'd', 'f'                                                       |
| "asdfASDF1234"   | `[^a-z]`        | 'A', 'S', 'D', 'F', '1', '2', '3', or '4'                                |

Note: This table is not exhaustive. I have left out several for the sake of brevity, but will explain further in my 201 article or you can read the docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes).

## Quantifiers
- ?
- *
- +
- `{a}`
- `{a,b}`

## Assertions
- `^`
- `$`

## Groups
- unnamed

## Flags
- RegExp constructor / literal
- `g` global
- `i` ignore-case

## Common Javascript Functions
- `.replace()`
- `.split()`
- `.match()` -> array of matched strings
- `.matchAll()` -> iterator of match arrays
	- requires `Array.from(string.matchAll(regex))`
	- Array/object shape:
	```pseudocode
	[
		matched str,
		index: match index
		input: input string
		groups: named groups ex. `{ groupName: match str }`
	]
	```
- `.test()` -> bool

## Shortcomings with RegExp Constructor and caution
- extra escaping
- no syntax highlighting

## Tools
- regex 101
- vscode syntax highlighting (link to my article on that)
- regex previewer extension
