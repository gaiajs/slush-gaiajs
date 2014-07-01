[![Dependency Status](https://gemnasium.com/gaiajs/slush-gaiajs.svg)](https://gemnasium.com/gaiajs/slush-gaiajs)
[![NPM version](https://badge.fury.io/js/slush-gaiajs.svg)](http://badge.fury.io/js/slush-gaiajs)
 > A slush generator to scaffold [GAIAJS](https://github.com/gaiajs/gaiajs) Apps

 Inspired by [slush-meanjs](https://github.com/arvindr21/slush-meanjs)

## Getting Started

### Installation

Install `slush-gaiajs` globally:

```bash
$ npm install -g slush-gaiajs
```

Remember to install `gulp` and `slush` globally as well, if you haven't already:

```bash
$ npm install -g gulp slush
```

### Usage

Create a new folder for your project:

```bash
$ mkdir my-slush-gaiajs
```

Run the generator from within the new folder:

```bash
$ cd my-slush-gaiajs && slush gaiajs
```

## FEATURES
<table>
<tr>
<td>Feature</td>
<td>Command</td>
</tr>
<tr>
<td><a href="#application-generator">Application generator</a></td>
<td>slush gaiajs</td>
</tr>
<tr>
<td><a href="#add-database-configuration">Add Database configuration</a></td>
<td>slush gaiajs:database</td>
</tr>
</table>

**Note: Generators are to be run from the root directory of your app.**

## Application Generator

The application generator will help you create a fresh copy of a GAIAJS application in your working folder. To create your GAIAJS application, navigate to a new project folder, and then use *slush gaiajs* to generate your application:


```
$ slush gaiajs
```

The generator will ask you a few questions about your new application and will generate it for you. When the installation process is over, you will be able to use gulp to run your new GAIAJS application:


```
$ make
```


## Add Database configuration

Database generator will help you create a database config. To create a new database config you will need to use *slush gaiajs* again:


```
$ slush gaiajs:database
```


## Getting To Know Slush

Slush is a tool that uses Gulp for project scaffolding.

Slush does not contain anything "out of the box", except the ability to locate installed slush generators and to run them with liftoff.

To find out more about Slush, check out the [documentation](https://github.com/klei/slush).


## Support
If you have any problem or suggestion please open an issue [here](https://github.com/gaiajs/slush-gaiajs/issues).

## License

The MIT License

Copyright (c) 2014, Touzet David <dtouzet@gmail.com>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
