const quadraticEquation = ({ a, b, c }) => {
    const discriminant = (b * b) - (4 * a * c);
    if (discriminant < 0) {
        return [];
    }
    const res1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const res2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    if (res1 === res2) {
        return [res1];
    }
    return [res1, res2];
};

export { quadraticEquation };
