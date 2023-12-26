import zshBold from '../../../assets/images/zsh-bold.png';
import zshUnderlined from '../../../assets/images/zsh-underlined.png';
import zshHighlighted from '../../../assets/images/zsh-highlighted.png';
import zshForeground from '../../../assets/images/zsh-foreground.png';
import zshBackground from '../../../assets/images/zsh-background.png';
import zshSimpleExample from '../../../assets/images/zsh-simple-example.png';

const zshThemeCustomization = `
# Zsh Theme Customization

In my effort to make my customize my zsh terminal exactly how I wanted, I found that there weren't many good articles on the topic. So today I'm going to guide you through a few pieces of simple syntax to improve your terminal experience!

## Setting up your custom theme

1. Navigate to your home directory (\`cd ~\`).
2. Open your \`.zshrc\` file.
3. If the file has been set up correctly, there should be a variable called \`ZSH_THEME\`. Set this to whatever name you'd like for your new custom theme. Mine is "minimalism" (very creative, I know).
    - If you choose to customize an existing theme instead of creating your own, put the name of that theme here and we can customize it within the file it is defined.
4. Navigate to the folder \`~/.oh-my-zsh/custom/themes/\` and create your new theme! Mine is \`~/.oh-my-zsh/custom/themes/minimalism.zsh-theme\`.
    - If you decided to edit an existing theme (which is how I started), find the theme you like in the folder \`~/.oh-my-zsh/themes/\` and open it up.

## Customizing the theme

### Basic structure

Our basic structure starts with two variables, \`PROMPT\` and \`RPROMPT\`. Both are optional and specify what is displayed on the left and the right side of the terminal.

I begin my \`PROMPT\` with a line break so that there's always some space before a new command.

\`\`\`
# minimalism.zsh-theme

PROMPT='
%F{magenta}> %f'
\`\`\`

Note that spaces (including line breaks) are interpreted literally, so there is little to be done about improving readability.

Next, as will immediately become apparent, the percent symbol \`%\` is a reserved, special character and is central to theming. It is used for styling (e.g. \`%F{red}text that is red%f\`) and for reserved content (e.g.\`%c\`) (the current directory).

I'll return later to some more advanced content, such as git commands and custom functions.

### Basic content

Below is some of the basic content I've come across. It is just as easy as including these in your \`PROMPT\` or \`RPROMPT\` strings.

| Syntax | Description                                                   |
| ------ | ------------------------------------------------------------- |
| %n     | username                                                      |
| %m     | host name                                                     |
| %1~    | current directory. The number references number of files down |
| %c     | current directory                                             |
| %T     | time in 24-hour format                                        |
| %t     | time in AM/PM or 12-hour format                               |
| %*     | time in 24-hour format with seconds                           |

#### Example
\`\`\`bash
# minimalism.zsh-theme

PROMPT='
%* >'
\`\`\`

![Simple example](${zshSimpleExample})

### Styling
Zsh supports bold, underline, and foreground and background colors. Below is a table of how to implement each.

| Syntax               | Style            | Example                       | Images                                        |
| -------------------- | ---------------- | ----------------------------- | --------------------------------------------- |
| \`%B ... %b\`        | Bold             | \`%B%n%b\`                    | ![Zsh bold example](${zshBold})               |
| \`%U ... %u\`        | Underline        | \`%U%1~%u\`                   | ![Zsh underlined example](${zshUnderlined})   |
| \`%S ... %s\`        | Highlighted      | \`%S%T%s\`                    | ![Zsh highlighted example](${zshHighlighted}) |
| \`%F{color} ... %f\` | Foreground color | \`%F{red}$(git_repo_name)%f\` | ![Zsh foreground example](${zshForeground})   |
| \`%K{color} ... %k\` | Background color | \`%F{red}%K{yellow}%t%f%k\`   | ![Zsh background example](${zshBackground})   |

### More complex content

[Here](https://gist.github.com/aamnah/b50b081a752f6e193f9202c2c445b740) is a list of all of the git commands you might want access to. I list some examples for how to use them below.

To include a function, like the existing ones in the link above, one passes it to \`PROMPT\` or \`RPROMPT\` like so:

\`\`\`bash
RPROMPT='$(git_current_branch)'
\`\`\`

The link above also has a list of prompt variables, which are in screaming snake case (e.g. ZSH_THEME_GIT_PROMPT_DIRTY). These can be defined anywhere in your theme file and often include stylized symbols. For example, I include a number of symbols for if the branch is clean or note.

\`\`\`bash
ZSH_THEME_GIT_PROMPT_DIRTY="%F{yellow} ☂%f"
ZSH_THEME_GIT_PROMPT_UNTRACKED="%F{cyan} ✭%f"
ZSH_THEME_GIT_PROMPT_CLEAN="%F{yellow} ☀%f"
\`\`\`

### Custom functions

Creating and using your own custom functions is very easy and straightforward! All you need to do is create a function, let's call if \`custom_function()\`. Then in one of your \`PROMPT\`'s, pass it like so: \`\${$(custom_function)}\`. This will be run every time on terminal load and after every terminal command, so if the function relies on git, make sure it checks if this is a git repository.

#### Example
In my current job, my team has a convention for naming our git branches which includes the numbers of the current jira ticket (the task we are working on). To include this in my minimalist terminal, I created the following custom function.

\`\`\`bash
RPROMPT='%S%F{yellow}$(current_ticket)%f%s'

current_ticket() {
    # checks if it is a git repository. the '-d' flag checks for folders
    if test -d ".git"; then
        # gets the current branch and does a regex pattern match
        echo -e "$(git_current_branch)" | grep -Eo '[0-9]{4}'
    fi
}
\`\`\`

#### Example with bonus regex tip
The below example illustrates a function that will either take a feature branch with the format 'feature/1234/Component/description-of-work' and returns everything after the ticket number, or if it is not a feature or bugfix branch (e.g. main), then it returns the entire branch name.

\`\`\`bash
RPROMPT='[$(branch_description)]'

branch_description() {
    # checks if it is a git repository.
    if test -d ".git"; then
        regex='[0-9]{4}\\/(.+)'
        branch="$(echo -e "$(git_current_branch)")"

        if [[ $branch =~ $regex ]]
        then
            echo $branch | grep -Eo '[a-zA-Z-]+\\/[a-zA-Z-]+$'
        else
            echo $branch
        fi
    fi
}
\`\`\`

### List of symbols
Below are a list of symbols that were included in the wedisagree theme that I found useful.

☁ ☂ ✭ ☀ Ⓓ ⓣ Ⓞ ⓐ ⓜ ⓧ ⓡ ⓤ ⑃ ⑁ ⑂ ⑄ ⑊ 𝝙
✹ ☄ ♆ ♀ ♁ ♐ ♇ ♈ ♉ ♚ ♛ ♜ ♝ ♞ ♟ ♠ ♣ ⚢ ⚲ ⚳ ⚴ ⚥ ⚤ ⚦ ⚒ ⚑ ⚐ ♺ ♻ ♼ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷
✡ ✔ ✖ ✚ ✱ ✤ ✦ ❤ ➜ ➟ ➼ ✂ ✎ ✐ ⨀ ⨁ ⨂ ⨍ ⨎ ⨏ ⨷ ⩚ ⩛ ⩡ ⩱ ⩲ ⩵  ⩶ ⨠
⬅ ⬆ ⬇ ⬈ ⬉ ⬊ ⬋ ⬒ ⬓ ⬔ ⬕ ⬖ ⬗ ⬘ ⬙ ⬟  ⬤ 〒 ǀ ǁ ǂ ĭ Ť Ŧ
╭╰ ─

## Conclusion

There is clearly a ton I didn't cover, but this is what I've fine-tuned to show only the things I care about in an aesthetic way. I hope it was helpful!
`;

export default zshThemeCustomization;
