# Regex 101

This post is my attempt at distilling what you need to know to get started reading most regular expressions in javascript. Regular expressions, also known as regex, are used for pattern matching, finding specific patterns in large bodies of text and extracting the information you are looking for. For example, if I was searching through some javascript files and wanted to extract all of the imports, I could create a pattern (a regex string) checking for the word `import` and some other syntax. I could manipulate these matches with javascript and extract the package names and which functions were imported! In general, regex can be used to check if some pattern exists in a text (returning true or false), or they could return a string match or list of matches.

I will try to include as many examples as possible to better illustrate and make clear all of these ideas instead of relying on explanation. In the future, I plan to follow up this post with a few more advanced concepts and have therefore simplified some of the information below for clarity. However, in general most of the bulk should be here, including some techniques of combining regex with javascript.

So let's get started!

## Table of Contents
- [Regex 101](#regex-101)
	- [Table of Contents](#table-of-contents)
	- [Character classes](#character-classes)
		- [A few examples](#a-few-examples)
		- [A quick side note on the backslash "" character](#a-quick-side-note-on-the-backslash--character)
	- [Quantifiers](#quantifiers)
		- [Examples](#examples)
	- [Assertions](#assertions)
		- [Examples](#examples-1)
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

| Character class | String to search    | Matches                                               |
| --------------- | ------------------- | ----------------------------------------------------- |
| `/\w/`          | "\% #a-_=1"         | 'a', '_', '1' (note that '1' here is a string)        |
| `/\d/`          | "as0df"             | '0'                                                   |
| `/\s/`          | "as df"             | ' '                                                   |
| `/./`           | "a1 ,_"             | Matches each character                                |
| `/[a-z]/`       | "asdfASDF1234"      | 'a', 's', 'd', 'f'                                    |
| `/[^a-z]/`      | "asdfASDF1234!@"    | 'A', 'S', 'D', 'F', '1', '2', '3', '4', '!', '@'      |
| `[^\s\n\t]`     | "as df\nASDF\t1234" | Every character that isn't a space ('\s', '\n', '\t') |

### A quick side note on the backslash "\" character

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

| Regex         | String(s) I want to match | Explanation                                                       |
| ------------- | ------------------------- | ----------------------------------------------------------------- |
| `/mine?/`     | "min" or "mine"           | The `?` will match if "e" occurs zero or one times                |
| `/a\d*/`      | "a", "a1", or "a12"       | Matches "a" alone or followed by any amount of numbers            |
| `/item\s\d+/` | "item 1" or "item 100"    | Matches "item " only when there are numbers following             |
| `/no{2}n/`    | "noon"                    | Will only match if there are exactly two "o"s in the word         |
| `/mo{2,}/`    | "moo" and "moooo"         | Matches the word if there are at least 2 "o"'s                    |
| `/mo{2,4}/`   | "moo" but not "moooo"     | Matches the word if there are as little as 2 and at most 4 "o"'s. |

| Regex             | String(s) I want to match | Explanation                                                                                      |
| ----------------- | ------------------------- | ------------------------------------------------------------------------------------------------ |
| `/\w+/`           | "Hello"                   | Matches both upper and lowercase letters                                                         |
| `/\w+\s\w+/`      | "Hello World"             | Matches 1 or more letters, one space, and one or more letters                                    |
| `/const\s{.+}/`   | "const { a }"             | Matches const, space, open curly bracket, any character 1 or more times before a closing bracket |
| `/const\s{.+}/`   | "const { a, b }"          | This string also works for the same above regex                                                  |
| `/const\s{?.+}?/` | "const a, b"              | Add question marks after the brackets to match if they optionally don't appear                   |

For a less contrived example, phone numbers!
| Regex                       | String I want to match                          | Explanation                                                                                  |
| --------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `/\d{3}-\d{4}/`             | ###-####                                        | Matches 3 digits followed by a hyphen and then 4 more digits                                 |
| `/\d{3}-?\d{4}/`            | #######                                         | Same as above, but now the hyphen can appear 0 or 1 times                                    |
| `/\d{3}-\d{3}-\d{4}/`       | ###-###-####                                    | Matches 3 digits followed by a hyphen, followed by the first example                         |
| `/\d*\s?\d{3}-\d{3}-\d{4}/` | # ###-###-#### with or without the country code | Matches a digit, 0 or more times, followed by 0 or 1 space, followed by the previous example |

Phone numbers get complicated fast. If we wanted to be thorough we could include hyphens, periods, OR spaces between groups of digits, introducing the "or" `|` character. We could check for parentheses (which would need to be escaped since they are reserved characters in regex), optional plus signs, and optional groups of digits like the area code, introducing groups `()`. And this is only including phone numbers taking the shape of 3 digits, 3 digits, 4 digits! I ignored groupings of numbers that are less common for me to see in the US. I'll include a more complete version for phone numbers below for reference.

`/(+?\d+\s)?(\d{3}(-|.|\s)?)?\d{3}(-|.|\s)?\d{4}/`

Now I'll just include a few more examples to fill some holes I think I have left. I'll also softly introduce parentheses.
| Regex                                   | String I want to match | Explanation                                                                                               |
| --------------------------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `/[a-z]+@[a-z]+\.[a-z]{2,}/`            | abc @abc.com           | Matches 1 or more lowercase letters, "@", 1 or more lowercase letters, a period, and at least two letters |
| `/([a-z]+)?\.[a-z]+@[a-z]+\.[a-z]{2,}/` | abc.def @abc.com       | Same as above, but now I'm also matching a prefixed group of lowercase letters and a period               |

## Assertions
| Character | Meaning                           |
| --------- | --------------------------------- |
| `/^/`     | Matches the beginning of an input |
| `/$/`     | Matches the end of an input       |

Now I'll briefly talk about assertions! You can ignore the term, as I think it adds unnecessary complexity. Allow me to note that I'm skipping over several rather important concepts here, especially lookaheads and lookbehinds. These are incredibly useful but are somewhat more advanced so I've decided to leave them out for now, but rest assured that I will go through them thoroughly in the follow up to this article, I just think you should be aware of them.

As for the two symbols above, let's take each in kind. By adding the symbol `^` to the start of a regular expression, it is metaphorically saying "Only match the following expression IF it matches the beginning of the string we are testing on." If the multiline flag is set to true (which I'll go into more detail in the [flags section](#flags)) then this will also match after a line break `\n`. An example, the regular expression `/^hello/`, will match the string "hello world", but not "oh hello".

On the flip side, `$` at the end of a regular expression will only match a string if it appears at the end of an input. Same as the previous paragraph, if the multiline flag is set to true, then this will also match a string immediately before a line break. An example, the regular expression `/you$/`, will match the "you" in "see you", but not in "see you later".

### Examples
| Regex     | String(s) I want to match      |
| --------- | ------------------------------ |
| `/^call/` | "call" in "call me later"      |
| `/call$/` | "call" in "who you gonna call" |

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
