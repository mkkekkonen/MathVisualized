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

        for (let i = 1; i <= 4; i += 1) {
            newMatrixArray.push([]);
            for (let j = 1; j <= 4; j += 1) {
                let cij = 0;
                for (let m = 1; m <= 4; m += 1) {
                    cij += this.ij(i, m) * otherMatrix.ij(m, j);
                }
                newMatrixArray[i - 1].push(cij);
            }
        }

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
