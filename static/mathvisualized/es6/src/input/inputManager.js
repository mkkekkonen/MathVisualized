const initializeKeyboardInput = (keyDownCallback, keyUpCallback) => {
    window.addEventListener('keydown', keyDownCallback);
    window.addEventListener('keyup', keyUpCallback);
};

export { initializeKeyboardInput };
