# d3.layout.grid

A grid layout for [D3](http://d3js.org).

## API

The grid layout takes a one-dimensional array of data and arranges it on a two-dimensional grid.

## Examples


## Things that may or may not come in the future

* Maybe try to space nodes more equally when the size isnt square. E.g. with `size([3, 1])` use a cols/rows ratio of 3/1
* `.sort()`
* Handle overflow if rows *and* columns are fixed (Repeat from the beginning? Add new rows/cols nontheless? Which take priority?)
* Hex grid
* Make `.bands()` spacing the default?
* Change `.points()` and `.bands()` to `.spacing('points|bands')`
* Shortcut for `.rows(x).cols(y)`? Maybe `.gridSize([x, y])`? Potentially confusing because there's already `.size()` and `.nodeSize()`.
* Arbitrary angles for rows and columns

## Author

Jeremy Stucki, [Interactive Things](http://interactivethings.com)

## License

BSD, see LICENSE.txt
