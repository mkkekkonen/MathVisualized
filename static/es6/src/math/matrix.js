class Matrix4x4 {
    constructor(matrix) {
        if (!matrix) {
            this.matrix = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ];
        } else {
            this.matrix = matrix;
        }
    }

    // See https://en.wikipedia.org/wiki/Matrix_multiplication
    multiply(otherMatrix) {
        const newMatrixArray = [];
        const debug = false;

        for (let i = 0; i < 4; i += 1) {
            newMatrixArray.push([]);
            for (let j = 0; j < 4; j += 1) {
                let cij = 0;
                let debugStr = `c_${i}${j} = `;
                let debug2Str = '';
                for (let m = 0; m < 4; m += 1) {
                    cij += this.matrix[m][i] * otherMatrix.matrix[j][m];
                    debugStr += `a_${i}${m} * b_${m}${j} `;
                    debug2Str += `${this.matrix[m][i]} * ${otherMatrix.matrix[j][m]} `;
                    if (m < 2) {
                        debugStr += '+ ';
                        debug2Str += '+ ';
                    }
                }
                if (debug) console.log(`${debugStr}\n${cij} = ${debug2Str}`);
                newMatrixArray[i].push(cij);
            }
        }
        if (debug) console.log(JSON.stringify(newMatrixArray));

        return new Matrix4x4(newMatrixArray);
    }

    multiplyVector(vector) {
        const x = (this.ij(1, 1) * vector.x)
            + (this.ij(1, 2) * vector.y)
            + (this.ij(1, 3) * vector.z)
            + (this.ij(1, 4) * vector.w);
        const y = (this.ij(2, 1) * vector.x)
            + (this.ij(2, 2) * vector.y)
            + (this.ij(2, 3) * vector.z)
            + (this.ij(2, 4) * vector.w);
        const z = (this.ij(3, 1) * vector.x)
            + (this.ij(3, 2) * vector.y)
            + (this.ij(3, 3) * vector.z)
            + (this.ij(3, 4) * vector.w);
        const w = (this.ij(4, 1) * vector.x)
            + (this.ij(4, 2) * vector.y)
            + (this.ij(4, 3) * vector.z)
            + (this.ij(4, 4) * vector.w);
        return {
            x, y, z, w,
        };
    }

    ij(i, j) {
        return this.matrix[i - 1][j - 1];
    }
}

export default Matrix4x4;
