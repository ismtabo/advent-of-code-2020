# Advent of code 2020

Repository of solutions for the [Advent of Code 2020][4] done by [ismtabo][1]

This year the language used is Typescript with [Deno][2]. This last year I've been working with Typescript in Angular, and I felt much more comfortable with its typechecking and environment than compared with Python.

So, I give it a try as my future scripting language. Although, the Nodejs environment on the other hand makes me return to my old beloved language. NPM and node_modules with the package.json it's not nice.

That's why I choose Deno, secure runtime written in Rust, much comfortable to do little projects without think about managing the dependencies for standard purpose. In addition, my intention is to solve the problems with the standard modules and capabilities of the language (in spite of the js bugs).

Lets the party started.

## Usage

### Prerequisites

You may need to [install deno][3] to use this repository.

### CLI tool

After installing it you can run the solutions using the cli tool:

```
$ deno run -A --unstable src/cli/mod.ts -h

  Usage:   aoc2020
  Version: v0.1.0

  Description:

    Solutions for Advent of Code 2020. https://adventofcode.com/

  Options:

    -h, --help     - Show this help.
    -V, --version  - Show the version number for this program.

  Commands:

    run      - Run day solution
    run-all  - Run multiple day solution
    new      - Create new day solution folder skeleton

```

### Run a day solution

The solutions can be run with the `run` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run -h

  Usage:   aoc2020 run
  Version: v0.1.0

  Description:

    Run day solution

  Options:

    -h, --help                      - Show this help.
    -d, --day        <day:number>   - Day to run
    -p, --part       <part:number>  - Execute part 2 of the day                                    (Default: 1)
    -a, --all-parts                 - Execute both parts. If present part option will be ignore.
    -t, --time                      - Show spent time
    -f, --file       <file:string>  - Input file. If missing, the day input file is used instead.
    --sample                        - Run day using sample input instead of day input file.        (conflicts: file)

```

Also, to run all the solutions you can use `run-all` sub-command:

```
$ deno run -A --unstable src/cli/mod.ts run-all -h

  Usage:   aoc2020 run-all
  Version: v0.1.0

  Description:

    Run multiple day solution

  Options:

    -h, --help                      - Show this help.
    -p, --part       <part:number>  - Execute part 2 of the day                                   (Default: 1)
    -a, --all-parts                 - Execute both parts. If present part option will be ignore.
    -t, --time                      - Show spent time
    --sample                        - Run day using sample input instead of day input file.

```

### Test day solutions

Some of the day solutions have unit tests. To run them use [deno built-in test runner][5]:

```
$ deno test [OPTIONS] [file]

```

Some of the test need `--allow-read` to read the sample inputs of its day.

### Bundle AOC 2020 solutions

Using [deno built-in bundler][8], you can bundle the problems module into a js module:

```
$ deno bundle [OPTIONS] <source_file> [out_file]

```

To bundle the solutions module the `<source_file>` need to be `src/problems/mod.ts`.

## Repository content

The source code of the repository is inside the `src` path:

### Folder
```
/ src
├- app: TBD
├-/ cli: Module of the cli tool to run problems and more
└-/ solutions: Module of solutions
```

### Cli tool structure

```
/ cli
├- template: Templates for day solution generation
├- mod.ts: Main module of the cli tool
├- type.d.ts: Types used in the cli tool
└- [...]: other stuff
```
### Day solution structure

Each day solution has the following structure:

```
/ dayX
├-/ {partOne,partTwo}: Modules of parts one and two
| ├- mod.ts: Main module of the part solution
| ├- [test.ts]: Test of the part solution
| ├- [type.d.ts]: Types of the part solution
| └- [...]: other stuff
| ...
├- mod.ts: Main module of the day solution
├- sample.txt: Sample input case
├- input.txt: Day input case
├- [type.d.ts]: Types used in both parts
└- [...]: other stuff
```

The main module exports two functions `main` and `preprocess` to run the solution parts and preprocess the input respectively. Each part module exports a function `partXxx` with its name in addition to other possible issues.

## Built with

- [Typescript][6] - Language used
- [Deno][2] - Runtime for Javascript and Typescript
- [Cliffy][7] - Command line framework for Deno

## Authors

- Ismael Taboada - Frontend developer - [@ismtabo][1]

## License

This repository is under MIT License - look up [LICENSE](./LICENSE) for more details

[1]: https://github.com/ismtabo
[2]: https://deno.land/
[3]: https://deno.land/#installation
[4]: https://adventofcode.com/
[5]: https://deno.land/manual/testing
[6]: https://www.typescriptlang.org/
[7]: https://cliffy.io/
[8]: https://deno.land/manual@v1.6.0/tools/bundler
