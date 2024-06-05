
export default function new_column_data(columns, new_name) {
    let new_column = {
      'id': 1,
      'name': new_name,
      'order': 1,
      'cards': [],
    };

    if (columns.length > 0) {
      let id_arr = [];
      let order_arr = [];
      columns.forEach((column) => {
        id_arr.push(column.id);
        order_arr.push(column.order);
      });
      new_column.id = Math.max.apply(null, id_arr) + 1;
      new_column.order = Math.max.apply(null, order_arr) + 1;
    }
    return new_column;
}
