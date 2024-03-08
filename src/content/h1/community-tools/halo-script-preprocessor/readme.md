---
title: Halo Script Preprocessor
about: 'tool:Halo Script Preprocessor'
info: |-
  * [Download](https://halomaps.org/hce/detail.cfm?fid=6552)
  * Released: 2012
thanks:
  Conscars: Documenting usage examples
---
The **Halo Script Preprocessor** allows you to write [HaloScript](~scripting) with support for [C-like preprocessor macros][pre] like `#define`. The program takes a scripts file with macros in it, processes them, then outputs a standard HSC file. This means this program is *purely* for making writing HSC easier. Scripts output by this preprocessor are still subject to the [usual limits](~scripting#gotchas-and-limits).

Most modders are not likely to need this tool; it's intended for expert users to save time and reduce boilerplate when writing very large level scripts. With H1A's support for static script arguments and its raised scripting limits this tool may be unnecessary for you.

# Usage
Once downloaded and extracted, you will find a `hspp.exe`. This is the preprocessor and it is a [command-line](~) program. From a command prompt, it would be used like this:

```cmd
hspp.exe path\to\input.hsc path\to\output.hsc
```

It's recommended to either keep input files outside your levels's `scripts` data folder, or name them with another extension than `.hsc`, so they're not [compiled](~scripting#compiling-scripts-into-a-scenario).

# Examples
The preprocessor is an extension of GPP, so see [its documentation][gpp] for full details on the types of macros it supports.

## Basic replacement macros
Macros can help you use shorthand for snippets of HaloScript which you frequently find yourself repeating. Given the input file:

```hsc
#define CINE_START (cinematic_show_letterbox true)(show_hud false)
#define CINE_STOP (cinematic_show_letterbox false)(show_hud true)

(script static void chapter_c40_3
  CINE_START
  (sleep 30)
  (cinematic_set_title chapter_c40_3)
  (sleep 150)
  CINE_STOP
)
```

This will be processed into an output file like this:

```hsc
(script static void chapter_c40_3
  (cinematic_show_letterbox true)(show_hud false)
  (sleep 30)
  (cinematic_set_title chapter_c40_3)
  (sleep 150)
  (cinematic_show_letterbox false)(show_hud true)
)
```

## Macros with arguments
Macros are more powerful when they accept _arguments_, which let you parameterize their output.

```hsc
#define SLEEP_SEC(sec) (sleep (* 30 sec))
#define DBG(msg) (if debug (print msg))
#define WAIT_DEAD(ai, num) (sleep_until (<= (ai_living_count ai) num))

(script dormant ext_a
  (ai_place ext_a_cov)
  WAIT_DEAD(ext_a_cov,3)
  DBG("Enemies dead!")
  SLEEP_SEC(10)
  (wake ext_b)
)
```

Outputs:

```hsc
(script dormant ext_a
  (ai_place ext_a_cov)
  (sleep_until (<= (ai_living_count ext_a_cov) 3))
  (if debug (print "Enemies dead!"))
  (sleep (* 30 10))
  (wake ext_b)
)
```

However, [static scripts with arguments](~scripting#script-types-static) are also now an option for H1A scripting and serve a similar purpose.

## Stripping comments
If you're concerned about the [source file size limit](~scripting#source-file-size), you can configure GPP to remove HSC comments:

```hsc
#mode preservelf off
#mode comment ";*\W" "\W*;"
#mode comment ";" "\n"

; kill player0 if any player goes in the zone
(script startup test
    (if (volume_test_objects kill_vol (players))
        (unit_kill (player0))
    )
)
;*
(script dormant wave_1
    (ai_place "entry_cov/grunts")
)
*;
(script dormant wave_2
    (ai_place "entry_cov/elites")
)
```

Output:

```hsc
(script startup test
    (if (volume_test_objects kill_vol (players))
        (unit_kill (player0))
    )
)

(script dormant wave_2
    (ai_place "entry_cov/elites")
)
```

[gpp]: http://files.nothingisreal.com/software/gpp/gpp.html
[pre]: https://en.wikipedia.org/wiki/C_preprocessor