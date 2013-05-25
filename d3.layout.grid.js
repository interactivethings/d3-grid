(function() {
  var DEBUG = true;

  d3.layout.grid = function() {
    var mode = "equal",
        layout = _distributeEqually,
        x = d3.scale.ordinal(),
        y = d3.scale.ordinal(),
        size = [1, 1],
        nodeSize = false,
        cols, rows;

    function grid(nodes) {
      return layout(nodes);
    }

    function _distributeEqually(nodes) {
      var i = -1, 
          n = nodes.length,
          _cols = cols ? cols : 0,
          _rows = rows ? rows : 0,
          col, row;

      // FIXME: make explicit rows/cols exclusive
      // FIXME: when rows are set, use different ordering than ltr (make test with 5 data points and 4 rows)
      //        OR don't allow rows to be set (still need rtl ordering though ...)

      if (_rows) {
        _cols = Math.ceil(n / _rows);
      } else {
        _cols || (_cols = Math.ceil(Math.sqrt(n)));
        _rows = Math.ceil(n / _cols);
      }

      if (nodeSize) {
        x.domain(d3.range(_cols)).range(d3.range(0, size[0] * _cols, size[0]));
        y.domain(d3.range(_rows)).range(d3.range(0, size[1] * _rows, size[1]));
      } else {
        x.domain(d3.range(_cols)).rangePoints([0, size[0]]);
        y.domain(d3.range(_rows)).rangePoints([0, size[1]]);
      }

      if (DEBUG) console.log('cols/rows', _cols, _rows);

      while (++i < n) {
        col = i % _cols;
        row = Math.floor(i / _cols);

        if (DEBUG) console.log(i, col, row);

        nodes[i].x = x(col);
        nodes[i].y = y(row);
      }

      return nodes;
    }

    // grid.mode = function(value) {
    //   if (!arguments.length) return mode;
    //   switch(mode = value) {
    //     case "equal":
    //       layout = _distributeEqually;
    //       break;
    //   }
    //   return grid;
    // }

    grid.size = function(value) {
      if (!arguments.length) return nodeSize ? null : size;
      nodeSize = (size = value) == null;
      return grid;
    }

    grid.nodeSize = function(value) {
      if (!arguments.length) return nodeSize ? size : null;
      nodeSize = (size = value) != null;
      return grid;
    }

    grid.rows = function(value) {
      if (!arguments.length) return rows;
      rows = value;
      return grid;
    }

    grid.cols = function(value) {
      if (!arguments.length) return cols;
      cols = value;
      return grid;
    }

    return grid;
  };
})();