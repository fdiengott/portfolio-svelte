# Regex 101

## Table of Contents
- [Introduction](#introduction)
- [Creating a regular expression](#creating-a-regular-expression)
- [Character classes](#character-classes)
	- [A few examples](#a-few-examples)
	- [A quick side note on the backslash "" character](#a-quick-side-note-on-the-backslash--character)
- [Quantifiers](#quantifiers)
	- [Quantifier Examples](#quantifier-examples)
- [Assertions](#assertions)
	- [Assertion Examples](#assertion-examples)
- [Groups](#groups)
	- [Group Examples](#group-examples)
- [Flags](#flags)
- [Javascript Functions and Constructors](#javascript-functions-and-constructors)
	- [RegExp.prototype.test()](#regexp-prototype-test)
	- [String.prototype.replace()](#string-prototype-replace)
	- [String.prototype.split()](#string-prototype-split)
	- [String.prototype.match()](#string-prototype-match)
	- [String.prototype.matchAll()](#string-prototype-matchall)
- [Thoughts on RegExp Constructor and caution](#thoughts-on-regexp-constructor-and-caution)
- [Tools](#tools)
- [Conclusion](#conclusion)

## Introduction

This post is my attempt at distilling what you need to know to get started reading most regular expressions in javascript. Regular expressions, also known as regex, are used for pattern matching, finding specific patterns in large bodies of text, and extracting the information you are looking for. For example, if I was searching through some javascript files and wanted to extract all of the imports, I could create a pattern (a regex string) checking for the word `import` and some other syntax. I could manipulate these matches with javascript and extract the package names and which functions were imported! In general, regex can be used to check if some pattern exists in a text (returning true or false), or they could return a string match or list of matches.

I will try to include as many examples as possible to better illustrate and make clear all of these ideas instead of relying on explanation. In the future, I plan to follow up this post with a few more advanced concepts and have therefore simplified some of the information below for clarity. However, in general, most of the bulk should be here, including some techniques of combining regex with javascript.

So let's get started!

## Creating a regular expression

There are two ways of creating a regular expression:
1. Using a regular expression literal
   ```javascript
   const regex = /pattern-to-match/g;
   ```
2. Using the `RegExp` class constructor
   ```javascript
   const regex = new RegExp('pattern-to-match', 'g');
   ```

These each have their pros and cons, which I will discuss further in the [Thoughts on RegExp Constructor and caution](#thoughts-on-regexp-constructor-and-caution) section. Throughout this tutorial, I will almost exclusively use the literal syntax, but be aware that this was a choice and not a requirement.

## Character classes

Let's start with the basic building blocks! I've included a table below of some of the most common and will explain each in kind.

Please note: This table is not exhaustive. I have left out several entries for the sake of brevity, but will explain further in my 201 article. You can also read the MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes).

| Character class | Matches                                                                               |
| --------------- | ------------------------------------------------------------------------------------- |
| `/\w/`          | a letter, number, or underscore                                                       |
| `/\d/`          | a number, 0 - 9                                                                       |
| `/\s/`          | any whitespace character (e.g. space, tab, newline, etc )                             |
| `/./`           | any character that is not a newline (in 201 we can also make this match newlines too) |
| `/[...]/`       | any specific character that we explicitly request                                     |
| `/[^...]/`      | any specific character NOT explicitly requested                                       |
| `/a\|b/`        | a OR b                                                                                |

The first character class I want to introduce is `\w`. This will match a single character that is either a letter (upper or lower case), a number, or an underscore. We'll get to matching specific numbers of characters in the next section, but we'll just start with matching one. If, however, someone wanted only to match a number, they would use the `\d` character class instead. This matches the characters 0 through 9.

Next, we have the `\s` character class. This will match any whitespace character, be it a space, tab (`\t`), or newline (`\n`), also known as a carriage return. There are other whitespace characters as well, but these are by far the most common.

If there is a situation where it isn't clear what characters will exist, just that there will be some, then you'll need to employ the `.` class! The `.` (which I will refer to as the dot class) will match any character except newlines. The dot class is very powerful but can be unruly since it can match anything.

Next, we have the square brackets `[...]`. The brackets allow a person to explicitly declare the characters they are looking for. This can take the form of a list of characters or a range. For example, if one wanted to match any letter or number, but didn't want to include the underscore (making `\w` a bad candidate because it includes the underscore), they would use `[a-zA-Z0-9]`. Notice I specified ranges for both lower and upper case letters here (regex is very specific about capitalization unless [told otherwise](#flags)). A couple of examples of what it would look like to not only use ranges: if someone wanted to match css classes that are kebab cased, they would use `[a-z-]` so they match lowercase letters and hyphens. If someone was checking if a password was complex enough and included symbols, they could use something like `[!#$%&*@-.[\]^_]`. Note that if the hyphen `-` is included first or last in the brackets, it is regarded as a literal hyphen character.

The sibling of `[...]` is the negated version `[^...]`, which matches anything that is NOT in this list. For example, if I had `[^a-m]`, then this would match "n" through "z", but not "a" through "m". Additionally, because this is matching ANYTHING that is not in the brackets, it will also match numbers, symbols, and spaces! This negated version works exactly the same as its sibling in terms of accepting ranges or a list of characters, as long as the carrot `^` precedes it.

Next, you'll notice `|` is different from the other classes. The "or" `|` operator doesn't fit neatly into any section on this page so I'm shoehorning it in here since it is so fundamental! It is used any time you are looking for this pattern OR that one. For example, if I wanted to match the strings "musical theater" or "puppet theater" (because I'm cheeky), I could use the pattern `/(musical|puppet) theater/`. You'll notice I used parentheses here. If I hadn't, it would only match the strings "musical" or "puppet theater".

A couple of quick notes on the above before I get into some clarifications of the `\` character and some examples! Firstly, note that the dot, within the context of square brackets, acts as a period  and nothing more. This is true for many of the characters above, which have roles in regex outside of being characters we are trying to match (e.g. parentheses `()`, curly braces `{}`, the asterisk `*`, dollar sign `$`, etc.).

### A few examples

| Character class | String to search    | Matches                                               |
| --------------- | ------------------- | ----------------------------------------------------- |
| `/\w/`          | "\% #a-_=1"         | 'a', '_', '1' (note that '1' here is a string)        |
| `/\d/`          | "as0df"             | '0'                                                   |
| `/\s/`          | "as df"             | ' '                                                   |
| `/./`           | "a1 ,_"             | Matches each character                                |
| `/[a-z]/`       | "asdfASDF1234"      | 'a', 's', 'd', 'f'                                    |
| `/[^a-z]/`      | "asdfASDF1234!@"    | 'A', 'S', 'D', 'F', '1', '2', '3', '4', '!', '@'      |
| `/[^\s\n\t]/`   | "as df\nASDF\t1234" | Every character that isn't a space ('\s', '\n', '\t') |
| `/[a-z](0\|1)/` | "a0 b1 c2 d0"       | 'a0', 'b1', 'd0'                                      |

### A quick side note on the backslash "\" character

The backslash, "escape" character `\` is very important in regular expressions and means quite different things in different contexts. In the context of character classes above, it can separate the letter `w` from `\w` which matches any alphanumeric character, plus '-'.

Special characters, like the dot `.` and the dollar sign `$`, can be taken literally when preceded by a backslash. For example, `/abc\.com/`, will only match "abc.com" whereas the regex `/abc.com/` will also match "abc.com", but also "abc*com", since the "unescaped" dot means match any character (Reminder: unescaped i.e. not preceded by a backslash).

Within square brackets, it means to take a character literally instead of applying its regex role. To explain this more clearly, in my final example a few paragraphs above (`[!#$%&*@-.[\]^_]`) on using square brackets `[...]` with lots of symbols, you'll note that there is a square bracket in the middle of the string preceded by a backslash `\`. This means, in this context, that we literally want to match the closing square brackets character `]` and we therefore don't want it exercising its regex role as the end of a character list.

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

### Quantifier Examples

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

Now I'll briefly talk about assertions! You can ignore the term, as I think it adds unnecessary complexity. Allow me to note that I'm skipping over several rather important concepts here, especially lookaheads and lookbehinds. These are incredibly useful but are somewhat more advanced so I've decided to leave them out for now, but rest assured that I will go through them thoroughly in the follow-up to this article, I just think you should be aware of them.

As for the two symbols above, let's take each in kind. By adding the symbol `^` to the start of a regular expression, it is metaphorically saying "Only match the following expression IF it matches the beginning of the string we are testing on." If the multiline flag is set to true (which I'll go into more detail in the flags section of the following article) then this will also match after a line break `\n`. An example, the regular expression `/^hello/`, will match the string "hello world", but not "oh hello".

On the flip side, `$` at the end of a regular expression will only match a string if it appears at the end of an input. Same as the previous paragraph, if the multiline flag is set to true, then this will also match a string immediately before a line break. An example, the regular expression `/you$/`, will match the "you" in "see you", but not in "see you later".

### Assertion Examples

| Regex     | String(s) I want to match      |
| --------- | ------------------------------ |
| `/^call/` | "call" in "call me later"      |
| `/call$/` | "call" in "who you gonna call" |

## Groups
| Character | Meaning                                                                       |
| --------- | ----------------------------------------------------------------------------- |
| `/(x)/`   | Capturing group. This is important for when we get to working with javascript |

Sometimes one might want only part of a match. That is where groups come in! Say I wanted to find email addresses for everyone at one institution. I would want to create the expression to include the `@company.com`, but I really only care about what occurs before the '@'. So what do I do? I create my expression with a group `()` around what I'm looking for, `/([a-zA-Z.-]+)@company\.com/`. This way, when I get the match back, in javascript I can key in and get only the text inside the parentheses. The match will look something like this: `[ "name@company.com", "name" ]`. At the first index, we have the entire match, and after that, we have what was specified in our group. If there were two groups in this regular expression, say `/([a-zA-Z.-]+)@(company.com)/`, then each group will be returned, `[ "name@company.com", "name", "company.com" ]`.

### Group Examples

| Regex                        | Input String         | Match Object                         |
| ---------------------------- | -------------------- | ------------------------------------ |
| `/Table([a-zA-Z]+)/`         | "TableBody"          | `[ "TableBody", "Body"]`             |
| `/([a-z]+) in the ([a-z]+)/` | "The cat in the hat" | `[ "cat in the hat", "cat", "hat" ]` |

## Flags

| Character | Meaning     |
| --------- | ----------- |
| `/g`      | global      |
| `/i`      | ignore-case |

This section is about augmenting the patterns that have been written so that they work slightly differently. I'm only covering 2 of the 8 that exist, but these are by far the most important and common. I'll go through a few more in my 201 article.

Let's start with the global flag `/g`. In the previous section, I made up an example of searching for email addresses on a company website. I somewhat lied in the pursuit of simplicity. Using the pattern I had constructed would actually only match the first occurrence of the email address pattern. If we wanted to actually match every occurrence, we would add a global flag, which would look like this: `/([a-zA-Z.-]+)@company\.com/g`, adding the `g` flag at the end after the second forward slash `/`. If we were creating this pattern using the RegExp constructor, the flag would be the second argument (i.e. `new RegExp("([a-zA-Z.-]+)@company\.com,", "g")`). When matching with the global `g` flag enabled returns an array of all of the matches, for example `["a@company.com", "b@company.com", ...]` (this is assuming you are using `String.prototype.match`, which will ignore groups; I'll explain a way to retain the groups in the next section).

Let's move on to the `/i` flag, which is simply a command to ignore case. This means that even if only `[a-z]` is specified in an expression, it will also match `[A-Z]`.

If more than one flag needs to be specified, add them all next to each other in any order (e.g. `/[a-z]/gi`, which will return the match `["a", b", "C", "D"]` for the input "abCD").

## Javascript Functions and Constructors

So we've now gone through the basics of regular expressions! Good job for making it this far. I'm now going to go through the javascript functions that I use most in conjunction with regular expressions! This list is not exhaustive as to what is out there, but it will include all of the functions I use. I'll try to go from the most simple to most most complex, but with some flexibility.

| Function                    | Returns  |
| --------------------------- | -------- |
| RegExp.prototype.test()     | Boolean  |
| String.prototype.replace()  | String   |
| String.prototype.match()    | String[] |
| String.prototype.matchAll() | Iterator |

### RegExp.prototype.test()

`test()` is best used to check if some pattern exists in a string. For example, if we were searching through some raw html element and wanted to know if it had the disabled attribute, we could do this:

```javascript
const str = `<button class="class" disabled>Click me</button>`;
const regex = /disabled/;

const isButtonDisabled = regex.test(str);
```

Take note that this is a regex function. The rest of our functions will be for strings.

### String.prototype.replace()

Rarely have I seen anyone else use `replace()`, with anything other than a string, but I found its usage with regex to be incredibly powerful and easy! My most common use case is to remove some characters from within a string. For example, let's say I'd like to format any header in this document into a properly formatted id. The name of this section has two periods and parentheses, which are not accepted in ids. I'd like to turn the periods into dashes and remove the parentheses. I'll show how in two steps below, and then combine them into one statement.

```javascript
const text = "String.prototype.replace()";

/*
 * matches all periods and replaces with a string "-".
 * notice that I escaped the period so that it wouldn't be a dot and match anything
 * remember to add the global flag to replace ALL occurrences
 */
const textWithoutPeriods = text.replace(/\./g, '-');

/*
 * take the previous string and match anything that is not a letter or dash
 * replace it with an empty string, or in other words, remove it
 * note that I'm using the global and ignore-case flags
 */
const textWithoutParentheses = textWithoutPeriods.replace(/[^a-z-]/gi, '');


// now all in one line
const id = text.replace(/\./g, '-').replace(/[^a-z-]/gi, '');
```

Here are some more examples.
```javascript
const text1 = 'id-1';
const textNumber = text1.replace(/id-/g, '');

const arrayOfIds = ['id-1', 'id-2', 'id-3', 'id-4', 'id-5'];
const idNumbers = arrayOfIds.map(id => id.replace(/id-/g, '')); // -> [1, 2, 3, 4, 5]
```

### String.prototype.split()

Before we get to matching, I want to make a quick detour into `split()`, which I often find incredibly useful in combination with other js/regex tools. I recently had a project where I needed to split a large string on every instance of a curly brace. `str.split()` with string inputs only works for EITHER opening or closing braces, but not both.

### String.prototype.match()

`match()` and its sibling `matchAll()`, which I'll cover next, are the main tools used for handling strings with regex. Using it is pretty straightforward, so let's dive into some examples, shall we?

```javascript
const str = "My friend, Mara, the pig";
const nameRegex = /,\s\w+,/;
const nameMatch = str.match(nameRegex);

console.log(nameMatch); // [", Mara,"]

const nameGroupRegex = /,\s(\w+),/;
const nameGroupMatch = str.match(nameGroupRegex);

console.log(nameGroupMatch); // [", Mara,","Mara"]
```

Feel free to run this in your browser's dev tools or in a terminal REPL. You'll notice that the logs have more than just what I've pasted here. These arrays also have several other properties, `index`, `input`, and `groups`. So your output from the first console log actually looks something like this: `[", Mara,", index: 9, input: 'My friend, Mara, the pig', groups: undefined ]`. The index is, of course, the index of the string where the match begins and the input is self-explanatory. The groups, on the other hand, you would expect to return something from the `nameGroupMatch` example above. It doesn't, however. Groups will only return something if named groups are used, a concept I'll cover in my 201 article.

Let's move on to using the global `/g` flag and a case when there is no match!
```javascript
const str = `
<header>
	<h1>Title</h1>
	<div>
    	<button>Btn 1</button>
    	<button>Btn 2</button>
	</div>
</header>
`;

// We're looking for an anchor tag,
// any characters that aren't a right angle bracket 0 or more times followed by a right angle bracket
// then any characters that aren't a left angle bracket (signifying the closing tag) 1 or more times
// then the closing anchor tag '</a>', but we need to escape the forward slash so it doesn't end the regex early
const noMatchRegex = /<a[^>]*>[^<]+<\/a>/;
const noMatch = str.match(noMatchRegex);

console.log(noMatch); // null

const globalRegex = /<button[^>]*>[^<]+<\/button>/g;
const globalMatch = str.match(globalRegex);

// the g flag returns an array of matches or null if no match was found
console.log(globalMatch); // [ '<button>Btn 1</button>', '<button>Btn 2</button>' ]
```

### String.prototype.matchAll()

The main reason to use `matchAll()` over `match()` is to include capturing groups! This includes both unnamed capturing groups `()` like we covered [above](#groups), but also named groups which I'll cover in my 201 article. However, instead of returning a simple array, `matchAll()` returns an iterator, which I prefer to convert into an array of match objects. Let's start with the example from the last section but with a group this time.

```javascript
const str = `
<header>
	<h1>Title</h1>
	<div>
    	<button>Btn 1</button>
    	<button>Btn 2</button>
	</div>
</header>
`;

// notice I've wrapped the inner `[^<]+` in parentheses to make a group
const regex = /<button[^>]*>([^<]+)<\/button>/g;
const matchIterator = str.matchAll(regex);
const matchArray = Array.from(matchIterator); // converts the iterator into an array

console.log(matchArray);
/**
 * [
 *   [
 *      "<button>Btn 1</button>",
 *      "Btn 1"
 *   ],
 *   [
 *      "<button>Btn 2</button>",
 *      "Btn 2"
 *   ]
 * ]
 */
```

`matchArray` is a list of arrays, where each item contains both the entire match and the group matches. Let's try an example with more than one group.

```javascript
const str = `
<header>
	<h1>Title</h1>
	<div>
    	<button class="btn-primary">Btn 1</button>
    	<button class="btn-secondary">Btn 2</button>
	</div>
</header>
`;

// same as above, except now I've introduced `class="([a-z-]+)"` which captures the class name
const regex = /<button[^>]*class="([a-z-]+)"[^>]*>([^<]+)<\/button>/g;
const matches = Array.from(str.matchAll(regex)); // combined iterator and conversion to array into one line

console.log(matchArray);
/**
 * [
 *   [
 *      "<button class=\"btn-primary\">Btn 1</button>",
 *      "btn-primary",
 *      "Btn 1"
 *   ],
 *   [
 *      "<button class=\"btn-secondary\">Btn 2</button>",
 *      "btn-secondary",
 *      "Btn 2"
 *   ]
 * ]
 */
```

Each item in the matches array is an array containing the entire match and each group it found. This is excellent for pulling out exactly what it is you're looking for! I'll give one last example, replete with how I'd map it into something more usable.

```javascript
const jsFile = `
import Button from 'library/lib/Button';
import Slider from 'library/lib/Slider';
import ExpandCollapse from 'library/lib/ExpandCollapse';
...
`;

const regex = /import\s(\w+)\sfrom\s'([a-zA-Z-]+)[^;]+;/g;
const matches = Array.from(jsFile.matchAll(regex));

console.log(matches); // [ ['import Button...', 'Button', 'library'], ... ]

const importedComponents = matches.map(match => match[1]); // ['Button', 'Slider', 'ExpandCollapse']
const libraries = matches.map(match => match[2]); // ['library', 'library', 'library' ]
const uniqueLibraries = new Set(libraries); // Set { "library" }
```

## Thoughts on RegExp Constructor and caution

Before I wrapped up I wanted to note some pros and cons of using the RegExp constructor. When you see regex in a code editor, if it uses the literal syntax (what I've done for this tutorial) then it will have lovely syntax highlighting (if it doesn't and you're using vscode, add options like [these](https://github.com/fdiengott/vscode-settings/blob/main/vscode-settings.md?plain=1#L216) into your settings.json file). However, if using the RegExp constructor, none of that highlighting will be available, which will make each pattern much harder to parse. So then why use the constructor? The main reason for me is when it is necessary to pass in variables via template literals. For example, if I'm looking for a component in a raw javascript file, but I don't know which component I'll be looking for when I write the code, I'll need to write an expression like this:
```javascript
new RegExp(`<${component}[^>]*>`, "g")
```

The main thing to note about using the constructor, and therefore a word of caution I present to you, is that often you'll need to escape multiple times and it will not be obvious. This is an easy bug to overlook, so I suggest getting into the habit of console logging the output from the RegExp constructor. An example:

```javascript
const str = "abc def";

// the wrong way to do it
const wrongRegex = new RegExp("\w+", "g");

console.log(wrongRegex); // /w+/
console.log(str.match(wrongRegex)); // null

// the right way to do it
const correctRegex = new RegExp("\\w+", "g");

console.log(correctRegex); // /\w+/
console.log(str.match(correctRegex)); // ['abc', 'def']
```

## Tools

Congrats! You made it to the end! I'll lastly leave you with some links for tools I find incredibly helpful.

- [Regex101](https://regex101.com/). This is an easy way to test out regex patterns with instant feedback, great syntax highlighting, and built-in docs.
- [MDN Regular Expression Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions). If you want full details on anything I've covered here, this is where to look.
- [VSCode regex syntax highlighting](https://github.com/fdiengott/vscode-settings/blob/main/vscode-settings.md?plain=1#L216). If you don't have great syntax highlighting, add this to your settings.json and tweak the colors to your theme. I might in the future publish an article about how to easily find the settings you're looking for to customize your theme.
- The "Regex Previewer" vscode extension by Christof Marti seems pretty good if you prefer an in-editor version of regex 101.

## Conclusion

Well, that's it! Thanks for reading and happy matching!
