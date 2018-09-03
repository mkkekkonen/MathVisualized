const round = number => Math.round(number * 100) / 100;

const degreesToRadians = degrees => degrees * (Math.PI / 180);

const radiansToDegrees = radians => radians * (180 / Math.PI);

export { round, degreesToRadians, radiansToDegrees };
