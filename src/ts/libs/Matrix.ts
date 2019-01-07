export class Matrix {

  static mul(a: number[][], b: number[][]): number[][] {
    const colsA = a[0].length;
    const rowsA = a.length;
    const colsB = b[0].length;
    const rowsB = b.length;

    if (colsA != rowsB) {
      console.warn(`Columns of A must match rows of B.`);
      return null;
    }

    let result: number[][] = [];

    for (let i = 0; i < rowsA; i++) {
      result[i] = [];
      for (let j = 0; j < colsB; j++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }

    return result;
  }

  static toString(m: number[][]): string {
    const cols = m[0].length;
    const rows = m.length;

    let result = `Matrix: ${rows}x${cols}\n`;
    for (let i = 0; i < rows; i++) {
      result += `[ `;
      for (let j = 0; j < cols; j++) {
        result += m[i][j].toString();
        if (j + 1 < cols) {
          result += ` `;
        }
      }
      result += ` ]`;
      result += `\n`;
    }

    return result;
  }
}