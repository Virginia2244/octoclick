// Kailh Choc PG1350
// Nets
//    from: corresponds to pin 1
//    to: corresponds to pin 2
// Params
//    hotswap: default is false
//      if true, will include holes and pads for Kailh choc hotswap sockets
//    reverse: default is false
//      if true, will flip the footprint such that the pcb can be reversible
//    keycaps: default is false
//      if true, will add choc sized keycap box around the footprint
// 
// note: hotswap and reverse can be used simultaneously

module.exports = {
  params: {
    length: 14,
  },
  body: p => {

        const get_at_coordinates = () => {
      const pattern = /\(at (-?[\d\.]*) (-?[\d\.]*) (-?[\d\.]*)\)/;
      const matches = p.at.match(pattern);
      if (matches && matches.length == 4) {
          return [parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3])];
      } else {
          return null;
      }
    }

    /*Call adjust_point if you want to make something move that is outisde of the main body of the footprint. Aka after the ')' in the return statement*/
    const adjust_point = (x, y) => {
      const at_l = get_at_coordinates();
      if(at_l == null) {
          throw new Error(
          `Could not get x and y coordinates from p.at: ${p.at}`
          );
      }
      const at_x = at_l[0];
      const at_y = at_l[1];
      const at_angle = at_l[2];
      const adj_x = at_x + x;
      const adj_y = at_y + y;

      const radians = (Math.PI / 180) * at_angle,
          cos = Math.cos(radians),
          sin = Math.sin(radians),
          nx = (cos * (adj_x - at_x)) + (sin * (adj_y - at_y)) + at_x,
          ny = (cos * (adj_y - at_y)) - (sin * (adj_x - at_x)) + at_y;

      const point_str = `${nx.toFixed(2)} ${ny.toFixed(2)}`;
      return point_str;
    }
      return `
        (gr_rect (start 5 10) (end 5 10)
     (fill none) (layer "Edge.Cuts") (tstamp e17c69b8-1c65-4862-bd3b-e768950d8537))
        `
  }
}