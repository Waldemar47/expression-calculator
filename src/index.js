function eval() {
  // Do not use eval!!!
  return;
}
class ExpressionError extends Error {
  constructor(message) {
      super(message);
      this.name = 'ExpressionError';
  }
}
function expressionCalculator(expr) {
  let br_Stack = []
  let opr = expr.match(/\d+|\+|\-|\(|\)|\*|\//g)
  function calculate(expr) {
      for (let a = 0; a < expr.length; a++) {
          if (expr[a] == '*' || expr[a] == '/') {
              if (expr[a] == '*') {
                  expr[a-1] = Number(expr[a-1]) * Number(expr[a+1]);
              } else {
                  if (Number(expr[a+1]) == 0) {
                      throw new TypeError('TypeError: Division by zero.');
                  }
                  expr[a-1] = Number(expr[a-1]) / Number(expr[a+1]);
              }
              expr.splice(a, 2);
              a--;
          }
      }
      for (let a = 0; a < expr.length; a++) {
          if (expr[a] == '+' || expr[a] == '-') {
              if (expr[a] == '+') {
                  expr[a-1] = Number(expr[a-1]) + Number(expr[a+1]);
              } else {
                  expr[a-1] = Number(expr[a-1]) - Number(expr[a+1]);
              }
              expr.splice(a, 2);
              a--;
          }
      }
      return expr[0];
  }
  for (let a = 0; a < opr.length; a++) {
      if (opr[a] == '(') {
          br_Stack.push(a);
      } else if (opr[a] == ')') {
          let goBracket = br_Stack.pop();
          if (goBracket == undefined) {
              throw new ExpressionError('ExpressionError: Brackets must be paired');
          }
          let br_Len = a - goBracket - 1;
          opr.splice(a, 1);
          opr[goBracket] = calculate(opr.splice(goBracket + 1, br_Len));
          a -= br_Len + 1;
      }
  }
  if (br_Stack.length > 0) {
      throw new ExpressionError('ExpressionError: Brackets must be paired');
  }
  return calculate(opr);
}

module.exports = {
  expressionCalculator
}
