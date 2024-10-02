import style from "./Grid.module.scss";

/**
 * Grid Container
 * @param {*} children - The children og the grid container
 * @param {*} rows - the amount of rows in the grid
 * @param {*} columns - the amount of columns in the grid
 * @param {*} gap - the gap between rows and columns
 * @param {*} align - the vertical alignment of the grid contents
 * @param {*} justify - the horizontal alignment of the grid contents
 * @param {*} width - the width of the grid
 * @param {*} sx - additional styling
 * @returns JSX.Element
 */
export const Grid = ({
  children,
  rows,
  columns,
  gap,
  align,
  justify,
  sx,
  width,
}) => {
  let _rows = rows || "auto";
  let _columns = columns || "auto";
  let _align = align || "center";
  let _justify = justify || "center";
  let _gap = gap || "auto";
  let _sx = sx || {};
  let _width = width || "auto";

  return (
    <div
      className={style.gridContainer}
      style={{
        alignContent: _align,
        justifyContent: _justify,
        gap: _gap,
        width: _width,
        gridTemplateColumns: `repeat(${_columns}, 1fr)`,
        gridTemplateRows: `repeat(${_rows})`,
        ..._sx,
      }}
    >
      {children}
    </div>
  );
};
