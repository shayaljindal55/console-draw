export const messages = {
  "INVALID_CMD": "The command given is not valid. Type 'H' or 'h' for help.",
  "INVALID_LINE_CMD":"Only vertical (x1=x2) or horizontal (y1=y2) lines are supported.",
  "INVALID_NON_NEGATIVE_CMD": "All the co-ordinates must be non-negative numbers.",
  "HELP": "Below are the commands that this console can interpret: <br />" +
    "<b> 'C w h' </b>- Create a new Canvas of width w and height h.<br />" +
    "<b>'L x1 y1 x2 y2'</b> - Create a new line from (x1,y1) to (x2,y2).<br />" +
    "<b>'R x1 y1 x2 y2'</b> - Create new rectangle, whose upper left corner is (x1,y1) and lower right corner is (x2,y2). <br />" +
    "<b>'B x y c' </b>- Fill the entire area connected to (x,y) with 'colour' c. <br />" +
    "<b>'Q'</b> - Quit the program. <br />",
    "CREATE_CANVAS" : "Please create a canvas first using command 'C w h', where w is the width and h is the height of the canvas."
};

