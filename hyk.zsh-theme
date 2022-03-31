#use extended color palette if available
if [[ $TERM = (*256color|*rxvt*) ]]; then
  turquoise="%F{61}"
  orange="%F{166}"
  purple="%F{135}"
  hotpink="%F{161}"
  limegreen="%F{118}"
  coloraaa="%F{111}"
  colorbbb="%F{208}"
  colorccc="%F{103}"
  colorddd="%F{124}"
  coloreee="%F{242}"
  colorfff="%F{15}"
  coloryyy="%F{148}"
else
  turquoise="$fg[cyan]"
  orange="$fg[yellow]"
  purple="$fg[magenta]"
  hotpink="$fg[red]"
  limegreen="$fg[green]"
  coloraaa="$fg[white]"
  colorbbb="$fg[white]"
  colorccc="$fg[white]"
  colorddd="$fg[white]"
  coloreee="$fg[white]"
  colorfff="$fg[white]"
  coloryyy="$fg[white]"
fi

# λ ● ✘ ✔ ‹ "›% ⠠⠵ ╭─ ╰─ ✹ ✖ ➜ ═ ✭ ✗ ↵ »  ☿ ✚  ➤ ⚑ ▴ § ◒ ❮ B⬡ ± ▾ ➭ ॐ  ○ ⚡ └ ☮ ┌  ✈ ➦ ✂ ✱ ☞ ┌ └ ┘ ┐   ♡　❥　♥　❣　❦　❧　۵　♤　♧　დ　ღ　♣　♠
  
PROMPT="
%{$hotpink%}╭─%{$reset_color%}"
PROMPT+='%{$bg[green]%{$fg_bold[magenta]%}%}%\ Mr.   %{$reset_color%} '
PROMPT+='%(?:%{$fg_bold[green]%}✔✔✔»»»➜➜➜:%{$fg_bold[red]%}✔✔✔»»»➜➜➜ ) '
PROMPT+='%{$fg[cyan]%}%m/%~ %{$reset_color%} '
PROMPT+='%{$turquoise%}λ%{$reset_color%} '
PROMPT+='%{$orange%}λ%{$reset_color%} '
PROMPT+='%{$purple%}λ%{$reset_color%} '
PROMPT+='%{$hotpink%}λ%{$reset_color%} '
PROMPT+='%{$limegreen%}λ%{$reset_color%} '
PROMPT+='%{$coloraaa%}λ%{$reset_color%} '
PROMPT+='%{$colorbbb%}λ%{$reset_color%} '
PROMPT+='%{$colorccc%}λ%{$reset_color%} '
PROMPT+='%{$colorddd%}λ%{$reset_color%} '
PROMPT+='%{$coloreee%}λ%{$reset_color%} '
PROMPT+='%{$colorfff%}λ%{$reset_color%} '
PROMPT+='%{$coloryyy%}λ%{$reset_color%} '
PROMPT+='
%{$fg[red]%}╰─%{$reset_color%}'
PROMPT+='%{$bg[green]%{$fg_bold[magenta]%}%}%\ %n   %{$reset_color%} $(git_prompt_info)%{$reset_color%} '
PROMPT+='%{$orange%}♥ %{$colorfff%}'

ZSH_THEME_GIT_PROMPT_PREFIX="%{$fg_bold[green]%}✔✔✔»»»➜➜➜ %{$fg_bold[yellow]%}git:(  %{$fg[green]%}"
ZSH_THEME_GIT_PROMPT_SUFFIX="%{$reset_color%} "
ZSH_THEME_GIT_PROMPT_DIRTY="%{$fg[yellow]%}  ) ✘%{$reset_color%}"
ZSH_THEME_GIT_PROMPT_CLEAN="%{$fg[yellow]%}  )%{$reset_color%}"
