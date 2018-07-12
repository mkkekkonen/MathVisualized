import Vector3 from "./vector";

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

        for (let i = 0; i < 4; i += 1) {
            newMatrixArray.push([]);
            for (let j = 0; j < 4; j += 1) {
                let cij = 0;
                for (let m = 0; m < 4; m += 1) {
                    cij += this.ij(i, m) * otherMatrix.ij(m, j);
                }
                newMatrixArray[i].push(cij);
            }
        }

        return new Matrix4x4(newMatrixArray);
    }

    multiplyVector(vector) {
        const x = (this.ij(0, 0) * vector.x)
            + (this.ij(1, 0) * vector.y)
            + (this.ij(2, 0) * vector.z)
            + (this.ij(3, 0) * vector.w);
        const y = (this.ij(0, 1) * vector.x)
            + (this.ij(1, 1) * vector.y)
            + (this.ij(2, 1) * vector.z)
            + (this.ij(3, 1) * vector.w);
        const z = (this.ij(0, 2) * vector.x)
            + (this.ij(1, 2) * vector.y)
            + (this.ij(2, 2) * vector.z)
            + (this.ij(3, 2) * vector.w);
        const w = (this.ij(0, 3) * vector.x)
            + (this.ij(1, 3) * vector.y)
            + (this.ij(2, 3) * vector.z)
            + (this.ij(3, 3) * vector.w);
        return new Vector3({ x, y, z });
    }

    ij(i, j) {
        if (!this.matrix[i]) console.log(`The i causing trouble: ${i}`);
        return this.matrix[i][j];
    }

    static scale({ x, y, z }) {
        return new Matrix4x4([
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1],
        ]);
    }

    static translate({ x, y, z }) {
        return new Matrix4x4([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [x, y, z, 1],
        ]);
    }
}

export default Matrix4x4;
