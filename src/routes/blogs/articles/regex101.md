# Regex 101

This post is my attempt at distilling what you need to know to get started reading most regular expressions in javascript. Regular expressions, also known as regex, are used for pattern matching, finding specific patterns in large bodies of text and extracting the information you are looking for. For example, if I was searching through some javascript files and wanted to extract all of the imports, I could create a pattern (a regex string) checking for the word `import` and some other syntax. I could manipulate these matches with javascript and extract the package names and which functions were imported! In general, regex can be used to check if some pattern exists in a text (returning true or false), or they could return a string match or list of matches.

I will try to include as many examples as possible to better illustrate and make clear all of these ideas instead of relying on explanation. In the future, I plan to follow up this post with a few more advanced concepts and have therefore simplified some of the information below for clarity. However, in general most of the bulk should be here, including some techniques of combining regex with javascript.

So let's get started!

## Table of Contents
- [Regex 101](#regex-101)
	- [Table of Contents](#table-of-contents)
	- [Character classes](#character-classes)
		- [A few examples](#a-few-examples)
		- [A quick side note on the backslash `\` character](#a-quick-side-note-on-the-backslash--character)
	- [Quantifiers](#quantifiers)
		- [Examples](#examples)
	- [Assertions](#assertions)
	- [Groups](#groups)
	- [Flags](#flags)
	- [Common Javascript Functions](#common-javascript-functions)
	- [Shortcomings with RegExp Constructor and caution](#shortcomings-with-regexp-constructor-and-caution)
	- [Tools](#tools)

## Character classes

Let's start with the basic building blocks! I've included a table below of some of the most common and will explain each in kind.

Please note: This table is not exhaustive. I have left out several entries for the sake of brevity, but will explain further in my 201 article. You can also read the MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes).

| Character class | Matches                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------ |
| `/\w/`          | a letter, number, or underscore                                                            |
| `/\d/`          | a number, 0 - 9                                                                            |
| `/\s/`          | any whitespace character (e.g. space, tab, newline, etc )                                  |
| `/./`           | any character that is not a newline (in advanced we can also make this match newlines too) |
| `/[...]/`       | any specific character that we explicitly request                                          |
| `/[^...]/`      | any specific character NOT explicitly requested                                            |

The first character class I want to introduce is `\w`. This will match a single character that is either a letter (upper or lower case), a number, or an underscore. We'll get to matching specific numbers of characters in the next section, but we'll just start with matching one. If, however, someone wanted only to match a number, they would use the `\d` character class instead. This matches the characters 0 through 9.

Next we have the `\s` character class. This will match any whitespace character, be it a space, tab (`\t`), or newline (`\n`), also known as a carriage return. There are other whitespace characters as well, but these are by far the most common.

If there is a situation where it isn't clear what characters will exist, just that there will be some, then you'll need to employ the `.` class! The `.` (which I will refer to as the dot class) will match any character except newlines. The dot class is very powerful, but can be unruly since it can match anything.

Next, we have the square brackets `[...]`. The brackets allow a person to explicitly declare the characters they are looking for. This can take the form of a list of characters or a range. For example, if one wanted to match any letter or number, but didn't want to include the underscore (making `\w` a bad candidate because it includes the underscore), they would use `[a-zA-Z0-9]`. Notice I specified ranges for both lower and upper case letters here (regex is very specific about capitalization unless [told otherwise](#flags)). A couple examples of what it would look like to not only use ranges: if someone wanted to match css classes that are kebab cased, they would use `[a-z-]` so they match lowercase letters and hyphens. If someone was checking if a password was complex enough and included symbols, they could use something like `[!#$%&*@-.[\]^_]`. Note that if the hyphen `-` is included first or last in the brackets, it is regarded as a literal hyphen character.

The sibling of `[...]` is the negated version `[^...]`, which matches anything that is NOT in this list. For example, if I had `[^a-m]`, then this would match "n" through "z", but not "a" through "m". Additionally, because this is matching ANYTHING that is not in the brackets, it will also match numbers, symbols, and spaces! This negated version works exactly the same as its sibling in terms of accepting ranges or a list of characters, as long as the carrot `^` precedes it.

A couple quick notes on the above before I get into some clarifications of the `\` character and some examples! Firstly, note that the dot, within the context of square brackets, acts as a period  and nothing more. This is true for many of the characters above, which have roles in regex outside of being characters we are trying to match (e.g. parentheses `()`, curly braces `{}`, the asterisk `*`, dollar sign `$`, etc.).

### A few examples

| String to search    | Character class | Matches                                               |
| ------------------- | --------------- | ----------------------------------------------------- |
| "\% #a-_=1"         | `/\w/`          | 'a', '_', '1' (note that '1' here is a string)        |
| "as0df"             | `/\d/`          | '0'                                                   |
| "as df"             | `/\s/`          | ' '                                                   |
| "a1 ,_"             | `/./`           | Matches each character                                |
| "asdfASDF1234"      | `/[a-z]/`       | 'a', 's', 'd', 'f'                                    |
| "asdfASDF1234!@"    | `/[^a-z]/`      | 'A', 'S', 'D', 'F', '1', '2', '3', '4', '!', '@'      |
| "as df\nASDF\t1234" | `[^\s\n\t]`     | Every character that isn't a space ('\s', '\n', '\t') |

### A quick side note on the backslash `\` character

The backslash, "escape" character `\` is very important in regular expressions and means quite different things in different contexts. In the context of character classes above, it can separate the letter `w` from `\w` which matches any alphanumeric character, plus '-'.

Special characters, like the dot `.` and the dollar sign `$`, can be taken literally when preceded by a backslash. For example, `/abc\.com/`, will only match "abc.com" whereas the regex `/abc.com/` will also match "abc.com", but also "abc*com", since the "unescaped" dot means match any character (Reminder: unescaped i.e. not preceded by a backslash).

Within square brackets, it means to take literally a character instead of applying its regex role. To explain this more clearly, in my final example a few paragraphs above (`[!#$%&*@-.[\]^_]`) on using square brackets `[...]` with lots of symbols, you'll note that there is a square bracket in the middle of the string preceded by a backslash `\`. This means, in this context, that we literally want to match the closing square brackets character `]` and we therefore don't want it exercising its regex role as the end of a character list.

Another example of an escape (`\`) character in brackets is if I wanted to match a file location in windows, which generally takes the form of `C:\Users\Administrator\folder\file`. I would need to use something like `[a-zA-Z:\\]`. I have two backslashes here to mean "literally look for a backslash". If I hadn't included two backslashes (i.e. `[a-zA-Z:\]`), then this would cause a syntax error! Regex would interpret the final square bracket as the character `]` and not the end of a group of characters.

## Quantifiers

Previously, we discussed matching one character at a time, which isn't super useful. So let's now turn to quantifiers! These will help us match a certain number of occurrences of each character/pattern.

| Character  | Meaning                                                    |
| ---------- | ---------------------------------------------------------- |
| `/x?/`     | Match 'x' 0 or 1 times                                     |
| `/x*/`     | Match 'x' 0 or more times                                  |
| `/x+/`     | Match 'x' 1 or more times                                  |
| `/x{a}/`   | Match 'x' "a" number of times                              |
| `/x{a,}/`  | Match 'x' at least "a" number of times                     |
| `/x{a,b}/` | Match 'x' from "a" to "b" number of times (e.g. 3-5 times) |

The above table I think makes itself pretty clear and becomes quite powerful once combined with the character classes we covered above. So let's immediately dive into some examples to clear up any confusion!

### Examples

Let's start simple and work our way up.

| String(s) I want to match | Regex         | Explanation                                                       |
| ------------------------- | ------------- | ----------------------------------------------------------------- |
| "min" or "mine"           | `/mine?/`     | The `?` will match if "e" occurs zero or one times                |
| "a", "a1", or "a12"       | `/a\d*/`      | Matches "a" alone or followed by any amount of numbers            |
| "item 1" or "item 100"    | `/item\s\d+/` | Matches "item " only when there are numbers following             |
| "noon"                    | `/no{2}n/`    | Will only match if there are exactly two "o"s in the word         |
| "moo" and "moooo"         | `/mo{2,}/`    | Matches the word if there are at least 2 "o"'s                    |
| "moo" but not "moooo"     | `/mo{2,4}/`   | Matches the word if there are as little as 2 and at most 4 "o"'s. |

| String(s) I want to match | Regex             | Explanation                                                                                      |
| ------------------------- | ----------------- | ------------------------------------------------------------------------------------------------ |
| "Hello"                   | `/\w+/`           | Matches both upper and lowercase letters                                                         |
| "Hello World"             | `/\w+\s\w+/`      | Matches 1 or more letters, one space, and one or more letters                                    |
| "const { a }"             | `/const\s{.+}/`   | Matches const, space, open curly bracket, any character 1 or more times before a closing bracket |
| "const { a, b }"          | `/const\s{.+}/`   | This string also works for the same above regex                                                  |
| "const a, b"              | `/const\s{?.+}?/` | Add question marks after the brackets to match if they optionally don't appear                   |

For a less contrived example, phone numbers!
| String I want to match                          | Regex                       | Explanation                                                                                  |
| ----------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| ###-####                                        | `/\d{3}-\d{4}/`             | Matches 3 digits followed by a hyphen and then 4 more digits                                 |
| #######                                         | `/\d{3}-?\d{4}/`            | Same as above, but now the hyphen can appear 0 or 1 times                                    |
| ###-###-####                                    | `/\d{3}-\d{3}-\d{4}/`       | Matches 3 digits followed by a hyphen, followed by the first example                         |
| # ###-###-#### with or without the country code | `/\d*\s?\d{3}-\d{3}-\d{4}/` | Matches a digit, 0 or more times, followed by 0 or 1 space, followed by the previous example |

Phone numbers get complicated fast. If we wanted to be thorough we could include hyphens, periods, OR spaces between groups of digits, introducing the "or" `|` character. We could check for parentheses (which would need to be escaped since they are reserved characters in regex), optional plus signs, and optional groups of digits like the area code, introducing groups `()`. And this is only including phone numbers taking the shape of 3 digits, 3 digits, 4 digits! I ignored groupings of numbers that are less common for me to see in the US. I'll include a more complete version for phone numbers below for reference.

`/(+?\d+\s)?(\d{3}(-|.|\s)?)?\d{3}(-|.|\s)?\d{4}/`

Now I'll just include a few more examples to fill some holes I think I have left. I'll also softly introduce parentheses.
| String I want to match | Regex                                   | Explanation                                                                                               |
| ---------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| abc @abc.com           | `/[a-z]+@[a-z]+\.[a-z]{2,}/`            | Matches 1 or more lowercase letters, "@", 1 or more lowercase letters, a period, and at least two letters |
| abc.def @abc.com       | `/([a-z]+)?\.[a-z]+@[a-z]+\.[a-z]{2,}/` | Same as above, but now I'm also matching a prefixed group of lowercase letters and a period               |

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
		index: match index,
		input: input string,
		groups: named groups ex. `{ groupName: match str }`,
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
