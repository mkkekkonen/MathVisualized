export const positionDeltaFromVelocity = ({ velocity, time }) => velocity.multiply(time);

export const velocityDeltaFromacceleration = ({ acceleration, time }) =>
    acceleration.multiply(time);
