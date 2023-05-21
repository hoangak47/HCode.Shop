function RemoveError() {
    const consoleWarn = console.error;
    console.error = (...args) => {
        if (
            /Warning.*Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>/.test(
                args[0],
            )
        ) {
            return;
        }
        consoleWarn(...args);
    };
    return;
}

export default RemoveError;
